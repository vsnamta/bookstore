import { call, put, takeEvery } from 'redux-saga/effects';
import cartApi from '../../apis/cartApi';
import { CartResult } from '../../models/carts';
import { findCartList, findCartListAsync, removeCart, removeCartSuccess, saveCart, saveCartSuccess, updateCart, updateCartSuccess } from './action';
import { FIND_CART_LIST, REMOVE_CART, SAVE_CART, UPDATE_CART } from './actionType';

function* findCartListSaga(action: ReturnType<typeof findCartList>) {
    yield put(findCartListAsync.request());

    try {
        const cartList: CartResult[] = yield call(cartApi.findAll, action.payload);

        yield put(findCartListAsync.success(cartList));
    } catch (error) {
        yield put(findCartListAsync.failure(error));
    }
};

function* updateCartSaga(action: ReturnType<typeof updateCart>) {
    try {
        const cart: CartResult = yield call(cartApi.update, action.payload.id, action.payload.payload);

        yield put(updateCartSuccess(cart));
        action.payload.onSuccess && action.payload.onSuccess(cart);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveCartSaga(action: ReturnType<typeof saveCart>) {
    try {
        const cart: CartResult = yield call(cartApi.save, action.payload.payload);

        yield put(saveCartSuccess(cart));
        action.payload.onSuccess && action.payload.onSuccess(cart);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* removeCartSaga(action: ReturnType<typeof removeCart>) {
    try {
        yield call(cartApi.remove, action.payload.ids);

        yield put(removeCartSuccess(action.payload.ids));
        action.payload.onSuccess && action.payload.onSuccess();
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* cartsSaga() {
    yield takeEvery(FIND_CART_LIST, findCartListSaga);
    yield takeEvery(UPDATE_CART, updateCartSaga);
    yield takeEvery(SAVE_CART, saveCartSaga);
    yield takeEvery(REMOVE_CART, removeCartSaga);
}