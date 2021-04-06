import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import fileApi from '../../apis/fileApi';
import productApi from '../../apis/productApi';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductResult } from '../../models/products';
import { createFindProductAction, createFindProductPageAction, createSaveProductAction, createSaveProductSuccessAction, createUpdateProductAction, createUpdateProductSuccessAction, findProductAsyncActionCreator, findProductPageAsyncActionCreator } from './action';
import { FIND_PRODUCT, FIND_PRODUCT_PAGE, SAVE_PRODUCT, UPDATE_PRODUCT } from './actionType';
import { ProductsState } from './reducer';

function* findProductPageSaga({ payload: productFindPayload }: ReturnType<typeof createFindProductPageAction>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);
    
    if(JSON.stringify(productsState.productPageAsync.payload) === JSON.stringify(productFindPayload) 
        && productsState.productPageAsync.result !== undefined) {
        return;
    }

    yield put(findProductPageAsyncActionCreator.request(productFindPayload));

    try {
        const productPage: Page<ProductResult> = yield call(productApi.findAll, productFindPayload);

        yield put(findProductPageAsyncActionCreator.success(productPage));
    } catch (error) {
        yield put(findProductPageAsyncActionCreator.failure(error));
    }
};

function* findProductSaga({ payload: id }: ReturnType<typeof createFindProductAction>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);

    if(productsState.productAsync.payload === id && productsState.productAsync.result !== undefined) {
        return;
    }

    yield put(findProductAsyncActionCreator.request(id));

    try {
        const product: ProductDetailResult = yield call(productApi.findOne, id);

        yield put(findProductAsyncActionCreator.success(product));
    } catch (error) {
        yield put(findProductAsyncActionCreator.failure(error));
    }
};

function* updateProductSaga({ payload: productUpdateActionPayload }: ReturnType<typeof createUpdateProductAction>) {
    try {
        let product: ProductDetailResult;

        if(productUpdateActionPayload.file) {
            const originalFileName = productUpdateActionPayload.payload.imageFileName;
            
            const newFileName: string = yield call(fileApi.save, productUpdateActionPayload.file);
            productUpdateActionPayload.payload.imageFileName = newFileName;

            product = yield call(productApi.update, productUpdateActionPayload.id, productUpdateActionPayload.payload);

            yield call(fileApi.remove, originalFileName);
        } else {
            product = yield call(productApi.update, productUpdateActionPayload.id, productUpdateActionPayload.payload);
        }

        yield put(createUpdateProductSuccessAction(product));
        productUpdateActionPayload.onSuccess && productUpdateActionPayload.onSuccess(product);
    } catch (error) {
        productUpdateActionPayload.onFailure && productUpdateActionPayload.onFailure(error);
    }
};

function* saveProductSaga({ payload: productSaveActionPayload }: ReturnType<typeof createSaveProductAction>) {
    try {
        const fileName: string = yield call(fileApi.save, productSaveActionPayload.file);
        productSaveActionPayload.payload.imageFileName = fileName;

        const product: ProductDetailResult = yield call(productApi.save, productSaveActionPayload.payload);

        yield put(createSaveProductSuccessAction(product));
        productSaveActionPayload.onSuccess && productSaveActionPayload.onSuccess(product);
    } catch (error) {
        productSaveActionPayload.onFailure && productSaveActionPayload.onFailure(error);
    }
};

export default function* productsSaga() {
    yield takeEvery(FIND_PRODUCT_PAGE, findProductPageSaga);
    yield takeEvery(FIND_PRODUCT, findProductSaga);
    yield takeEvery(UPDATE_PRODUCT, updateProductSaga);
    yield takeEvery(SAVE_PRODUCT, saveProductSaga);
}