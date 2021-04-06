import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import fileApi from '../../apis/fileApi';
import productApi from '../../apis/productApi';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductResult } from '../../models/products';
import { createFindProductAction, createFindProductPageAction, createSaveProductAction, createSaveProductRequestAction, createSetProductAsyncAction, createSetProductPageAsyncAction, createUpdateProductAction, createUpdateProductRequestAction } from './action';
import { FIND_PRODUCT, FIND_PRODUCT_PAGE, SAVE_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST } from './actionType';
import { ProductsState } from './reducer';

function* findProductPageSaga({ payload: productFindPayload }: ReturnType<typeof createFindProductPageAction>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);
    
    if(JSON.stringify(productsState.productPageAsync.payload) === JSON.stringify(productFindPayload) 
        && productsState.productPageAsync.result !== undefined) {
        return;
    }

    try {
        const productPage: Page<ProductResult> = yield call(productApi.findAll, productFindPayload);

        yield put(createSetProductPageAsyncAction({
            payload: productFindPayload,
            result: productPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetProductPageAsyncAction({
            payload: productFindPayload,
            result: undefined,
            error: error
        }));
    }
};

function* findProductSaga({ payload: id }: ReturnType<typeof createFindProductAction>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);

    if(productsState.productAsync.payload === id && productsState.productAsync.result !== undefined) {
        return;
    }

    try {
        const product: ProductDetailResult = yield call(productApi.findOne, id);

        yield put(createSetProductAsyncAction({
            payload: id,
            result: product,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetProductAsyncAction({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateProductRequestSaga({ payload: productUpdateActionPayload }: ReturnType<typeof createUpdateProductRequestAction>) {
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

        yield put(createUpdateProductAction(product));
        productUpdateActionPayload.onSuccess && productUpdateActionPayload.onSuccess(product);
    } catch (error) {
        productUpdateActionPayload.onFailure && productUpdateActionPayload.onFailure(error);
    }
};

function* saveProductRequestSaga({ payload: productSaveActionPayload }: ReturnType<typeof createSaveProductRequestAction>) {
    try {
        const fileName: string = yield call(fileApi.save, productSaveActionPayload.file);
        productSaveActionPayload.payload.imageFileName = fileName;

        const product: ProductDetailResult = yield call(productApi.save, productSaveActionPayload.payload);

        yield put(createSaveProductAction(product));
        productSaveActionPayload.onSuccess && productSaveActionPayload.onSuccess(product);
    } catch (error) {
        productSaveActionPayload.onFailure && productSaveActionPayload.onFailure(error);
    }
};

export default function* productsSaga() {
    yield takeEvery(FIND_PRODUCT_PAGE, findProductPageSaga);
    yield takeEvery(FIND_PRODUCT, findProductSaga);
    yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductRequestSaga);
    yield takeEvery(SAVE_PRODUCT_REQUEST, saveProductRequestSaga);
}