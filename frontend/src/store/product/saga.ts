import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import fileApi from '../../apis/fileApi';
import productApi from '../../apis/productApi';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult } from '../../models/product';
import { AsyncProduct, AsyncProductPage, ProductsState } from '../../models/product/store';

function* fetchProductPageSaga({ payload: productFindPayload }: ReturnType<typeof actions.fetchProductPage>) {
    const asyncProductPage: AsyncProductPage = yield select((state: RootState) => state.products.asyncProductPage);
    
    if(asyncProductPage.result !== undefined 
        && JSON.stringify(asyncProductPage.payload) === JSON.stringify(productFindPayload)) {
        return;
    }

    try {
        const productPage: Page<ProductResult> = yield call(productApi.findAll, productFindPayload);

        yield put(actions.setAsyncProductPage({
            payload: productFindPayload,
            result: productPage,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncProductPage({
            payload: productFindPayload,
            result: undefined,
            error: error
        }));
    }
};

function* findProductSaga({ payload: id }: ReturnType<typeof actions.fetchProduct>) {
    const asyncProduct: AsyncProduct = yield select((state: RootState) => state.products.asyncProduct);

    if(asyncProduct.result !== undefined && asyncProduct.payload === id) {
        return;
    }

    try {
        const product: ProductDetailResult = yield call(productApi.findOne, id);

        yield put(actions.setAsyncProduct({
            payload: id,
            result: product,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncProduct({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateProductAsyncSaga({ payload: productUpdateAsyncPayload }: ReturnType<typeof actions.updateProductAsync>) {
    try {
        let product: ProductDetailResult;

        if(productUpdateAsyncPayload.file) {
            const originalFileName = productUpdateAsyncPayload.payload.imageFileName;
            
            const newFileName: string = yield call(fileApi.save, productUpdateAsyncPayload.file);
            productUpdateAsyncPayload.payload.imageFileName = newFileName;

            product = yield call(productApi.update, productUpdateAsyncPayload.id, productUpdateAsyncPayload.payload);

            yield call(fileApi.remove, originalFileName);
        } else {
            product = yield call(productApi.update, productUpdateAsyncPayload.id, productUpdateAsyncPayload.payload);
        }

        yield put(actions.updateProduct(product));
        productUpdateAsyncPayload.onSuccess?.(product);
    } catch (error) {
        productUpdateAsyncPayload.onFailure?.(error);
    }
};

function* saveProductAsyncSaga({ payload: productSaveAsyncPayload }: ReturnType<typeof actions.saveProductAsync>) {
    try {
        const fileName: string = yield call(fileApi.save, productSaveAsyncPayload.file);
        productSaveAsyncPayload.payload.imageFileName = fileName;
        const product: ProductDetailResult = yield call(productApi.save, productSaveAsyncPayload.payload);

        const currentProductFindPayload: ProductFindPayload = yield select((state: RootState) => state.products.asyncProductPage.payload);

        const productFindPayload: ProductFindPayload = { pageCriteria: { page: 1, size: 10 } }

        if(JSON.stringify(currentProductFindPayload) === JSON.stringify(productFindPayload)) {
            yield put(actions.saveProduct(product));
        } else {
            yield put(actions.setAsyncProduct({
                payload: product.id,
                result: product,
                error: undefined
            }));
    
            const productPage: Page<ProductResult> = yield call(productApi.findAll, productFindPayload);
    
            yield put(actions.setAsyncProductPage({
                payload: productFindPayload,
                result: productPage,
                error: undefined
            }));
        }  

        productSaveAsyncPayload.onSuccess?.(product);
    } catch (error) {
        productSaveAsyncPayload.onFailure?.(error);
    }
};

export default function* productsSaga() {
    yield takeEvery(types.FETCH_PRODUCT_PAGE, fetchProductPageSaga);
    yield takeEvery(types.FETCH_PRODUCT, findProductSaga);
    yield takeEvery(types.UPDATE_PRODUCT_ASYNC, updateProductAsyncSaga);
    yield takeEvery(types.SAVE_PRODUCT_ASYNC, saveProductAsyncSaga);
}