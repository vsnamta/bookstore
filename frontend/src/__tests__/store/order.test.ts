import { waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";
import qs from 'qs';
import { FindPayload } from "../../models/common";

describe('order store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchOrderPage', async () => {
        // given
        store.dispatch(rootActions.setAsyncOrderPage({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        const findPayload: FindPayload = {
            searchCriteria: { column: "memberId", keyword: "test" },
            pageCriteria: { page: 1, size: 10 }
        };
        const queryString = qs.stringify(findPayload, { allowDots: true });

        mockAxios.onGet(`/api/orders/${queryString}`).reply(200, [{
            id: 1,
            memberName: "홍길동",
            orderLineName: "Clean Code",
            totalAmounts: 29700,
            statusName: "주문 완료",
            orderDate: "2020-01-01 00:00:00"
        }]);

        // when
        store.dispatch(rootActions.fetchOrderPage(findPayload));

        // then
        await waitFor(() => {
            const orderPage = store.getState().orders.asyncOrderPage.result;

            expect(orderPage?.list.length).toEqual(1);
        });
    });

    it('fetchOrder', async () => {
        // given
        store.dispatch(rootActions.setAsyncOrder({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        mockAxios.onGet("/api/orders/1").reply(200, {
            id: 1,
            memberName: "홍길동",
            orderLineResults: [{
                productId: 1,
                productName: "Clean Code",
                imageFileName: "test.jpg",
                regularPrice: 33000,
                discountPercent: 100,
                depositPercent: 5,
                quantity: 1
            }],
            totalAmounts: 29700,
            usedPoint: 0,
            depositPoint: 1650,
            receiverName: "홍길동",
            receiverPhoneNumber: "010-1234-5678",
            deliveryZipCode: "123-456",
            deliveryAddress1: "서울시 중구 명동 123번지",
            deliveryAddress2: "456호",
            deliveryMessage: "문 앞에 놓아주세요.",
            statusName: "주문 완료",
            statusUpdatedDate: "2020-01-01 00:00:00",
            statusHistoryResults: [{
                statusName: "주문 완료",
                createdDate: "2020-01-01 00:00:00"
            }]
        });

        // when
        store.dispatch(rootActions.fetchOrder(1));

        // then
        await waitFor(() => {
            const order = store.getState().orders.asyncOrder.result;

            expect(order?.orderLineResults[0].productName).toEqual("Clean Code");
        });
    });

    it('updateOrderAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncOrderPage({
            payload: {
                searchCriteria: { column: "memberId", keyword: "test" },
                pageCriteria: { page: 1, size: 10 }
            },
            result: {
                list: [{
                    id: 1,
                    memberName: "홍길동",
                    orderLineName: "Clean Code",
                    totalAmounts: 29700,
                    statusName: "주문 완료",
                    orderDate: "2020-01-01 00:00:00"
                }],
                totalCount: 1
            },
            error: undefined
        }));

        store.dispatch(rootActions.setAsyncOrder({
            payload: 1,
            result: {
                id: 1,
                memberName: "홍길동",
                orderLineResults: [{
                    productId: 1,
                    productName: "Clean Code",
                    imageFileName: "test.jpg",
                    regularPrice: 33000,
                    discountPercent: 100,
                    depositPercent: 5,
                    quantity: 1
                }],
                totalAmounts: 29700,
                usedPoint: 0,
                depositPoint: 1650,
                receiverName: "홍길동",
                receiverPhoneNumber: "010-1234-5678",
                deliveryZipCode: "123-456",
                deliveryAddress1: "서울시 중구 명동 123번지",
                deliveryAddress2: "456호",
                deliveryMessage: "문 앞에 놓아주세요.",
                statusName: "주문 완료",
                statusUpdatedDate: "2020-01-01 00:00:00",
                statusHistoryResults: [{
                    statusName: "주문 완료",
                    createdDate: "2020-01-01 00:00:00"
                }]
            },
            error: undefined
        }));

        mockAxios.onPut("/api/orders/1").reply(200, {
            payload: 1,
            result: {
                id: 1,
                memberName: "홍길동",
                orderLineResults: [{
                    productId: 1,
                    productName: "Clean Code",
                    imageFileName: "test.jpg",
                    regularPrice: 33000,
                    discountPercent: 100,
                    depositPercent: 5,
                    quantity: 1
                }],
                totalAmounts: 29700,
                usedPoint: 0,
                depositPoint: 1650,
                receiverName: "홍길동",
                receiverPhoneNumber: "010-1234-5678",
                deliveryZipCode: "123-456",
                deliveryAddress1: "서울시 중구 명동 123번지",
                deliveryAddress2: "456호",
                deliveryMessage: "문 앞에 놓아주세요.",
                statusName: "구매 확정",
                statusUpdatedDate: "2020-01-02 00:00:00",
                statusHistoryResults: [{
                    statusName: "주문 완료",
                    createdDate: "2020-01-01 00:00:00"
                }, {
                    statusName: "구매 확정",
                    createdDate: "2020-01-02 00:00:00"
                }]
            },
            error: undefined
        });

        // when
        store.dispatch(rootActions.updateOrderAsync({ id: 1, payload: { status: "COMPLETED" } }));

        // then
        await waitFor(() => {
            const orderPage = store.getState().orders.asyncOrderPage.result;
            const order = store.getState().orders.asyncOrder.result;
    
            expect(orderPage?.list[0].statusName).toEqual("구매 확정");
            expect(order?.statusName).toEqual("구매 확정");
        });
    });

    it('saveMemberAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncOrderPage({
            payload: {
                searchCriteria: { column: "memberId", keyword: "test" },
                pageCriteria: { page: 1, size: 10 }
            },
            result: {
                list: [],
                totalCount: 0
            },
            error: undefined
        }));

        store.dispatch(rootActions.setAsyncOrder({
            payload: undefined,
            result: undefined,
            error: undefined
        }));
        
        mockAxios.onPost("/api/orders").reply(200, {
            id: 1,
            memberName: "홍길동",
            orderLineResults: [{
                productId: 1,
                productName: "Clean Code",
                imageFileName: "test.jpg",
                regularPrice: 33000,
                discountPercent: 100,
                depositPercent: 5,
                quantity: 1
            }],
            totalAmounts: 29700,
            usedPoint: 0,
            depositPoint: 1650,
            receiverName: "홍길동",
            receiverPhoneNumber: "010-1234-5678",
            deliveryZipCode: "123-456",
            deliveryAddress1: "서울시 중구 명동 123번지",
            deliveryAddress2: "456호",
            deliveryMessage: "문 앞에 놓아주세요.",
            statusName: "주문 완료",
            statusUpdatedDate: "2020-01-01 00:00:00",
            statusHistoryResults: [{
                statusName: "주문 완료",
                createdDate: "2020-01-01 00:00:00"
            }]
        });

        mockAxios.onGet("/api/orders").reply(200, [{
            id: 1,
            memberName: "홍길동",
            orderLineName: "Clean Code",
            totalAmounts: 29700,
            statusName: "주문 완료",
            orderDate: "2020-01-01 00:00:00"
        }]);

        // when
        store.dispatch(rootActions.saveOrderAsync({ payload: { 
            orderProducts: [{
                cartId: undefined,
                productId: 1,
                quantity: 1
            }],
            usedPoint: 0,
            receiverName: "홍길동",
            receiverPhoneNumber: "010-1234-5678",
            deliveryZipCode: "123-456",
            deliveryAddress1: "서울시 중구 명동 123번지",
            deliveryAddress2: "456호",
            deliveryMessage: "문 앞에 놓아주세요."
        }}));

        // then
        await waitFor(() => {
            const orderPage = store.getState().orders.asyncOrderPage.result;
            const order = store.getState().orders.asyncOrder.result;
    
            expect(orderPage?.list[0].orderLineName).toEqual("Clean Code");
            expect(order?.orderLineResults[0].productName).toEqual("Clean Code");
        });
    });
});