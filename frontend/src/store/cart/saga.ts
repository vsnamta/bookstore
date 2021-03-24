import { call, put, takeEvery } from 'redux-saga/effects';
import cartApi from '../../apis/cartApi';
import { CartResult } from '../../models/carts';
import { createFindCartListAction, findCartListAsyncActionCreator, createRemoveCartAction, createRemoveCartSuccessAction, createSaveCartAction, createSaveCartSuccessAction, createUpdateCartAction, createUpdateCartSuccessAction } from './action';
import { FIND_CART_LIST, REMOVE_CART, SAVE_CART, UPDATE_CART } from './actionType';

function* findCartListSaga(action: ReturnType<typeof createFindCartListAction>) {
    yield put(findCartListAsyncActionCreator.request());

    try {
        const cartList: CartResult[] = yield call(cartApi.findAll, action.payload);

        yield put(findCartListAsyncActionCreator.success(cartList));
    } catch (error) {
        yield put(findCartListAsyncActionCreator.failure(error));
    }
};

function* updateCartSaga(action: ReturnType<typeof createUpdateCartAction>) {
    try {
        const cart: CartResult = yield call(cartApi.update, action.payload.id, action.payload.payload);

        yield put(createUpdateCartSuccessAction(cart));
        action.payload.onSuccess && action.payload.onSuccess(cart);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveCartSaga(action: ReturnType<typeof createSaveCartAction>) {
    try {
        const cart: CartResult = yield call(cartApi.save, action.payload.payload);

        yield put(createSaveCartSuccessAction(cart));
        action.payload.onSuccess && action.payload.onSuccess(cart);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* removeCartSaga(action: ReturnType<typeof createRemoveCartAction>) {
    try {
        yield call(cartApi.remove, action.payload.ids);

        yield put(createRemoveCartSuccessAction(action.payload.ids));
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