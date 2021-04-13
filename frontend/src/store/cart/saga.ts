import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import cartApi from '../../apis/cartApi';
import { CartResult } from '../../models/cart';
import { AsyncCartList } from '../../models/cart/store';

function* fetchCartListSaga({ payload: cartFindPayload }: ReturnType<typeof actions.fetchCartList>) {
    const asyncCartList: AsyncCartList = yield select((state: RootState) => state.carts.asyncCartList);
    
    if(asyncCartList.result !== undefined && asyncCartList.payload?.memberId === cartFindPayload.memberId) {
        return;
    }

    try {
        const cartList: CartResult[] = yield call(cartApi.findAll, cartFindPayload);

        yield put(actions.setAsyncCartList({
            payload: cartFindPayload,
            result: cartList.map(cart => ({ ...cart, checked: true })),
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncCartList({
            payload: cartFindPayload,
            result: undefined,
            error: error
        }));
    }
};

function* updateCartAsyncSaga({ payload: cartUpdateAsyncPayload }: ReturnType<typeof actions.updateCartAsync>) {
    try {
        const cart: CartResult = yield call(cartApi.update, cartUpdateAsyncPayload.id, cartUpdateAsyncPayload.payload);
        cart.checked = true;

        yield put(actions.updateCart(cart));
        cartUpdateAsyncPayload.onSuccess?.(cart);
    } catch (error) {
        cartUpdateAsyncPayload.onFailure?.(error);
    }
};

function* removeCartAsyncSaga({ payload: cartRemoveAsyncPayload }: ReturnType<typeof actions.removeCartAsync>) {
    try {
        yield call(cartApi.remove, cartRemoveAsyncPayload.ids);

        yield put(actions.removeCart(cartRemoveAsyncPayload.ids));
        cartRemoveAsyncPayload.onSuccess?.();
    } catch (error) {
        cartRemoveAsyncPayload.onFailure?.(error);
    }
};

function* saveCartAsyncSaga({ payload: cartSaveAsyncPayload }: ReturnType<typeof actions.saveCartAsync>) {
    try {
        const cart: CartResult = yield call(cartApi.save, cartSaveAsyncPayload.payload);
        cart.checked = true;

        yield put(actions.saveCart(cart));
        cartSaveAsyncPayload.onSuccess?.(cart);
    } catch (error) {
        cartSaveAsyncPayload.onFailure?.(error);
    }
};

export default function* cartsSaga() {
    yield takeEvery(types.FETCH_CART_LIST, fetchCartListSaga);
    yield takeEvery(types.UPDATE_CART_ASYNC, updateCartAsyncSaga);
    yield takeEvery(types.REMOVE_CART_ASYNC, removeCartAsyncSaga);
    yield takeEvery(types.SAVE_CART_ASYNC, saveCartAsyncSaga);
}