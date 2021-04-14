import qs from 'qs';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import React from 'react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import CartManagementContainer from "../../container/cart/CartManagementContainer";
import HeaderContainer from "../../container/general/HeaderContainer";
import rootReducer, { rootActions, rootSaga } from "../../store";

describe('CartManagementContainer test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga); 

    const mockAxios = new MockAdapter(apiClient);

    // it('show', async () => {
    //     store.dispatch(rootActions.setMyData({
    //         id: "test",
    //         name: "홍길동",
    //         role: "USER"
    //     }));

    //     store.dispatch(rootActions.setAsyncCartList({
    //         payload: { memberId: "test" },
    //         result: [{
    //             id: 1,
    //             productId: 1,
    //             productName: "Clean Code",
    //             imageFileName: "test.jpg",
    //             regularPrice: 33000,
    //             stockQuantity: 100,
    //             discountPercent: 10,
    //             depositPercent: 5,
    //             quantity: 1,
    //             checked: true
    //         }],
    //         error: undefined
    //     }));

    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <CartManagementContainer />
    //         </Provider>
    //     );

    //     await waitFor(() => {
    //         getByText("Clean Code");
    //     });
    // });

    // it('remove', async () => {
    //     store.dispatch(rootActions.setMyData({
    //         id: "test",
    //         name: "홍길동",
    //         role: "USER"
    //     }));

    //     store.dispatch(rootActions.setAsyncCartList({
    //         payload: { memberId: "test" },
    //         result: [{
    //             id: 1,
    //             productId: 1,
    //             productName: "Clean Code",
    //             imageFileName: "test.jpg",
    //             regularPrice: 33000,
    //             stockQuantity: 100,
    //             discountPercent: 10,
    //             depositPercent: 5,
    //             quantity: 1,
    //             checked: true
    //         }],
    //         error: undefined
    //     }));

    //     const ids = [1];
    //     const queryString = qs.stringify({ ids: ids }, { indices: false });

    //     mockAxios.onDelete(`/api/carts?${queryString}`).reply(200);

    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <CartManagementContainer />
    //         </Provider>
    //     );

    //     const removeButton = getByText("선택 삭제");
    //     fireEvent.click(removeButton);

    //     await waitFor(() => {
    //         getByText("삭제되었습니다.");
    //     });
    // });
});