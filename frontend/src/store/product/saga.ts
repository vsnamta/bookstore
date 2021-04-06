import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import fileApi from '../../apis/fileApi';
import productApi from '../../apis/productApi';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductResult } from '../../models/products';
import { createProductFindAction, createProductPageFindAction, createProductSaveAction, createProductSaveRequestAction, createProductAsyncSetAction, createProductPageAsyncSetAction, createProductUpdateAction, createProductUpdateRequestAction } from './action';
import { FIND_PRODUCT, FIND_PRODUCT_PAGE, SAVE_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST } from './actionType';
import { ProductsState } from './reducer';

function* findProductPageSaga({ payload: productFindPayload }: ReturnType<typeof createProductPageFindAction>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);
    
    if(JSON.stringify(productsState.productPageAsync.payload) === JSON.stringify(productFindPayload) 
        && productsState.productPageAsync.result !== undefined) {
        return;
    }

    try {
        const productPage: Page<ProductResult> = yield call(productApi.findAll, productFindPayload);

        yield put(createProductPageAsyncSetAction({
            payload: productFindPayload,
            result: productPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createProductPageAsyncSetAction({
            payload: productFindPayload,
            result: undefined,
            error: error
        }));
    }
};

function* findProductSaga({ payload: id }: ReturnType<typeof createProductFindAction>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);

    if(productsState.productAsync.payload === id && productsState.productAsync.result !== undefined) {
        return;
    }

    try {
        const product: ProductDetailResult = yield call(productApi.findOne, id);

        yield put(createProductAsyncSetAction({
            payload: id,
            result: product,
            error: undefined
        }));
    } catch (error) {
        yield put(createProductAsyncSetAction({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateProductRequestSaga({ payload: productUpdateRequestActionPayload }: ReturnType<typeof createProductUpdateRequestAction>) {
    try {
        let product: ProductDetailResult;

        if(productUpdateRequestActionPayload.file) {
            const originalFileName = productUpdateRequestActionPayload.payload.imageFileName;
            
            const newFileName: string = yield call(fileApi.save, productUpdateRequestActionPayload.file);
            productUpdateRequestActionPayload.payload.imageFileName = newFileName;

            product = yield call(productApi.update, productUpdateRequestActionPayload.id, productUpdateRequestActionPayload.payload);

            yield call(fileApi.remove, originalFileName);
        } else {
            product = yield call(productApi.update, productUpdateRequestActionPayload.id, productUpdateRequestActionPayload.payload);
        }

        yield put(createProductUpdateAction(product));
        productUpdateRequestActionPayload.onSuccess && productUpdateRequestActionPayload.onSuccess(product);
    } catch (error) {
        productUpdateRequestActionPayload.onFailure && productUpdateRequestActionPayload.onFailure(error);
    }
};

function* saveProductRequestSaga({ payload: productSaveRequestActionPayload }: ReturnType<typeof createProductSaveRequestAction>) {
    try {
        const fileName: string = yield call(fileApi.save, productSaveRequestActionPayload.file);
        productSaveRequestActionPayload.payload.imageFileName = fileName;

        const product: ProductDetailResult = yield call(productApi.save, productSaveRequestActionPayload.payload);

        yield put(createProductSaveAction(product));
        productSaveRequestActionPayload.onSuccess && productSaveRequestActionPayload.onSuccess(product);
    } catch (error) {
        productSaveRequestActionPayload.onFailure && productSaveRequestActionPayload.onFailure(error);
    }
};

export default function* productsSaga() {
    yield takeEvery(FIND_PRODUCT_PAGE, findProductPageSaga);
    yield takeEvery(FIND_PRODUCT, findProductSaga);
    yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductRequestSaga);
    yield takeEvery(SAVE_PRODUCT_REQUEST, saveProductRequestSaga);
}