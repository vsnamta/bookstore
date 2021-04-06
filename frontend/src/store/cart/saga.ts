import { call, put, takeEvery } from 'redux-saga/effects';
import cartApi from '../../apis/cartApi';
import { CartResult } from '../../models/carts';
import { createFindCartListAction, findCartListAsyncActionCreator, createRemoveCartAction, createRemoveCartSuccessAction, createSaveCartAction, createSaveCartSuccessAction, createUpdateCartAction, createUpdateCartSuccessAction } from './action';
import { FIND_CART_LIST, REMOVE_CART, SAVE_CART, UPDATE_CART } from './actionType';

function* findCartListSaga({ payload: cartFindPayload }: ReturnType<typeof createFindCartListAction>) {
    yield put(findCartListAsyncActionCreator.request());

    try {
        const cartList: CartResult[] = yield call(cartApi.findAll, cartFindPayload);

        yield put(findCartListAsyncActionCreator.success(cartList.map(cart => ({ ...cart, checked: true }))));
    } catch (error) {
        yield put(findCartListAsyncActionCreator.failure(error));
    }
};

function* updateCartSaga({ payload: cartUpdateActionPayload }: ReturnType<typeof createUpdateCartAction>) {
    try {
        const cart: CartResult = yield call(cartApi.update, cartUpdateActionPayload.id, cartUpdateActionPayload.payload);
        cart.checked = true;

        yield put(createUpdateCartSuccessAction(cart));
        cartUpdateActionPayload.onSuccess && cartUpdateActionPayload.onSuccess(cart);
    } catch (error) {
        cartUpdateActionPayload.onFailure && cartUpdateActionPayload.onFailure(error);
    }
};

function* saveCartSaga({ payload: cartSaveActionPayload }: ReturnType<typeof createSaveCartAction>) {
    try {
        const cart: CartResult = yield call(cartApi.save, cartSaveActionPayload.payload);
        cart.checked = true;

        yield put(createSaveCartSuccessAction(cart));
        cartSaveActionPayload.onSuccess && cartSaveActionPayload.onSuccess(cart);
    } catch (error) {
        cartSaveActionPayload.onFailure && cartSaveActionPayload.onFailure(error);
    }
};

function* removeCartSaga({ payload: cartRemoveActionPayload }: ReturnType<typeof createRemoveCartAction>) {
    try {
        yield call(cartApi.remove, cartRemoveActionPayload.ids);

        yield put(createRemoveCartSuccessAction(cartRemoveActionPayload.ids));
        cartRemoveActionPayload.onSuccess && cartRemoveActionPayload.onSuccess();
    } catch (error) {
        cartRemoveActionPayload.onFailure && cartRemoveActionPayload.onFailure(error);
    }
};

export default function* cartsSaga() {
    yield takeEvery(FIND_CART_LIST, findCartListSaga);
    yield takeEvery(UPDATE_CART, updateCartSaga);
    yield takeEvery(SAVE_CART, saveCartSaga);
    yield takeEvery(REMOVE_CART, removeCartSaga);
}