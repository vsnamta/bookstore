import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import categoryApi from '../../apis/categoryApi';
import { CategoryResult } from '../../models/category';

function* fetchCategoryListSaga(action: ReturnType<typeof actions.fetchCategoryList>) {
    const categoryList: CategoryResult[] = yield select((state: RootState) => state.categories.asyncCategoryList.result);
    
    if(categoryList !== undefined) {
        return;
    }

    try {
        const categoryList: CategoryResult[] = yield call(categoryApi.findAll);

        yield put(actions.setAsyncCategoryList({
            result: categoryList,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncCategoryList({
            result: undefined,
            error: error
        }));
    }
};

function* updateCategoryAsyncSaga({ payload: categoryUpdateAsyncPayload }: ReturnType<typeof actions.updateCategoryAsync>) {
    try {
        const category: CategoryResult = yield call(categoryApi.update, categoryUpdateAsyncPayload.id, categoryUpdateAsyncPayload.payload);

        yield put(actions.updateCategory(category));
        categoryUpdateAsyncPayload.onSuccess?.(category);
    } catch (error) {
        categoryUpdateAsyncPayload.onFailure?.(error);
    }
};

function* removeCategoryAsyncSaga({ payload: categoryRemoveAsyncPayload }: ReturnType<typeof actions.removeCategoryAsync>) {
    try {
        yield call(categoryApi.remove, categoryRemoveAsyncPayload.id);

        yield put(actions.removeCategory(categoryRemoveAsyncPayload.id));
        categoryRemoveAsyncPayload.onSuccess?.();
    } catch (error) {
        categoryRemoveAsyncPayload.onFailure?.(error);
    }
};

function* saveCategoryAsyncSaga({ payload: categorySaveAsyncPayload }: ReturnType<typeof actions.saveCategoryAsync>) {
    try {
        const category: CategoryResult = yield call(categoryApi.save, categorySaveAsyncPayload.payload);

        yield put(actions.saveCategory(category));
        categorySaveAsyncPayload.onSuccess?.(category);
    } catch (error) {
        categorySaveAsyncPayload.onFailure?.(error);
    }
};

export default function* categoriesSaga() {
    yield takeEvery(types.FETCH_CATEGORY_LIST, fetchCategoryListSaga);
    yield takeEvery(types.UPDATE_CATEGORY_ASYNC, updateCategoryAsyncSaga);
    yield takeEvery(types.REMOVE_CATEGORY_ASYNC, removeCategoryAsyncSaga);
    yield takeEvery(types.SAVE_CATEGORY_ASYNC, saveCategoryAsyncSaga);
}