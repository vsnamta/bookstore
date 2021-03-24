import { call, put, takeEvery } from 'redux-saga/effects';
import discountPolicyApi from '../../apis/discountPolicyApi';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { createFindDiscountPolicyListAction, createSaveDiscountPolicyAction, createSaveDiscountPolicySuccessAction, createUpdateDiscountPolicyAction, createUpdateDiscountPolicySuccessAction, findDiscountPolicyListAsyncActionCreator } from './action';
import { FIND_DISCOUNT_POLICY_LIST, SAVE_DISCOUNT_POLICY, UPDATE_DISCOUNT_POLICY } from './actionType';

function* findDiscountPolicyListSaga(action: ReturnType<typeof createFindDiscountPolicyListAction>) {
    yield put(findDiscountPolicyListAsyncActionCreator.request());

    try {
        const discountPolicyList: DiscountPolicyResult[] = yield call(discountPolicyApi.findAll);

        yield put(findDiscountPolicyListAsyncActionCreator.success(discountPolicyList));
    } catch (error) {
        yield put(findDiscountPolicyListAsyncActionCreator.failure(error));
    }
};

function* updateDiscountPolicySaga(action: ReturnType<typeof createUpdateDiscountPolicyAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.update, action.payload.id, action.payload.payload);

        yield put(createUpdateDiscountPolicySuccessAction(discountPolicy));
        action.payload.onSuccess && action.payload.onSuccess(discountPolicy);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveDiscountPolicySaga(action: ReturnType<typeof createSaveDiscountPolicyAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.save, action.payload.payload);

        yield put(createSaveDiscountPolicySuccessAction(discountPolicy));
        action.payload.onSuccess && action.payload.onSuccess(discountPolicy);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* discountPoliciesSaga() {
    yield takeEvery(FIND_DISCOUNT_POLICY_LIST, findDiscountPolicyListSaga);
    yield takeEvery(UPDATE_DISCOUNT_POLICY, updateDiscountPolicySaga);
    yield takeEvery(SAVE_DISCOUNT_POLICY, saveDiscountPolicySaga);
}