import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { createDiscountPolicyFindAction, createDiscountPolicySaveAction, createDiscountPolicyListAsyncSetAction, createDiscountPolicyUpdateAction, DiscountPoliciesAction } from './action';
import { FIND_DISCOUNT_POLICY, SAVE_DISCOUNT_POLICY, SET_DISCOUNT_POLICY_LIST_ASYNC, UPDATE_DISCOUNT_POLICY } from './actionType';

export interface DiscountPolicyListAsync {
    result?: DiscountPolicyResult[];
    error?: ApiError;
}

export interface DiscountPoliciesState {
    discountPolicyListAsync: DiscountPolicyListAsync,
    discountPolicy?: DiscountPolicyResult;
}

const initialState: DiscountPoliciesState = {
    discountPolicyListAsync: {
        result: undefined,
        error: undefined
    },
    discountPolicy: undefined
};

export default createReducer<DiscountPoliciesState, DiscountPoliciesAction>(initialState, {
    [SET_DISCOUNT_POLICY_LIST_ASYNC]: (state, { payload: discountPolicyListAsync }: ReturnType<typeof createDiscountPolicyListAsyncSetAction>) => ({
        discountPolicyListAsync: discountPolicyListAsync,
        discountPolicy: undefined
    }),
    [FIND_DISCOUNT_POLICY]: (state, { payload: id }: ReturnType<typeof createDiscountPolicyFindAction>) => ({
        ...state,
        discountPolicy: (state.discountPolicyListAsync.result as DiscountPolicyResult[])
            .find(discountPolicy => discountPolicy.id === id)
    }),
    [UPDATE_DISCOUNT_POLICY]: (state, { payload: updatedDiscountPolicy }: ReturnType<typeof createDiscountPolicyUpdateAction>) => ({
        discountPolicyListAsync: {
            result: (state.discountPolicyListAsync.result as DiscountPolicyResult[]).map(discountPolicy => 
                discountPolicy.id === updatedDiscountPolicy.id 
                    ? updatedDiscountPolicy 
                    : discountPolicy
            ),
            error: undefined
        },
        discountPolicy: updatedDiscountPolicy
    }),
    [SAVE_DISCOUNT_POLICY]: (state, { payload: savedDiscountPolicy }: ReturnType<typeof createDiscountPolicySaveAction>) => ({
        discountPolicyListAsync: {
            result: (state.discountPolicyListAsync.result as DiscountPolicyResult[]).concat(savedDiscountPolicy),
            error: undefined
        },
        discountPolicy: savedDiscountPolicy
    })
});