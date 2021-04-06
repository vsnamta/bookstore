import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import cartApi from '../../apis/cartApi';
import { CartResult } from '../../models/carts';
import { createCartListFindAction, createCartRemoveAction, createCartRemoveRequestAction, createCartSaveAction, createCartSaveRequestAction, createCartListAsyncSetAction, createCartUpdateAction, createCartUpdateRequestAction } from './action';
import { FIND_CART_LIST, REMOVE_CART, REMOVE_CART_REQUEST, SAVE_CART, SAVE_CART_REQUEST, UPDATE_CART, UPDATE_CART_REQUEST } from './actionType';
import { CartsState } from './reducer';

function* findCartListSaga({ payload: cartFindPayload }: ReturnType<typeof createCartListFindAction>) {
    const cartsState: CartsState = yield select((state: RootState) => state.carts);
    
    if(cartsState.cartListAsync.payload?.memberId === cartFindPayload.memberId
        && cartsState.cartListAsync.result !== undefined) {
        return;
    }

    try {
        const cartList: CartResult[] = yield call(cartApi.findAll, cartFindPayload);

        yield put(createCartListAsyncSetAction({
            result: cartList.map(cart => ({ ...cart, checked: true })),
            error: undefined
        }));
    } catch (error) {
        yield put(createCartListAsyncSetAction({
            result: undefined,
            error: error
        }));
    }
};

function* updateCartRequestSaga({ payload: cartUpdateRequestActionPayload }: ReturnType<typeof createCartUpdateRequestAction>) {
    try {
        const cart: CartResult = yield call(cartApi.update, cartUpdateRequestActionPayload.id, cartUpdateRequestActionPayload.payload);
        cart.checked = true;

        yield put(createCartUpdateAction(cart));
        cartUpdateRequestActionPayload.onSuccess && cartUpdateRequestActionPayload.onSuccess(cart);
    } catch (error) {
        cartUpdateRequestActionPayload.onFailure && cartUpdateRequestActionPayload.onFailure(error);
    }
};

function* saveCartRequestSaga({ payload: cartSaveRequestActionPayload }: ReturnType<typeof createCartSaveRequestAction>) {
    try {
        const cart: CartResult = yield call(cartApi.save, cartSaveRequestActionPayload.payload);
        cart.checked = true;

        yield put(createCartSaveAction(cart));
        cartSaveRequestActionPayload.onSuccess && cartSaveRequestActionPayload.onSuccess(cart);
    } catch (error) {
        cartSaveRequestActionPayload.onFailure && cartSaveRequestActionPayload.onFailure(error);
    }
};

function* removeCartRequestSaga({ payload: cartRemoveRequestActionPayload }: ReturnType<typeof createCartRemoveRequestAction>) {
    try {
        yield call(cartApi.remove, cartRemoveRequestActionPayload.ids);

        yield put(createCartRemoveAction(cartRemoveRequestActionPayload.ids));
        cartRemoveRequestActionPayload.onSuccess && cartRemoveRequestActionPayload.onSuccess();
    } catch (error) {
        cartRemoveRequestActionPayload.onFailure && cartRemoveRequestActionPayload.onFailure(error);
    }
};

export default function* cartsSaga() {
    yield takeEvery(FIND_CART_LIST, findCartListSaga);
    yield takeEvery(UPDATE_CART_REQUEST, updateCartRequestSaga);
    yield takeEvery(SAVE_CART_REQUEST, saveCartRequestSaga);
    yield takeEvery(REMOVE_CART_REQUEST, removeCartRequestSaga);
}