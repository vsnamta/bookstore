import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import categoryApi from '../../apis/categoryApi';
import { CategoryResult } from '../../models/categories';
import { createCategoryListFindAction, createCategoryRemoveAction, createCategoryRemoveRequestAction, createCategorySaveAction, createCategorySaveRequestAction, createCategoryListAsyncSetAction, createCategoryUpdateAction, createCategoryUpdateRequestAction } from './action';
import { FIND_CATEGORY_LIST, REMOVE_CATEGORY_REQUEST, SAVE_CATEGORY_REQUEST, UPDATE_CATEGORY_REQUEST } from './actionType';
import { CategoriesState } from './reducer';

function* findCategoryListSaga(action: ReturnType<typeof createCategoryListFindAction>) {
    const categoriesState: CategoriesState = yield select((state: RootState) => state.categories);
    
    if(categoriesState.categoryListAsync.result !== undefined) {
        return;
    }

    try {
        const categoryList: CategoryResult[] = yield call(categoryApi.findAll);

        yield put(createCategoryListAsyncSetAction({
            result: categoryList,
            error: undefined
        }));
    } catch (error) {
        yield put(createCategoryListAsyncSetAction({
            result: undefined,
            error: error
        }));
    }
};

function* updateCategoryRequestSaga({ payload: categoryUpdateRequestActionPayload }: ReturnType<typeof createCategoryUpdateRequestAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.update, categoryUpdateRequestActionPayload.id, categoryUpdateRequestActionPayload.payload);

        yield put(createCategoryUpdateAction(category));
        categoryUpdateRequestActionPayload.onSuccess && categoryUpdateRequestActionPayload.onSuccess(category);
    } catch (error) {
        categoryUpdateRequestActionPayload.onFailure && categoryUpdateRequestActionPayload.onFailure(error);
    }
};

function* saveCategoryRequestSaga({ payload: categorySaveRequestActionPayload }: ReturnType<typeof createCategorySaveRequestAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.save, categorySaveRequestActionPayload.payload);

        yield put(createCategorySaveAction(category));
        categorySaveRequestActionPayload.onSuccess && categorySaveRequestActionPayload.onSuccess(category);
    } catch (error) {
        categorySaveRequestActionPayload.onFailure && categorySaveRequestActionPayload.onFailure(error);
    }
};

function* removeCategoryRequestSaga({ payload: categoryRemoveRequestActionPayload }: ReturnType<typeof createCategoryRemoveRequestAction>) {
    try {
        yield call(categoryApi.remove, categoryRemoveRequestActionPayload.id);

        yield put(createCategoryRemoveAction(categoryRemoveRequestActionPayload.id));
        categoryRemoveRequestActionPayload.onSuccess && categoryRemoveRequestActionPayload.onSuccess();
    } catch (error) {
        categoryRemoveRequestActionPayload.onFailure && categoryRemoveRequestActionPayload.onFailure(error);
    }
};

export default function* categoriesSaga() {
    yield takeEvery(FIND_CATEGORY_LIST, findCategoryListSaga);
    yield takeEvery(UPDATE_CATEGORY_REQUEST, updateCategoryRequestSaga);
    yield takeEvery(SAVE_CATEGORY_REQUEST, saveCategoryRequestSaga);
    yield takeEvery(REMOVE_CATEGORY_REQUEST, removeCategoryRequestSaga);
}