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

function* updateCategorySaga({ payload: categoryUpdateActionPayload }: ReturnType<typeof createUpdateCategoryAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.update, categoryUpdateActionPayload.id, categoryUpdateActionPayload.payload);

        yield put(createUpdateCategorySuccessAction(category));
        categoryUpdateActionPayload.onSuccess && categoryUpdateActionPayload.onSuccess(category);
    } catch (error) {
        categoryUpdateActionPayload.onFailure && categoryUpdateActionPayload.onFailure(error);
    }
};

function* saveCategorySaga({ payload: categorySaveActionPayload }: ReturnType<typeof createSaveCategoryAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.save, categorySaveActionPayload.payload);

        yield put(createSaveCategorySuccessAction(category));
        categorySaveActionPayload.onSuccess && categorySaveActionPayload.onSuccess(category);
    } catch (error) {
        categorySaveActionPayload.onFailure && categorySaveActionPayload.onFailure(error);
    }
};

function* removeCategorySaga({ payload: categoryRemoveActionPayload }: ReturnType<typeof createRemoveCategoryAction>) {
    try {
        yield call(categoryApi.remove, categoryRemoveActionPayload.id);

        yield put(createRemoveCategorySuccessAction(categoryRemoveActionPayload.id));
        categoryRemoveActionPayload.onSuccess && categoryRemoveActionPayload.onSuccess();
    } catch (error) {
        categoryRemoveActionPayload.onFailure && categoryRemoveActionPayload.onFailure(error);
    }
};

export default function* categoriesSaga() {
    yield takeEvery(FIND_CATEGORY_LIST, findCategoryListSaga);
    yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
    yield takeEvery(SAVE_CATEGORY, saveCategorySaga);
    yield takeEvery(REMOVE_CATEGORY, removeCategorySaga);
}