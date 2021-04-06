import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import discountPolicyApi from '../../apis/discountPolicyApi';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { createFindDiscountPolicyListAction, createSaveDiscountPolicyAction, createSaveDiscountPolicyRequestAction, createSetDiscountPolicyListAsyncAction, createUpdateDiscountPolicyAction, createUpdateDiscountPolicyRequestAction } from './action';
import { FIND_DISCOUNT_POLICY_LIST, SAVE_DISCOUNT_POLICY_REQUEST, UPDATE_DISCOUNT_POLICY_REQUEST } from './actionType';
import { DiscountPoliciesState } from './reducer';

function* findDiscountPolicyListSaga(action: ReturnType<typeof createFindDiscountPolicyListAction>) {
    const discountPoliciesState: DiscountPoliciesState = yield select((state: RootState) => state.discountPolcies);
    
    if(discountPoliciesState.discountPolicyListAsync.result !== undefined) {
        return;
    }

    try {
        const discountPolicyList: DiscountPolicyResult[] = yield call(discountPolicyApi.findAll);

        yield put(createSetDiscountPolicyListAsyncAction({
            result: discountPolicyList,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetDiscountPolicyListAsyncAction({
            result: undefined,
            error: error
        }));
    }
};

function* updateDiscountPolicyRequestSaga({ payload: discountPolicyUpdateActionPayload }: ReturnType<typeof createUpdateDiscountPolicyRequestAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.update, discountPolicyUpdateActionPayload.id, discountPolicyUpdateActionPayload.payload);

        yield put(createUpdateDiscountPolicyAction(discountPolicy));
        discountPolicyUpdateActionPayload.onSuccess && discountPolicyUpdateActionPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicyUpdateActionPayload.onFailure && discountPolicyUpdateActionPayload.onFailure(error);
    }
};

function* saveDiscountPolicyRequestSaga({ payload: discountPolicySaveActionPayload }: ReturnType<typeof createSaveDiscountPolicyRequestAction>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.save, discountPolicySaveActionPayload.payload);

        yield put(createSaveDiscountPolicyAction(discountPolicy));
        discountPolicySaveActionPayload.onSuccess && discountPolicySaveActionPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicySaveActionPayload.onFailure && discountPolicySaveActionPayload.onFailure(error);
    }
};

export default function* discountPoliciesSaga() {
    yield takeEvery(FIND_DISCOUNT_POLICY_LIST, findDiscountPolicyListSaga);
    yield takeEvery(UPDATE_DISCOUNT_POLICY_REQUEST, updateDiscountPolicyRequestSaga);
    yield takeEvery(SAVE_DISCOUNT_POLICY_REQUEST, saveDiscountPolicyRequestSaga);
}