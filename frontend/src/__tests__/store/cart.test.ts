import qs from 'qs';
import { waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";
import { CartFindPayload } from '../../models/cart';

describe('cart store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchCartList', async () => {
        // given
        store.dispatch(rootActions.setAsyncCartList({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        const cartFindPayload: CartFindPayload = {
            memberId: "test"
        };
        const queryString = qs.stringify(cartFindPayload, { allowDots: true });

        mockAxios.onGet(`/api/carts/${queryString}`).reply(200, [{
            id: 1,
            productId: 1,
            productName: "Clean Code",
            imageFileName: "test.jpg",
            regularPrice: 33000,
            stockQuantity: 100,
            discountPercent: 10,
            depositPercent: 5,
            quantity: 1
        }]);

        // when
        store.dispatch(rootActions.fetchCartList(cartFindPayload));

        // then
        await waitFor(() => {
            const cartList = store.getState().carts.asyncCartList.result;

            expect(cartList?.length).toEqual(1);
        });
    });

    it('checkAllCart', () => {
        // given
        store.dispatch(rootActions.setAsyncCartList({
            payload: { memberId: "test" },
            result: [{
                id: 1,
                productId: 1,
                productName: "Clean Code",
                imageFileName: "test.jpg",
                regularPrice: 33000,
                stockQuantity: 100,
                discountPercent: 10,
                depositPercent: 5,
                quantity: 1,
                checked: true
            }],
            error: undefined
        }));

        // when
        store.dispatch(rootActions.checkAllCart(false));

        // then
        const cartList = store.getState().carts.asyncCartList.result;

        expect(cartList?.every(cart => cart.checked === false)).toEqual(true);
    });

    it('checkCart', () => {
        // given
        store.dispatch(rootActions.setAsyncCartList({
            payload: { memberId: "test" },
            result: [{
                id: 1,
                productId: 1,
                productName: "Clean Code",
                imageFileName: "test.jpg",
                regularPrice: 33000,
                stockQuantity: 100,
                discountPercent: 10,
                depositPercent: 5,
                quantity: 1,
                checked: true
            }],
            error: undefined
        }));

        // when
        store.dispatch(rootActions.checkCart({ id: 1, checked: false }));

        // then
        const cartList = store.getState().carts.asyncCartList.result;

        expect(cartList?.[0].checked).toEqual(true);
    });

    it('updateCartAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncCartList({
            payload: { memberId: "test" },
            result: [{
                id: 1,
                productId: 1,
                productName: "Clean Code",
                imageFileName: "test.jpg",
                regularPrice: 33000,
                stockQuantity: 100,
                discountPercent: 10,
                depositPercent: 5,
                quantity: 1,
                checked: true
            }],
            error: undefined
        }));

        mockAxios.onPut("/api/carts/1").reply(200, {
            id: 1,
            productId: 1,
            productName: "Clean Code",
            imageFileName: "test.jpg",
            regularPrice: 33000,
            stockQuantity: 100,
            discountPercent: 10,
            depositPercent: 5,
            quantity: 2
        });

        // when
        store.dispatch(rootActions.updateCartAsync({
            id: 1,
            payload: { quantity: 2 }
        }));

        // then
        await waitFor(() => {
            const cartList = store.getState().carts.asyncCartList.result;

            expect(cartList?.[0].quantity).toEqual(2);
        });
    });

    it('removeCartAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncCartList({
            payload: { memberId: "test" },
            result: [{
                id: 1,
                productId: 1,
                productName: "Clean Code",
                imageFileName: "test.jpg",
                regularPrice: 33000,
                stockQuantity: 100,
                discountPercent: 10,
                depositPercent: 5,
                quantity: 1,
                checked: true
            }],
            error: undefined
        }));

        mockAxios.onDelete("/api/carts").reply(200);

        // when
        store.dispatch(rootActions.removeCartAsync({ ids: [1] }));

        // then
        await waitFor(() => {
            const asyncCartList = store.getState().carts.asyncCartList;

            expect(asyncCartList.result).toEqual([]);
        });
    });

    it('saveCartAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncCartList({
            payload: { memberId: "test" },
            result: [],
            error: undefined
        }));

        mockAxios.onPost("/api/carts").reply(200, {
            id: 1,
            productId: 1,
            productName: "Clean Code",
            imageFileName: "test.jpg",
            regularPrice: 33000,
            stockQuantity: 100,
            discountPercent: 10,
            depositPercent: 5,
            quantity: 1
        });

        // when
        store.dispatch(rootActions.saveCartAsync({ payload: { productId: 1, quantity: 1 } }));

        // then
        await waitFor(() => {
            const cartList = store.getState().carts.asyncCartList.result;

            expect(cartList?.length).toEqual(1);
        });
    });
});