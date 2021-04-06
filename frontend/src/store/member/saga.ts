import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import memberApi from '../../apis/memberApi';
import { Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/members';
import { createMemberFindAction, createMemberPageFindAction, createSaveMemberAction, createMemberSaveRequestAction, createMemberAsyncSetAction, createMemberPageAsyncSetAction, createUpdateMemberAction, createMemberUpdateRequestAction } from './action';
import { FIND_MEMBER, FIND_MEMBER_PAGE, SAVE_MEMBER_REQUEST, UPDATE_MEMBER_REQUEST } from './actionType';
import { MembersState } from './reducer';

function* findMemberPageSaga({ payload: findPayload }: ReturnType<typeof createMemberPageFindAction>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(JSON.stringify(membersState.memberPageAsync.payload) === JSON.stringify(findPayload) 
        && membersState.memberPageAsync.result !== undefined) {
        return;
    }

    try {
        const memberList: Page<MemberResult> = yield call(memberApi.findAll, findPayload);

        yield put(createMemberPageAsyncSetAction({
            payload: findPayload,
            result: memberList,
            error: undefined
        }));
    } catch (error) {
        yield put(createMemberPageAsyncSetAction({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* findMemberSaga({ payload: id }: ReturnType<typeof createMemberFindAction>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(membersState.memberAsync.payload === id && membersState.memberAsync.result !== undefined) {
        return;
    }

    try {
        const member: MemberDetailResult = yield call(memberApi.findOne, id);

        yield put(createMemberAsyncSetAction({
            payload: id,
            result: member,
            error: undefined
        }));
    } catch (error) {
        yield put(createMemberAsyncSetAction({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateMemberRequestSaga({ payload: memberUpdateRequestActionPayload }: ReturnType<typeof createMemberUpdateRequestAction>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.update, memberUpdateRequestActionPayload.id, memberUpdateRequestActionPayload.payload);

        yield put(createUpdateMemberAction(member));
        memberUpdateRequestActionPayload.onSuccess && memberUpdateRequestActionPayload.onSuccess(member);
    } catch (error) {
        memberUpdateRequestActionPayload.onFailure && memberUpdateRequestActionPayload.onFailure(error);
    }
};

function* saveMemberRequestSaga({ payload: memberSaveRequestActionPayload }: ReturnType<typeof createMemberSaveRequestAction>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.save, memberSaveRequestActionPayload.payload);

        yield put(createSaveMemberAction(member));

        memberSaveRequestActionPayload.onSuccess && memberSaveRequestActionPayload.onSuccess(member);
    } catch (error) {
        memberSaveRequestActionPayload.onFailure && memberSaveRequestActionPayload.onFailure(error);
    }
};

export default function* membersSaga() {
    yield takeEvery(FIND_MEMBER_PAGE, findMemberPageSaga);
    yield takeEvery(FIND_MEMBER, findMemberSaga);
    yield takeEvery(UPDATE_MEMBER_REQUEST, updateMemberRequestSaga);
    yield takeEvery(SAVE_MEMBER_REQUEST, saveMemberRequestSaga);
}