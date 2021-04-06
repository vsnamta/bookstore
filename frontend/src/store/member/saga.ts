import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import memberApi from '../../apis/memberApi';
import { Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/members';
import { createFindMemberAction, createFindMemberPageAction, createSaveMemberAction, createSaveMemberSuccessAction, createUpdateMemberAction, createUpdateMemberSuccessAction, findMemberAsyncActionCreator, findMemberPageAsyncActionCreator } from './action';
import { FIND_MEMBER, FIND_MEMBER_PAGE, SAVE_MEMBER, UPDATE_MEMBER } from './actionType';
import { MembersState } from './reducer';

function* findMemberPageSaga({ payload: findPayload }: ReturnType<typeof createFindMemberPageAction>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(JSON.stringify(membersState.memberPageAsync.payload) === JSON.stringify(findPayload) 
        && membersState.memberPageAsync.result !== undefined) {
        return;
    }
    
    yield put(findMemberPageAsyncActionCreator.request(findPayload));

    try {
        const memberList: Page<MemberResult> = yield call(memberApi.findAll, findPayload);

        yield put(findMemberPageAsyncActionCreator.success(memberList));
    } catch (error) {
        yield put(findMemberPageAsyncActionCreator.failure(error));
    }
};

function* findMemberSaga({ payload: id }: ReturnType<typeof createFindMemberAction>) {
    const membersState: MembersState = yield select((state: RootState) => state.members);
    
    if(membersState.memberAsync.payload === id && membersState.memberAsync.result !== undefined) {
        return;
    }
    
    yield put(findMemberAsyncActionCreator.request(id));

    try {
        const member: MemberDetailResult = yield call(memberApi.findOne, id);

        yield put(findMemberAsyncActionCreator.success(member));
    } catch (error) {
        yield put(findMemberAsyncActionCreator.failure(error));
    }
};

function* updateMemberSaga({ payload: memberUpdateActionPayload }: ReturnType<typeof createUpdateMemberAction>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.update, memberUpdateActionPayload.id, memberUpdateActionPayload.payload);

        yield put(createUpdateMemberSuccessAction(member));
        memberUpdateActionPayload.onSuccess && memberUpdateActionPayload.onSuccess(member);
    } catch (error) {
        memberUpdateActionPayload.onFailure && memberUpdateActionPayload.onFailure(error);
    }
};

function* saveMemberSaga({ payload: memberSaveActionPayload }: ReturnType<typeof createSaveMemberAction>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.save, memberSaveActionPayload.payload);

        yield put(createSaveMemberSuccessAction(member));

        memberSaveActionPayload.onSuccess && memberSaveActionPayload.onSuccess(member);
    } catch (error) {
        memberSaveActionPayload.onFailure && memberSaveActionPayload.onFailure(error);
    }
};

export default function* membersSaga() {
    yield takeEvery(FIND_MEMBER_PAGE, findMemberPageSaga);
    yield takeEvery(FIND_MEMBER, findMemberSaga);
    yield takeEvery(UPDATE_MEMBER, updateMemberSaga);
    yield takeEvery(SAVE_MEMBER, saveMemberSaga);
}