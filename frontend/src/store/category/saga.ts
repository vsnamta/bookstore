import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import categoryApi from '../../apis/categoryApi';
import { CategoryResult } from '../../models/categories';
import { createFindCategoryListAction, createRemoveCategoryAction, createRemoveCategoryRequestAction, createSaveCategoryAction, createSaveCategoryRequestAction, createSetCategoryListAsyncAction, createUpdateCategoryAction, createUpdateCategoryRequestAction } from './action';
import { FIND_CATEGORY_LIST, REMOVE_CATEGORY_REQUEST, SAVE_CATEGORY_REQUEST, UPDATE_CATEGORY_REQUEST } from './actionType';
import { CategoriesState } from './reducer';

function* findCategoryListSaga(action: ReturnType<typeof createFindCategoryListAction>) {
    const categoriesState: CategoriesState = yield select((state: RootState) => state.categories);
    
    if(categoriesState.categoryListAsync.result !== undefined) {
        return;
    }

    try {
        const categoryList: CategoryResult[] = yield call(categoryApi.findAll);

        yield put(createSetCategoryListAsyncAction({
            result: categoryList,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetCategoryListAsyncAction({
            result: undefined,
            error: error
        }));
    }
};

function* updateCategoryRequestSaga({ payload: categoryUpdateActionPayload }: ReturnType<typeof createUpdateCategoryRequestAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.update, categoryUpdateActionPayload.id, categoryUpdateActionPayload.payload);

        yield put(createUpdateCategoryAction(category));
        categoryUpdateActionPayload.onSuccess && categoryUpdateActionPayload.onSuccess(category);
    } catch (error) {
        categoryUpdateActionPayload.onFailure && categoryUpdateActionPayload.onFailure(error);
    }
};

function* saveCategoryRequestSaga({ payload: categorySaveActionPayload }: ReturnType<typeof createSaveCategoryRequestAction>) {
    try {
        const category: CategoryResult = yield call(categoryApi.save, categorySaveActionPayload.payload);

        yield put(createSaveCategoryAction(category));
        categorySaveActionPayload.onSuccess && categorySaveActionPayload.onSuccess(category);
    } catch (error) {
        categorySaveActionPayload.onFailure && categorySaveActionPayload.onFailure(error);
    }
};

function* removeCategoryRequestSaga({ payload: categoryRemoveActionPayload }: ReturnType<typeof createRemoveCategoryRequestAction>) {
    try {
        yield call(categoryApi.remove, categoryRemoveActionPayload.id);

        yield put(createRemoveCategoryAction(categoryRemoveActionPayload.id));
        categoryRemoveActionPayload.onSuccess && categoryRemoveActionPayload.onSuccess();
    } catch (error) {
        categoryRemoveActionPayload.onFailure && categoryRemoveActionPayload.onFailure(error);
    }
};

export default function* categoriesSaga() {
    yield takeEvery(FIND_CATEGORY_LIST, findCategoryListSaga);
    yield takeEvery(UPDATE_CATEGORY_REQUEST, updateCategoryRequestSaga);
    yield takeEvery(SAVE_CATEGORY_REQUEST, saveCategoryRequestSaga);
    yield takeEvery(REMOVE_CATEGORY_REQUEST, removeCategoryRequestSaga);
}