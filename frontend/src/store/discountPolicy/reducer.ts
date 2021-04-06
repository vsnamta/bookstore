import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { createFindDiscountPolicyAction, createSaveDiscountPolicySuccessAction, createUpdateDiscountPolicySuccessAction, DiscountPoliciesAction, findDiscountPolicyListAsyncActionCreator } from './action';
import { FIND_DISCOUNT_POLICY, FIND_DISCOUNT_POLICY_LIST_FAILURE, FIND_DISCOUNT_POLICY_LIST_REQUEST, FIND_DISCOUNT_POLICY_LIST_SUCCESS, SAVE_DISCOUNT_POLICY_SUCCESS, UPDATE_DISCOUNT_POLICY_SUCCESS } from './actionType';

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
    [FIND_DISCOUNT_POLICY_LIST_REQUEST]: (state, action) => ({
        ...state,
        discountPolicyListAsync: {
            result: undefined,
            error: undefined
        }
    }),
    [FIND_DISCOUNT_POLICY_LIST_SUCCESS]: (state, { payload: discountPolicies }: ReturnType<typeof findDiscountPolicyListAsyncActionCreator.success>) => ({
        ...state,
        discountPolicyListAsync: {
            ...state.discountPolicyListAsync,
            result: discountPolicies
        } 
    }),
    [FIND_DISCOUNT_POLICY_LIST_FAILURE]: (state, { payload: error }: ReturnType<typeof findDiscountPolicyListAsyncActionCreator.failure>) => ({
        ...state,
        discountPolicyListAsync: {
            ...state.discountPolicyListAsync,
            error: error
        } 
    }),
    [FIND_DISCOUNT_POLICY]: (state, { payload: id }: ReturnType<typeof createFindDiscountPolicyAction>) => ({
        ...state,
        discountPolicy: (state.discountPolicyListAsync.result as DiscountPolicyResult[])
            .find(discountPolicy => discountPolicy.id === id)
    }),
    [UPDATE_DISCOUNT_POLICY_SUCCESS]: (state, { payload: updatedDiscountPolicy }: ReturnType<typeof createUpdateDiscountPolicySuccessAction>) => ({
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
    [SAVE_DISCOUNT_POLICY_SUCCESS]: (state, { payload: savedDiscountPolicy }: ReturnType<typeof createSaveDiscountPolicySuccessAction>) => ({
        discountPolicyListAsync: {
            result: (state.discountPolicyListAsync.result as DiscountPolicyResult[]).concat(savedDiscountPolicy),
            error: undefined
        },
        discountPolicy: savedDiscountPolicy
    })
});