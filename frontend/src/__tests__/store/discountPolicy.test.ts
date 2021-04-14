import { wait, waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";

describe('discountPolicy store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchDiscountPolicyList', async () => {
        // given
        store.dispatch(rootActions.setAsyncDiscountPolicyList({
            result: undefined,
            error: undefined
        }));

        mockAxios.onGet("/api/discountPolicies").reply(200, [{
            id: 1,
            name: "기본",
            discountPercent: 10,
            depositPercent: 5
        }]);

        // when
        store.dispatch(rootActions.fetchDiscountPolicyList());

        // then
        await waitFor(() => {
            const discountPolicyList = store.getState().discountPolcies.asyncDiscountPolicyList.result;
            const discountPolicy = store.getState().discountPolcies.discountPolicy;

            expect(discountPolicyList?.length).toEqual(1);
            expect(discountPolicy === undefined).toEqual(true);
        });
    });

    it('selectDiscountPolicy', () => {
        // given
        store.dispatch(rootActions.setAsyncDiscountPolicyList({
            result: [{
                id: 1,
                name: "기본",
                discountPercent: 10,
                depositPercent: 5
            }],
            error: undefined
        }));

        // when
        store.dispatch(rootActions.selectDiscountPolicy(1));

        // then
        const discountPolicy = store.getState().discountPolcies.discountPolicy;

        expect(discountPolicy?.name).toEqual("기본");
    });

    it('updateDiscountPolicyAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncDiscountPolicyList({
            result: [{
                id: 1,
                name: "기본",
                discountPercent: 0,
                depositPercent: 0
            }],
        }));

        store.dispatch(rootActions.selectDiscountPolicy(1));

        mockAxios.onPut("/api/discountPolicies/1").reply(200, {
            id: 1,
            name: "기본",
            discountPercent: 10,
            depositPercent: 5
        });

        // when
        store.dispatch(rootActions.updateDiscountPolicyAsync({
            id: 1,
            payload: { name: "기본", discountPercent: 10, depositPercent: 5 }
        }));

        // then
        await waitFor(() => {
            const discountPolicyList = store.getState().discountPolcies.asyncDiscountPolicyList.result;
            const discountPolicy = store.getState().discountPolcies.discountPolicy;

            expect(discountPolicyList?.[0].discountPercent).toEqual(10);
            expect(discountPolicy?.discountPercent).toEqual(10);
        });
    });

    it('saveDiscountPolicyAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncDiscountPolicyList({
            result: [],
            error: undefined
        }));
        
        mockAxios.onPost("/api/discountPolicies").reply(200, {
            id: 1,
            name: "기본",
            discountPercent: 10,
            depositPercent: 5
        });

        // when
        store.dispatch(rootActions.saveDiscountPolicyAsync({ payload: { 
            name: "기본", 
            discountPercent: 10, 
            depositPercent: 5 
        }}));

        // then
        await waitFor(() => {
            const discountPolicyList = store.getState().discountPolcies.asyncDiscountPolicyList.result;
            const discountPolicy = store.getState().discountPolcies.discountPolicy;
    
            expect(discountPolicyList?.length).toEqual(1);
            expect(discountPolicy?.discountPercent).toEqual(10);
        });
    });
});