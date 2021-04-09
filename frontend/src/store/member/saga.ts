import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import memberApi from '../../apis/memberApi';
import { Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/member';
import { MembersState } from '../../models/member/store';

function* fetchMemberPageSaga({ payload: findPayload }: ReturnType<typeof actions.fetchMemberPage>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(JSON.stringify(membersState.asyncMemberPage.payload) === JSON.stringify(findPayload) 
        && membersState.asyncMemberPage.result !== undefined) {
        return;
    }

    try {
        const memberList: Page<MemberResult> = yield call(memberApi.findAll, findPayload);

        yield put(actions.setAsyncMemberPage({
            payload: findPayload,
            result: memberList,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncMemberPage({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* fetchMemberSaga({ payload: id }: ReturnType<typeof actions.fetchMember>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(membersState.asyncMember.payload === id && membersState.asyncMember.result !== undefined) {
        return;
    }

    try {
        const member: MemberDetailResult = yield call(memberApi.findOne, id);

        yield put(actions.setAsyncMember({
            payload: id,
            result: member,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncMember({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateMemberAsyncSaga({ payload: memberUpdateAsyncPayload }: ReturnType<typeof actions.updateMemberAsync>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.update, memberUpdateAsyncPayload.id, memberUpdateAsyncPayload.payload);

        yield put(actions.updateMember(member));
        memberUpdateAsyncPayload.onSuccess && memberUpdateAsyncPayload.onSuccess(member);
    } catch (error) {
        memberUpdateAsyncPayload.onFailure && memberUpdateAsyncPayload.onFailure(error);
    }
};

function* saveMemberAsyncSaga({ payload: memberSaveAsyncPayload }: ReturnType<typeof actions.saveMemberAsync>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.save, memberSaveAsyncPayload.payload);

        yield put(actions.setMembersState({
            asyncMemberPage: {
                payload : undefined,
                result: undefined,
                error: undefined
            },
            asyncMember: {
                payload: member.id,
                result: member,
                error: undefined
            }
        }));

        memberSaveAsyncPayload.onSuccess && memberSaveAsyncPayload.onSuccess(member);
    } catch (error) {
        memberSaveAsyncPayload.onFailure && memberSaveAsyncPayload.onFailure(error);
    }
};

export default function* membersSaga() {
    yield takeEvery(types.FETCH_MEMBER_PAGE, fetchMemberPageSaga);
    yield takeEvery(types.FETCH_MEMBER, fetchMemberSaga);
    yield takeEvery(types.UPDATE_MEMBER_ASYNC, updateMemberAsyncSaga);
    yield takeEvery(types.SAVE_MEMBER_ASYNC, saveMemberAsyncSaga);
}