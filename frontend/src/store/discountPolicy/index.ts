import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { DiscountPolicyResult } from '../../models/discountPolicy';
import { DiscountPoliciesState, DiscountPolicyListAsync, DiscountPolicySaveAsyncPayload, DiscountPolicyUpdateAsyncPayload } from '../../models/discountPolicy/store';

export const types = {
    FETCH_DISCOUNT_POLICY_LIST: 'discountPolicy/FETCH_DISCOUNT_POLICY_LIST' as const,
    SET_DISCOUNT_POLICIES_STATE: 'discountPolicy/SET_DISCOUNT_POLICIES_STATE' as const,
    SELECT_DISCOUNT_POLICY: 'discountPolicy/SELECT_DISCOUNT_POLICY' as const,
    UPDATE_DISCOUNT_POLICY_ASYNC: 'discountPolicy/UPDATE_DISCOUNT_POLICY_ASYNC' as const,
    UPDATE_DISCOUNT_POLICY: 'discountPolicy/UPDATE_DISCOUNT_POLICY' as const,
    SAVE_DISCOUNT_POLICY_ASYNC: 'discountPolicy/SAVE_DISCOUNT_POLICY_ASYNC' as const,
    SAVE_DISCOUNT_POLICY: 'discountPolicy/SAVE_DISCOUNT_POLICY' as const
};

export const actions = { 
    fetchDiscountPolicyList: createAction(types.FETCH_DISCOUNT_POLICY_LIST)<void>(), 
    setDiscountPoliciesState: createAction(types.SET_DISCOUNT_POLICIES_STATE)<DiscountPoliciesState>(),
    selectDiscountPolicy: createAction(types.SELECT_DISCOUNT_POLICY)<number>(),
    updateDiscountPolicyAsync: createAction(types.UPDATE_DISCOUNT_POLICY_ASYNC)<DiscountPolicyUpdateAsyncPayload>(), 
    updateDiscountPolicy: createAction(types.UPDATE_DISCOUNT_POLICY)<DiscountPolicyResult>(), 
    saveDiscountPolicyAsync: createAction(types.SAVE_DISCOUNT_POLICY_ASYNC)<DiscountPolicySaveAsyncPayload>(), 
    saveDiscountPolicy: createAction(types.SAVE_DISCOUNT_POLICY)<DiscountPolicyResult>()
};

const initialState: DiscountPoliciesState = {
    discountPolicyListAsync: {
        result: undefined,
        error: undefined
    },
    discountPolicy: undefined
};

const reducer = createReducer<DiscountPoliciesState, ActionType<typeof actions>>(initialState, {
    [types.SET_DISCOUNT_POLICIES_STATE]: (state, { payload: discountPoliciesState }: ReturnType<typeof actions.setDiscountPoliciesState>) => (
        discountPoliciesState
    ),
    [types.SELECT_DISCOUNT_POLICY]: (state, { payload: id }: ReturnType<typeof actions.selectDiscountPolicy>) => ({
        ...state,
        discountPolicy: (state.discountPolicyListAsync.result as DiscountPolicyResult[])
            .find(discountPolicy => discountPolicy.id === id)
    }),
    [types.UPDATE_DISCOUNT_POLICY]: (state, { payload: updatedDiscountPolicy }: ReturnType<typeof actions.updateDiscountPolicy>) => ({
        discountPolicyListAsync: {
            // ...state.discountPolicyListAsync,
            result: (state.discountPolicyListAsync.result as DiscountPolicyResult[]).map(discountPolicy => 
                discountPolicy.id === updatedDiscountPolicy.id 
                    ? updatedDiscountPolicy 
                    : discountPolicy
            )
        },
        discountPolicy: updatedDiscountPolicy
    }),
    [types.SAVE_DISCOUNT_POLICY]: (state, { payload: savedDiscountPolicy }: ReturnType<typeof actions.saveDiscountPolicy>) => ({
        discountPolicyListAsync: {
            // ...state.discountPolicyListAsync,
            result: (state.discountPolicyListAsync.result as DiscountPolicyResult[]).concat(savedDiscountPolicy)
        },
        discountPolicy: savedDiscountPolicy
    })
});

export default reducer;