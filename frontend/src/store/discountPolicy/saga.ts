import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import discountPolicyApi from '../../apis/discountPolicyApi';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { createDiscountPolicyListFindAction, createDiscountPolicySaveAction, createDiscountPolicySaveRequestAction, createDiscountPolicyListAsyncSetAction, createDiscountPolicyUpdateAction, createDiscountPolicyUpdateRequestAction } from './action';
import { FIND_DISCOUNT_POLICY_LIST, SAVE_DISCOUNT_POLICY_REQUEST, UPDATE_DISCOUNT_POLICY_REQUEST } from './actionType';
import { DiscountPoliciesState } from './reducer';

function* findDiscountPolicyListSaga(action: ReturnType<typeof createDiscountPolicyListFindAction>) {
    const discountPoliciesState: DiscountPoliciesState = yield select((state: RootState) => state.discountPolcies);
    
    if(discountPoliciesState.discountPolicyListAsync.result !== undefined) {
        return;
    }

    try {
        const discountPolicyList: DiscountPolicyResult[] = yield call(discountPolicyApi.findAll);

        yield put(createDiscountPolicyListAsyncSetAction({
            result: discountPolicyList,
            error: undefined
        }));
    } catch (error) {
        yield put(createDiscountPolicyListAsyncSetAction({
            result: undefined,
            error: error
        }));
    }
};

function* updateDiscountPolicyRequestSaga({ payload: discountPolicyUpdateRequestActionPayload }: ReturnType<typeof createDiscountPolicyUpdateRequestAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.update, discountPolicyUpdateRequestActionPayload.id, discountPolicyUpdateRequestActionPayload.payload);

        yield put(createDiscountPolicyUpdateAction(discountPolicy));
        discountPolicyUpdateRequestActionPayload.onSuccess && discountPolicyUpdateRequestActionPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicyUpdateRequestActionPayload.onFailure && discountPolicyUpdateRequestActionPayload.onFailure(error);
    }
};

function* saveDiscountPolicyRequestSaga({ payload: discountPolicySaveRequestActionPayload }: ReturnType<typeof createDiscountPolicySaveRequestAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.save, discountPolicySaveRequestActionPayload.payload);

        yield put(createDiscountPolicySaveAction(discountPolicy));
        discountPolicySaveRequestActionPayload.onSuccess && discountPolicySaveRequestActionPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicySaveRequestActionPayload.onFailure && discountPolicySaveRequestActionPayload.onFailure(error);
    }
};

export default function* discountPoliciesSaga() {
    yield takeEvery(FIND_DISCOUNT_POLICY_LIST, findDiscountPolicyListSaga);
    yield takeEvery(UPDATE_DISCOUNT_POLICY_REQUEST, updateDiscountPolicyRequestSaga);
    yield takeEvery(SAVE_DISCOUNT_POLICY_REQUEST, saveDiscountPolicyRequestSaga);
}