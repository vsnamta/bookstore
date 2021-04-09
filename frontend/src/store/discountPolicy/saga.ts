import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import discountPolicyApi from '../../apis/discountPolicyApi';
import { DiscountPolicyResult } from '../../models/discountPolicy';
import { DiscountPoliciesState } from '../../models/discountPolicy/store';

function* fetchDiscountPolicyListSaga(action: ReturnType<typeof actions.fetchDiscountPolicyList>) {
    const discountPoliciesState: DiscountPoliciesState = yield select((state: RootState) => state.discountPolcies);
    
    if(discountPoliciesState.asyncDiscountPolicyList.result !== undefined) {
        return;
    }

    try {
        const discountPolicyList: DiscountPolicyResult[] = yield call(discountPolicyApi.findAll);

        yield put(actions.setDiscountPoliciesState({
            asyncDiscountPolicyList: {
                result: discountPolicyList,
                error: undefined
            },
            discountPolicy: undefined
        }));
    } catch (error) {
        yield put(actions.setDiscountPoliciesState({
            asyncDiscountPolicyList: {
                result: undefined,
                error: error
            },
            discountPolicy: undefined
        }));
    }
};

function* update1DiscountPolicyAsyncSaga({ payload: discountPolicyUpdateAsyncPayload }: ReturnType<typeof actions.updateDiscountPolicyAsync>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.update, discountPolicyUpdateAsyncPayload.id, discountPolicyUpdateAsyncPayload.payload);

        yield put(actions.updateDiscountPolicy(discountPolicy));
        discountPolicyUpdateAsyncPayload.onSuccess && discountPolicyUpdateAsyncPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicyUpdateAsyncPayload.onFailure && discountPolicyUpdateAsyncPayload.onFailure(error);
    }
};

function* save1DiscountPolicyAsyncSaga({ payload: discountPolicySaveAsyncPayload }: ReturnType<typeof actions.saveDiscountPolicyAsync>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.save, discountPolicySaveAsyncPayload.payload);

        yield put(actions.saveDiscountPolicy(discountPolicy));
        discountPolicySaveAsyncPayload.onSuccess && discountPolicySaveAsyncPayload.onSuccess(discountPolicy);
    } catch (error) {
        discountPolicySaveAsyncPayload.onFailure && discountPolicySaveAsyncPayload.onFailure(error);
    }
};

export default function* discountPoliciesSaga() {
    yield takeEvery(types.FETCH_DISCOUNT_POLICY_LIST, fetchDiscountPolicyListSaga);
    yield takeEvery(types.UPDATE_DISCOUNT_POLICY_ASYNC, update1DiscountPolicyAsyncSaga);
    yield takeEvery(types.SAVE_DISCOUNT_POLICY_ASYNC, save1DiscountPolicyAsyncSaga);
}