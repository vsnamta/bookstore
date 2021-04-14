import qs from 'qs';
import { wait, waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";
import { FindPayload, Page } from '../../models/common';
import { MemberResult } from '../../models/member';

describe('member store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchMemberPage', async () => {
        // given
        store.dispatch(rootActions.setAsyncMemberPage({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        const findPayload: FindPayload = {
            pageCriteria: { page: 1, size: 10 }
        };

        const memberPage: Page<MemberResult> = {
            list: [{
                id: "test",
                name: "홍길동",
                phoneNumber: "010-1234-5678",
                roleName: "USER",
                createdDate: "2020-01-01 00:00:00"
            }],
            totalCount: 1
        };

        const queryString = qs.stringify(findPayload, { allowDots: true });

        mockAxios.onGet(`/api/members?${queryString}`).reply(200, memberPage);

        // when
        store.dispatch(rootActions.fetchMemberPage(findPayload));

        // then
        await waitFor(() => {
            const memberPage = store.getState().members.asyncMemberPage.result;

            expect(memberPage?.list.length).toEqual(1);
        });
    });

    it('fetchMember', async () => {
        // given
        store.dispatch(rootActions.setAsyncMember({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        mockAxios.onGet("/api/members/test").reply(200, {
            id: "test",
            name: "홍길동",
            phoneNumber: "010-1234-5678",
            zipCode: "123-456",
            address1: "서울시 중구 명동 123번지",
            address2: "456호",
            point: 0,
            roleName: "USER",
            createdDate: "2020-01-01 00:00:00"
        });

        // when
        store.dispatch(rootActions.fetchMember("test"));

        // then
        await waitFor(() => {
            const member = store.getState().members.asyncMember.result;

            expect(member?.id).toEqual("test");
            expect(member?.name).toEqual("홍길동");
        });
    });

    it('updateMemberAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncMember({
            payload: "test",
            result: {
                id: "test",
                name: "홍길동",
                phoneNumber: "010-1234-5678",
                zipCode: "123-456",
                address1: "서울시 중구 명동 123번지",
                address2: "456호",
                point: 0,
                roleName: "USER",
                createdDate: "2020-01-01 00:00:00"
            },
            error: undefined
        }));

        mockAxios.onPut("/api/members/test").reply(200, {
            id: "test",
            name: "홍길동",
            phoneNumber: "010-8765-4321",
            zipCode: "123-456",
            address1: "서울시 중구 명동 123번지",
            address2: "456호",
            point: 0,
            roleName: "USER",
            createdDate: "2020-01-01 00:00:00"
        });

        // when
        store.dispatch(rootActions.updateMemberAsync({
            id: "test",
            payload: {
                currentPassword: "password",
                password: "password",
                passwordConfirm: "password",
                phoneNumber: "010-8765-4321",
                zipCode: "123-456",
                address1: "서울시 중구 명동 123번지",
                address2: "456호",
            }
        }));

        // then
        await waitFor(() => {
            const member = store.getState().members.asyncMember.result;
            expect(member?.phoneNumber).toEqual("010-8765-4321");
        });
    });

    it('saveMemberAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncMemberPage({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        store.dispatch(rootActions.setAsyncMember({
            payload: undefined,
            result: undefined,
            error: undefined
        }));
        
        mockAxios.onPost("/api/members").reply(200, {
            id: "test",
            name: "홍길동",
            phoneNumber: "010-8765-4321",
            zipCode: "123-456",
            address1: "서울시 중구 명동 123번지",
            address2: "456호",
            point: 0,
            roleName: "USER",
            createdDate: "2020-01-01 00:00:00"
        });

        const onSuccess = jest.fn();

        // when
        store.dispatch(rootActions.saveMemberAsync({ 
            payload: { 
                id: "test",
                password: "password",
                passwordConfirm: "password",
                phoneNumber: "010-8765-4321",
                name: "홍길동",
                zipCode: "123-456",
                address1: "서울시 중구 명동 123번지",
                address2: "456호",
            },
            onSuccess: onSuccess
        }));

        // then
        await waitFor(() => {
            expect(onSuccess).toBeCalled();
            //expect(onSuccess).toHaveBeenCalled();
        });
    });
});