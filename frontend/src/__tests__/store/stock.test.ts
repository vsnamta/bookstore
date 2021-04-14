import { wait, waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";
import qs from 'qs';
import { StockFindPayload, StockResult } from "../../models/stock";
import { Page } from "../../models/common";

describe('stock store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchStockPage', async () => {
        // given
        store.dispatch(rootActions.setAsyncStockPage({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        const stockFindPayload: StockFindPayload = {
            productId: 1, 
            pageCriteria: { page: 1, size: 10 }
        };

        const stockPage: Page<StockResult> = {
            list: [{
                id: 1,
                quantity: 100,
                contents: "상품 구매로 인한 재고 증가",
                statusName: "상품 구매로 인한 재고 증가",
                createdDate: "2020-01-01 00:00:00"
            }],
            totalCount: 1
        };

        const queryString = qs.stringify(stockFindPayload, { allowDots: true });

        mockAxios.onGet(`/api/stocks?${queryString}`).reply(200, stockPage);

        // when
        store.dispatch(rootActions.fetchStockPage(stockFindPayload));

        // then
        await waitFor(() => {
            const stockPage = store.getState().stocks.asyncStockPage.result;

            expect(stockPage?.list.length).toEqual(1);
        });
    });

    it('saveStockAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncStockPage({
            payload: { productId: 1, pageCriteria: { page: 1, size: 10 } },
            result: { list: [], totalCount: 0 },
            error: undefined
        }));
        
        mockAxios.onPost("/api/stocks").reply(200, {
            id: 1,
            quantity: 100,
            contents: "상품 구매로 인한 재고 증가",
            statusName: "상품 구매로 인한 재고 증가",
            createdDate: "2020-01-01 00:00:00"
        });

        // when
        store.dispatch(rootActions.saveStockAsync({ payload: { 
            productId: 1,
            quantity: 100,
            contents: "상품 구매로 인한 재고 증가",
            status: "PURCHASE"
        }}));

        // then
        await waitFor(() => {
            const stockPage = store.getState().stocks.asyncStockPage.result;

            expect(stockPage?.list.length).toEqual(1);
        });
    });
});