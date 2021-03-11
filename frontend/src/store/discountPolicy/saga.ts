import { call, put, takeEvery } from 'redux-saga/effects';
import discountPolicyApi from '../../apis/discountPolicyApi';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { findDiscountPolicyList, findDiscountPolicyListAsync, saveDiscountPolicy, saveDiscountPolicySuccess, updateDiscountPolicy, updateDiscountPolicySuccess } from './action';
import { FIND_DISCOUNT_POLICY_LIST, SAVE_DISCOUNT_POLICY, UPDATE_DISCOUNT_POLICY } from './actionType';

function* findDiscountPolicyListSaga(action: ReturnType<typeof findDiscountPolicyList>) {
    yield put(findDiscountPolicyListAsync.request());

    try {
        const discountPolicyList: DiscountPolicyResult[] = yield call(discountPolicyApi.findAll);

        yield put(findDiscountPolicyListAsync.success(discountPolicyList));
    } catch (error) {
        yield put(findDiscountPolicyListAsync.failure(error));
    }
};

function* updateDiscountPolicySaga(action: ReturnType<typeof updateDiscountPolicy>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.update, action.payload.id, action.payload.payload);

        yield put(updateDiscountPolicySuccess(discountPolicy));
        action.payload.onSuccess && action.payload.onSuccess(discountPolicy);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveDiscountPolicySaga(action: ReturnType<typeof saveDiscountPolicy>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.save, action.payload.payload);

        yield put(saveDiscountPolicySuccess(discountPolicy));
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