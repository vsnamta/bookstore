import { call, put, takeEvery } from 'redux-saga/effects';
import categoryApi from '../../apis/categoryApi';
import { CategoryResult } from '../../models/categories';
import { createFindCategoryListAction, createRemoveCategoryAction, createRemoveCategorySuccessAction, createSaveCategoryAction, createSaveCategorySuccessAction, createUpdateCategoryAction, createUpdateCategorySuccessAction, findCategoryListAsyncActionCreator } from './action';
import { FIND_CATEGORY_LIST, REMOVE_CATEGORY, SAVE_CATEGORY, UPDATE_CATEGORY } from './actionType';

function* findCategoryListSaga(action: ReturnType<typeof createFindCategoryListAction>) {
    yield put(findCategoryListAsyncActionCreator.request());

    try {
        const categoryList: CategoryResult[] = yield call(categoryApi.findAll);

        yield put(findCategoryListAsyncActionCreator.success(categoryList));
    } catch (error) {
        yield put(findCategoryListAsyncActionCreator.failure(error));
    }
};

function* updateCategorySaga(action: ReturnType<typeof createUpdateCategoryAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.update, action.payload.id, action.payload.payload);

        yield put(createUpdateCategorySuccessAction(category));
        action.payload.onSuccess && action.payload.onSuccess(category);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveCategorySaga(action: ReturnType<typeof createSaveCategoryAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.save, action.payload.payload);

        yield put(createSaveCategorySuccessAction(category));
        action.payload.onSuccess && action.payload.onSuccess(category);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* removeCategorySaga(action: ReturnType<typeof createRemoveCategoryAction>) {
    try {
        yield call(categoryApi.remove, action.payload.id);

        yield put(createRemoveCategorySuccessAction(action.payload.id));
        action.payload.onSuccess && action.payload.onSuccess();
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* categoriesSaga() {
    yield takeEvery(FIND_CATEGORY_LIST, findCategoryListSaga);
    yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
    yield takeEvery(SAVE_CATEGORY, saveCategorySaga);
    yield takeEvery(REMOVE_CATEGORY, removeCategorySaga);
}