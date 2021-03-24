import { call, put, takeEvery } from 'redux-saga/effects';
import memberApi from '../../apis/memberApi';
import { Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/members';
import { createFindMemberAction, createFindMemberPageAction, createUpdateMemberAction, createUpdateMemberSuccessAction, findMemberAsyncActionCreator, findMemberPageAsyncActionCreator } from './action';
import { FIND_MEMBER, FIND_MEMBER_PAGE, UPDATE_MEMBER } from './actionType';

function* findMemberPageSaga(action: ReturnType<typeof createFindMemberPageAction>) {
    yield put(findMemberPageAsyncActionCreator.request(action.payload));

    try {
        const memberList: Page<MemberResult> = yield call(memberApi.findAll, action.payload);

        yield put(findMemberPageAsyncActionCreator.success(memberList));
    } catch (error) {
        yield put(findMemberPageAsyncActionCreator.failure(error));
    }
};

function* findMemberSaga(action: ReturnType<typeof createFindMemberAction>) {
    yield put(findMemberAsyncActionCreator.request(action.payload));

    try {
        const member: MemberDetailResult = yield call(memberApi.findOne, action.payload);

        yield put(findMemberAsyncActionCreator.success(member));
    } catch (error) {
        yield put(findMemberAsyncActionCreator.failure(error));
    }
};

function* updateMemberSaga(action: ReturnType<typeof createUpdateMemberAction>) {
    try {
        const member: MemberDetailResult = yield call(memberApi.update, action.payload.id, action.payload.payload);

        yield put(createUpdateMemberSuccessAction(member));
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