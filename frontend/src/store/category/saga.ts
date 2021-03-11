import { call, put, takeEvery } from 'redux-saga/effects';
import categoryApi from '../../apis/categoryApi';
import { CategoryResult } from '../../models/categories';
import { findCategoryList, findCategoryListAsync, removeCategory, removeCategorySuccess, saveCategory, saveCategorySuccess, updateCategory, updateCategorySuccess } from './action';
import { FIND_CATEGORY_LIST, REMOVE_CATEGORY, SAVE_CATEGORY, UPDATE_CATEGORY } from './actionType';

function* findCategoryListSaga(action: ReturnType<typeof findCategoryList>) {
    yield put(findCategoryListAsync.request());

    try {
        const categoryList: CategoryResult[] = yield call(categoryApi.findAll);

        yield put(findCategoryListAsync.success(categoryList));
    } catch (error) {
        yield put(findCategoryListAsync.failure(error));
    }
};

function* updateCategorySaga(action: ReturnType<typeof updateCategory>) {
    try {
        const category: CategoryResult = yield call(categoryApi.update, action.payload.id, action.payload.payload);

        yield put(updateCategorySuccess(category));
        action.payload.onSuccess && action.payload.onSuccess(category);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveCategorySaga(action: ReturnType<typeof saveCategory>) {
    try {
        const category: CategoryResult = yield call(categoryApi.save, action.payload.payload);

        yield put(saveCategorySuccess(category));
        action.payload.onSuccess && action.payload.onSuccess(category);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* removeCategorySaga(action: ReturnType<typeof removeCategory>) {
    try {
        yield call(categoryApi.remove, action.payload.id);

        yield put(removeCategorySuccess(action.payload.id));
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