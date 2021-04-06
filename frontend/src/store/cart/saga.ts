import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import cartApi from '../../apis/cartApi';
import { CartResult } from '../../models/carts';
import { createFindCartListAction, createRemoveCartAction, createRemoveCartRequestAction, createSaveCartAction, createSaveCartRequestAction, createSetCartListAsyncAction, createUpdateCartAction, createUpdateCartRequestAction } from './action';
import { FIND_CART_LIST, REMOVE_CART, REMOVE_CART_REQUEST, SAVE_CART, SAVE_CART_REQUEST, UPDATE_CART, UPDATE_CART_REQUEST } from './actionType';
import { CartsState } from './reducer';

function* findCartListSaga({ payload: cartFindPayload }: ReturnType<typeof createFindCartListAction>) {
    const cartsState: CartsState = yield select((state: RootState) => state.carts);
    
    if(cartsState.cartListAsync.payload?.memberId === cartFindPayload.memberId
        && cartsState.cartListAsync.result !== undefined) {
        return;
    }

    try {
        const cartList: CartResult[] = yield call(cartApi.findAll, cartFindPayload);

        yield put(createSetCartListAsyncAction({
            result: cartList.map(cart => ({ ...cart, checked: true })),
            error: undefined
        }));
    } catch (error) {
        yield put(createSetCartListAsyncAction({
            result: undefined,
            error: error
        }));
    }
};

function* updateCartRequestSaga({ payload: cartUpdateActionPayload }: ReturnType<typeof createUpdateCartRequestAction>) {
    try {
        const cart: CartResult = yield call(cartApi.update, cartUpdateActionPayload.id, cartUpdateActionPayload.payload);
        cart.checked = true;

        yield put(createUpdateCartAction(cart));
        cartUpdateActionPayload.onSuccess && cartUpdateActionPayload.onSuccess(cart);
    } catch (error) {
        cartUpdateActionPayload.onFailure && cartUpdateActionPayload.onFailure(error);
    }
};

function* saveCartRequestSaga({ payload: cartSaveActionPayload }: ReturnType<typeof createSaveCartRequestAction>) {
    try {
        const cart: CartResult = yield call(cartApi.save, cartSaveActionPayload.payload);
        cart.checked = true;

        yield put(createSaveCartAction(cart));
        cartSaveActionPayload.onSuccess && cartSaveActionPayload.onSuccess(cart);
    } catch (error) {
        cartSaveActionPayload.onFailure && cartSaveActionPayload.onFailure(error);
    }
};

function* removeCartRequestSaga({ payload: cartRemoveActionPayload }: ReturnType<typeof createRemoveCartRequestAction>) {
    try {
        yield call(cartApi.remove, cartRemoveActionPayload.ids);

        yield put(createRemoveCartAction(cartRemoveActionPayload.ids));
        cartRemoveActionPayload.onSuccess && cartRemoveActionPayload.onSuccess();
    } catch (error) {
        cartRemoveActionPayload.onFailure && cartRemoveActionPayload.onFailure(error);
    }
};

export default function* cartsSaga() {
    yield takeEvery(FIND_CART_LIST, findCartListSaga);
    yield takeEvery(UPDATE_CART_REQUEST, updateCartRequestSaga);
    yield takeEvery(SAVE_CART_REQUEST, saveCartRequestSaga);
    yield takeEvery(REMOVE_CART_REQUEST, removeCartRequestSaga);
}