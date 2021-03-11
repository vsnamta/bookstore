import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import fileApi from '../../apis/fileApi';
import productApi from '../../apis/productApi';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductResult } from '../../models/products';
import { findProduct, findProductAsync, findProductPage, findProductPageAsync, saveProduct, saveProductSuccess, updateProduct, updateProductSuccess } from './action';
import { FIND_PRODUCT, FIND_PRODUCT_PAGE, SAVE_PRODUCT, UPDATE_PRODUCT } from './actionType';
import { ProductsState } from './reducer';

function* findProductPageSaga(action: ReturnType<typeof findProductPage>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);
    
    if(JSON.stringify(productsState.productPageAsync.payload) === JSON.stringify(action.payload) 
        && productsState.productPageAsync.result !== undefined) {
        return;
    }

    yield put(findProductPageAsync.request(action.payload));

    try {
        const productPage: Page<ProductResult> = yield call(productApi.findAll, action.payload);

        yield put(findProductPageAsync.success(productPage));
    } catch (error) {
        yield put(findProductPageAsync.failure(error));
    }
};

function* findProductSaga(action: ReturnType<typeof findProduct>) {
    const productsState: ProductsState = yield select((state: RootState) => state.products);

    if(productsState.productAsync.payload === action.payload && productsState.productAsync.result !== undefined) {
        return;
    }

    yield put(findProductAsync.request(action.payload));

    try {
        const product: ProductDetailResult = yield call(productApi.findOne, action.payload);

        yield put(findProductAsync.success(product));
    } catch (error) {
        yield put(findProductAsync.failure(error));
    }
};

function* updateProductSaga(action: ReturnType<typeof updateProduct>) {
    try {
        let product: ProductDetailResult;

        if(action.payload.file) {
            const originalFileName = action.payload.payload.imageFileName;
            
            const newFileName: string = yield call(fileApi.save, action.payload.file);
            action.payload.payload.imageFileName = newFileName;

            product = yield call(productApi.update, action.payload.id, action.payload.payload);

            yield call(fileApi.remove, originalFileName);
        } else {
            product = yield call(productApi.update, action.payload.id, action.payload.payload);
        }

        yield put(updateProductSuccess(product));
        action.payload.onSuccess && action.payload.onSuccess(product);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveProductSaga(action: ReturnType<typeof saveProduct>) {
    try {
        const fileName: string = yield call(fileApi.save, action.payload.file);
        action.payload.payload.imageFileName = fileName;

        const product: ProductDetailResult = yield call(productApi.save, action.payload.payload);

        yield put(saveProductSuccess(product));
        action.payload.onSuccess && action.payload.onSuccess(product);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* productsSaga() {
    yield takeEvery(FIND_PRODUCT_PAGE, findProductPageSaga);
    yield takeEvery(FIND_PRODUCT, findProductSaga);
    yield takeEvery(UPDATE_PRODUCT, updateProductSaga);
    yield takeEvery(SAVE_PRODUCT, saveProductSaga);
}