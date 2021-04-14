import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import discountPolicyApi from '../../apis/discountPolicyApi';
import { DiscountPolicyResult } from '../../models/discountPolicy';

function* fetchDiscountPolicyListSaga(action: ReturnType<typeof actions.fetchDiscountPolicyList>) {
    const discountPolicyList: DiscountPolicyResult[] = yield select((state: RootState) => state.discountPolcies.asyncDiscountPolicyList.result);
    
    if(discountPolicyList !== undefined) {
        return;
    }

    try {
        const discountPolicyList: DiscountPolicyResult[] = yield call(discountPolicyApi.findAll);

        yield put(actions.setAsyncDiscountPolicyList({
            result: discountPolicyList,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncDiscountPolicyList({
            result: undefined,
            error: error
        }));
    }
};

function* updateDiscountPolicyAsyncSaga({ payload: discountPolicyUpdateAsyncPayload }: ReturnType<typeof actions.updateDiscountPolicyAsync>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.update, discountPolicyUpdateAsyncPayload.id, discountPolicyUpdateAsyncPayload.payload);

        yield put(actions.updateDiscountPolicy(discountPolicy));
        discountPolicyUpdateAsyncPayload.onSuccess?.(discountPolicy);
    } catch (error) {
        discountPolicyUpdateAsyncPayload.onFailure?.(error);
    }
};

function* saveDiscountPolicyAsyncSaga({ payload: discountPolicySaveAsyncPayload }: ReturnType<typeof actions.saveDiscountPolicyAsync>) {
    try {
        const discountPolicy: DiscountPolicyResult = yield call(discountPolicyApi.save, discountPolicySaveAsyncPayload.payload);

        yield put(actions.saveDiscountPolicy(discountPolicy));
        discountPolicySaveAsyncPayload.onSuccess?.(discountPolicy);
    } catch (error) {
        discountPolicySaveAsyncPayload.onFailure?.(error);
    }
};

export default function* discountPoliciesSaga() {
    yield takeEvery(types.FETCH_DISCOUNT_POLICY_LIST, fetchDiscountPolicyListSaga);
    yield takeEvery(types.UPDATE_DISCOUNT_POLICY_ASYNC, updateDiscountPolicyAsyncSaga);
    yield takeEvery(types.SAVE_DISCOUNT_POLICY_ASYNC, saveDiscountPolicyAsyncSaga);
}