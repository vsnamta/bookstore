import { waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";
import qs from 'qs';
import { PointHistoryFindPayload } from "../../models/pointHistory";

describe('pointHistory store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchPointHistoryPage', async () => {
        // given
        store.dispatch(rootActions.setAsyncPointHistoryPage({
            payload: { 
                memberId: "test", 
                pageCriteria: { page: 1, size: 10 } 
            },
            result: {
                list: [],
                totalCount: 0
            },
            error: undefined
        }));

        const pointHistoryFindPayload: PointHistoryFindPayload = {
            memberId: "test",
            pageCriteria: { page: 1, size: 10 }
        };

        const queryString = qs.stringify(pointHistoryFindPayload, { allowDots: true });

        mockAxios.onGet(`/api/pointHistories/${queryString}`).reply(200, [{
            id: 1,
            amounts: 1650,
            contents: "구매 확정으로 인한 적립금 증가 (주문번호 : 1)",
            statusName: "구매 확정으로 인한 적립금 증가",
            createdDate: "2020-01-01 00:00:00"
        }]);

        // when
        store.dispatch(rootActions.fetchPointHistoryPage({ 
            memberId: "test", 
            pageCriteria: { page: 1, size: 10 } 
        }));

        // then
        await waitFor(() => {
            const pointHistoryPage = store.getState().pointHistories.asyncPointHistoryPage.result;

            expect(pointHistoryPage?.list.length).toEqual(1);
        });
    });
});