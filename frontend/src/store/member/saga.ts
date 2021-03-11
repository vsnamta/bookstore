import { call, put, takeEvery } from 'redux-saga/effects';
import memberApi from '../../apis/memberApi';
import { Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/members';
import { findMember, findMemberAsync, findMemberPage, findMemberPageAsync, updateMember, updateMemberSuccess } from './action';
import { FIND_MEMBER, FIND_MEMBER_PAGE, UPDATE_MEMBER } from './actionType';

function* findMemberPageSaga(action: ReturnType<typeof findMemberPage>) {
    yield put(findMemberPageAsync.request(action.payload));

    try {
        const memberList: Page<MemberResult> = yield call(memberApi.findAll, action.payload);

        yield put(findMemberPageAsync.success(memberList));
    } catch (error) {
        yield put(findMemberPageAsync.failure(error));
    }
};

function* findMemberSaga(action: ReturnType<typeof findMember>) {
    yield put(findMemberAsync.request(action.payload));

    try {
        const member: MemberDetailResult = yield call(memberApi.findOne, action.payload);

        yield put(findMemberAsync.success(member));
    } catch (error) {
        yield put(findMemberAsync.failure(error));
    }
};

function* updateMemberSaga(action: ReturnType<typeof updateMember>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.update, action.payload.id, action.payload.payload);

        yield put(updateMemberSuccess(member));
        action.payload.onSuccess && action.payload.onSuccess(member);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* membersSaga() {
    yield takeEvery(FIND_MEMBER_PAGE, findMemberPageSaga);
    yield takeEvery(FIND_MEMBER, findMemberSaga);
    yield takeEvery(UPDATE_MEMBER, updateMemberSaga);
}