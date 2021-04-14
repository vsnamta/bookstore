import { render, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import React from 'react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import BestProductListContainer from "../../container/product/BestProductListContainer";
import { ProductFindPayload, ProductResult } from "../../models/product";
import rootReducer, { rootActions, rootSaga } from "../../store";
import qs from 'qs';
import { Page } from "../../models/common";

describe('BestProductListContainer test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga); 

    const mockAxios = new MockAdapter(apiClient);

    it('fetch data', async () => {
        // store.dispatch(rootActions.setAsyncProductPage({
        //     payload: {
        //         pageCriteria: {
        //             page: 1,
        //             size: 8,
        //             sortColumn: "salesQuantity",
        //             sortDirection: "asc"
        //         }
        //     },
        //     result: {
        //         list: [{ 
        //             id: 1,
        //             name: 'Clean Code',
        //             author: '로버트 C. 마틴',
        //             publisher: '인사이트',
        //             publishedDate: '2013-12-24',
        //             regularPrice: 33000,
        //             imageFileName: 'test.jpg',
        //             stockQuantity: 9,
        //             salesQuantity: 1,
        //             rating: 4,
        //             reviewCount: 1,
        //             discountPercent: 10,
        //             depositPercent: 5
        //         }],
        //         totalCount: 1
        //     },
        //     error: undefined
        // }));

        // const productFindPayload: ProductFindPayload = {
        //     pageCriteria: {
        //         page: 1,
        //         size: 8,
        //         sortColumn: "salesQuantity",
        //         sortDirection: "desc"
        //     }
        // };

        // const productPage: Page<ProductResult> = {
        //     list: [{
        //         id: 1,
        //         name: "Clean Code",
        //         author: "로버트 C. 마틴",
        //         publisher: "인사이트",
        //         publishedDate: "2013-12-24",
        //         regularPrice: 33000,
        //         imageFileName: "test.jpg",
        //         stockQuantity: 100,
        //         salesQuantity: 0,
        //         rating: 4,
        //         reviewCount: 1,
        //         discountPercent: 10,
        //         depositPercent: 5
        //     }],
        //     totalCount: 1
        // };

        // const queryString = qs.stringify(productFindPayload, { allowDots: true });

        // mockAxios.onGet(`/api/products?${queryString}`).reply(200, productPage);

        // const { container, getByText } = render(
        //     <Provider store={store}>
        //         <BestProductListContainer />
        //     </Provider>
        // );

        // const test = await waitFor(() => { getByText("로버트 C. 마틴"); });
    });
});