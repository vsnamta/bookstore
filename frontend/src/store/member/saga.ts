import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import memberApi from '../../apis/memberApi';
import { Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/members';
import { createFindMemberAction, createFindMemberPageAction, createSaveMemberAction, createSaveMemberRequestAction, createSetMemberAsyncAction, createSetMemberPageAsyncAction, createUpdateMemberAction, createUpdateMemberRequestAction } from './action';
import { FIND_MEMBER, FIND_MEMBER_PAGE, SAVE_MEMBER_REQUEST, UPDATE_MEMBER_REQUEST } from './actionType';
import { MembersState } from './reducer';

function* findMemberPageSaga({ payload: findPayload }: ReturnType<typeof createFindMemberPageAction>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(JSON.stringify(membersState.memberPageAsync.payload) === JSON.stringify(findPayload) 
        && membersState.memberPageAsync.result !== undefined) {
        return;
    }

    try {
        const memberList: Page<MemberResult> = yield call(memberApi.findAll, findPayload);

        yield put(createSetMemberPageAsyncAction({
            payload: findPayload,
            result: memberList,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetMemberPageAsyncAction({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* findMemberSaga({ payload: id }: ReturnType<typeof createFindMemberAction>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(membersState.memberAsync.payload === id && membersState.memberAsync.result !== undefined) {
        return;
    }

    try {
        const member: MemberDetailResult = yield call(memberApi.findOne, id);

        yield put(createSetMemberAsyncAction({
            payload: id,
            result: member,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetMemberAsyncAction({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateMemberRequestSaga({ payload: memberUpdateActionPayload }: ReturnType<typeof createUpdateMemberRequestAction>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.update, memberUpdateActionPayload.id, memberUpdateActionPayload.payload);

        yield put(createUpdateMemberAction(member));
        memberUpdateActionPayload.onSuccess && memberUpdateActionPayload.onSuccess(member);
    } catch (error) {
        memberUpdateActionPayload.onFailure && memberUpdateActionPayload.onFailure(error);
    }
};

function* saveMemberRequestSaga({ payload: memberSaveActionPayload }: ReturnType<typeof createSaveMemberRequestAction>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.save, memberSaveActionPayload.payload);

        yield put(createSaveMemberAction(member));

        memberSaveActionPayload.onSuccess && memberSaveActionPayload.onSuccess(member);
    } catch (error) {
        memberSaveActionPayload.onFailure && memberSaveActionPayload.onFailure(error);
    }
};

export default function* membersSaga() {
    yield takeEvery(FIND_MEMBER_PAGE, findMemberPageSaga);
    yield takeEvery(FIND_MEMBER, findMemberSaga);
    yield takeEvery(UPDATE_MEMBER_REQUEST, updateMemberRequestSaga);
    yield takeEvery(SAVE_MEMBER_REQUEST, saveMemberRequestSaga);
}