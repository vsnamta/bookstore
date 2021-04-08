import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import categoryApi from '../../apis/categoryApi';
import { CategoryResult } from '../../models/category';
import { CategoriesState } from '../../models/category/store';

function* fetchCategoryListSaga(action: ReturnType<typeof actions.fetchCategoryList>) {
    const categoriesState: CategoriesState = yield select((state: RootState) => state.categories);
    
    if(categoriesState.categoryListAsync.result !== undefined) {
        return;
    }

    try {
        const categoryList: CategoryResult[] = yield call(categoryApi.findAll);

        yield put(actions.setCategoriesState({
            categoryListAsync: {
                result: categoryList,
                error: undefined
            },
            category: undefined
        }));
    } catch (error) {
        yield put(actions.setCategoriesState({
            categoryListAsync: {
                result: undefined,
                error: error
            },
            category: undefined
        }));
    }
};

function* updateCategoryAsyncSaga({ payload: categoryUpdateAsyncPayload }: ReturnType<typeof actions.updateCategoryAsync>) {
    try {
        const category: CategoryResult = yield call(categoryApi.update, categoryUpdateAsyncPayload.id, categoryUpdateAsyncPayload.payload);

        yield put(actions.updateCategory(category));
        categoryUpdateAsyncPayload.onSuccess && categoryUpdateAsyncPayload.onSuccess(category);
    } catch (error) {
        categoryUpdateAsyncPayload.onFailure && categoryUpdateAsyncPayload.onFailure(error);
    }
};

function* removeCategoryAsyncSaga({ payload: categoryRemoveAsyncPayload }: ReturnType<typeof actions.removeCategoryAsync>) {
    try {
        yield call(categoryApi.remove, categoryRemoveAsyncPayload.id);

        yield put(actions.removeCategory(categoryRemoveAsyncPayload.id));
        categoryRemoveAsyncPayload.onSuccess && categoryRemoveAsyncPayload.onSuccess();
    } catch (error) {
        categoryRemoveAsyncPayload.onFailure && categoryRemoveAsyncPayload.onFailure(error);
    }
};

function* saveCategoryAsyncSaga({ payload: categorySaveAsyncPayload }: ReturnType<typeof actions.saveCategoryAsync>) {
    try {
        const category: CategoryResult = yield call(categoryApi.save, categorySaveAsyncPayload.payload);

        yield put(actions.saveCategory(category));
        categorySaveAsyncPayload.onSuccess && categorySaveAsyncPayload.onSuccess(category);
    } catch (error) {
        categorySaveAsyncPayload.onFailure && categorySaveAsyncPayload.onFailure(error);
    }
};

export default function* categoriesSaga() {
    yield takeEvery(types.FETCH_CATEGORY_LIST, fetchCategoryListSaga);
    yield takeEvery(types.UPDATE_CATEGORY_ASYNC, updateCategoryAsyncSaga);
    yield takeEvery(types.REMOVE_CATEGORY_ASYNC, removeCategoryAsyncSaga);
    yield takeEvery(types.SAVE_CATEGORY_ASYNC, saveCategoryAsyncSaga);
}