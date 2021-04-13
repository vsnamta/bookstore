import { waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";

describe('auth store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchMyData', async () => {
        // given
        store.dispatch(rootActions.setMyData(undefined));

        mockAxios.onGet("/api/members/me").reply(200, {
            id: 1,
            name: "홍길동",
            role: "USER"
        });

        // when
        store.dispatch(rootActions.fetchMyData());

        // then
        await waitFor(() => {
            const myData = store.getState().auths.myData;

            expect(myData?.id).toEqual(1);
            expect(myData?.name).toEqual("홍길동");
        });
    });

    it('loginAsync', async () => {
        // given
        mockAxios.onPost("/api/login").reply(200);

        mockAxios.onGet("/api/members/me").reply(200, {
            id: 1,
            name: "홍길동",
            role: "USER"
        });

        // when
        store.dispatch(rootActions.loginAsync({ payload: { id: "test", password: "password" } }));

        // then
        await waitFor(() => {
            const myData = store.getState().auths.myData;
            const tempMyData = localStorage.getItem("tempMyData");

            expect(myData?.id).toEqual(1);
            expect(myData?.name).toEqual("홍길동");
            
            expect(tempMyData !== undefined).toEqual(true);
        });
    });

    it('logoutAsync', async () => {
        // given
        mockAxios.onPost("/api/logout").reply(200);

        // when
        store.dispatch(rootActions.logoutAsync({}));

        // then
        await waitFor(() => {
            const myData = store.getState().auths.myData;
            const tempMyData = localStorage.getItem("tempMyData");
    
            expect(myData === undefined).toEqual(true);
            expect(tempMyData === undefined).toEqual(true);
        });
    });
});