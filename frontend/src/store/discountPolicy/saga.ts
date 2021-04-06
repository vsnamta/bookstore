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

function* updateDiscountPolicySaga({ payload: discountPolicyUpdateActionPayload }: ReturnType<typeof createUpdateDiscountPolicyAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.update, discountPolicyUpdateActionPayload.id, discountPolicyUpdateActionPayload.payload);

        yield put(createUpdateDiscountPolicySuccessAction(discountPolicy));
        discountPolicyUpdateActionPayload.onSuccess && discountPolicyUpdateActionPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicyUpdateActionPayload.onFailure && discountPolicyUpdateActionPayload.onFailure(error);
    }
};

function* saveDiscountPolicySaga({ payload: discountPolicySaveActionPayload }: ReturnType<typeof createSaveDiscountPolicyAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.save, discountPolicySaveActionPayload.payload);

        yield put(createSaveDiscountPolicySuccessAction(discountPolicy));
        discountPolicySaveActionPayload.onSuccess && discountPolicySaveActionPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicySaveActionPayload.onFailure && discountPolicySaveActionPayload.onFailure(error);
    }
};

export default function* discountPoliciesSaga() {
    yield takeEvery(FIND_DISCOUNT_POLICY_LIST, findDiscountPolicyListSaga);
    yield takeEvery(UPDATE_DISCOUNT_POLICY, updateDiscountPolicySaga);
    yield takeEvery(SAVE_DISCOUNT_POLICY, saveDiscountPolicySaga);
}