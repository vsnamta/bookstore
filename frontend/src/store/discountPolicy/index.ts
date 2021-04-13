import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { DiscountPolicyResult } from '../../models/discountPolicy';
import { AsyncDiscountPolicyList, DiscountPoliciesState, DiscountPolicySaveAsyncPayload, DiscountPolicyUpdateAsyncPayload } from '../../models/discountPolicy/store';

export const types = {
    FETCH_DISCOUNT_POLICY_LIST: 'discountPolicy/FETCH_DISCOUNT_POLICY_LIST' as const,
    SET_ASYNC_DISCOUNT_POLICY_LIST: 'discountPolicy/SET_ASYNC_DISCOUNT_POLICY_LIST' as const,
    SELECT_DISCOUNT_POLICY: 'discountPolicy/SELECT_DISCOUNT_POLICY' as const,
    UPDATE_DISCOUNT_POLICY_ASYNC: 'discountPolicy/UPDATE_DISCOUNT_POLICY_ASYNC' as const,
    UPDATE_DISCOUNT_POLICY: 'discountPolicy/UPDATE_DISCOUNT_POLICY' as const,
    SAVE_DISCOUNT_POLICY_ASYNC: 'discountPolicy/SAVE_DISCOUNT_POLICY_ASYNC' as const,
    SAVE_DISCOUNT_POLICY: 'discountPolicy/SAVE_DISCOUNT_POLICY' as const
};

export const actions = { 
    fetchDiscountPolicyList: createAction(types.FETCH_DISCOUNT_POLICY_LIST)<undefined>(), 
    setAsyncDiscountPolicyList: createAction(types.SET_ASYNC_DISCOUNT_POLICY_LIST)<AsyncDiscountPolicyList>(),
    selectDiscountPolicy: createAction(types.SELECT_DISCOUNT_POLICY)<number>(),
    updateDiscountPolicyAsync: createAction(types.UPDATE_DISCOUNT_POLICY_ASYNC)<DiscountPolicyUpdateAsyncPayload>(), 
    updateDiscountPolicy: createAction(types.UPDATE_DISCOUNT_POLICY)<DiscountPolicyResult>(), 
    saveDiscountPolicyAsync: createAction(types.SAVE_DISCOUNT_POLICY_ASYNC)<DiscountPolicySaveAsyncPayload>(), 
    saveDiscountPolicy: createAction(types.SAVE_DISCOUNT_POLICY)<DiscountPolicyResult>()
};

const initialState: DiscountPoliciesState = {
    asyncDiscountPolicyList: {
        result: undefined,
        error: undefined
    },
    discountPolicy: undefined
};

const reducer = createReducer<DiscountPoliciesState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_DISCOUNT_POLICY_LIST]: (state, { payload: asyncDiscountPolicyList }: ReturnType<typeof actions.setAsyncDiscountPolicyList>) => ({
        asyncDiscountPolicyList: asyncDiscountPolicyList,
        discountPolicy: undefined
    }),
    [types.SELECT_DISCOUNT_POLICY]: (state, { payload: id }: ReturnType<typeof actions.selectDiscountPolicy>) => ({
        ...state,
        discountPolicy: state.asyncDiscountPolicyList.result?.find(discountPolicy => discountPolicy.id === id)
    }),
    [types.UPDATE_DISCOUNT_POLICY]: (state, { payload: updatedDiscountPolicy }: ReturnType<typeof actions.updateDiscountPolicy>) => ({
        asyncDiscountPolicyList: {
            // ...state.asyncDiscountPolicyList,
            result: state.asyncDiscountPolicyList.result?.map(discountPolicy => 
                discountPolicy.id === updatedDiscountPolicy.id 
                    ? updatedDiscountPolicy 
                    : discountPolicy
            )
        },
        discountPolicy: updatedDiscountPolicy
    }),
    [types.SAVE_DISCOUNT_POLICY]: (state, { payload: savedDiscountPolicy }: ReturnType<typeof actions.saveDiscountPolicy>) => ({
        asyncDiscountPolicyList: {
            // ...state.asyncDiscountPolicyList,
            result: state.asyncDiscountPolicyList.result?.concat(savedDiscountPolicy)
        },
        discountPolicy: savedDiscountPolicy
    })
});

export default reducer;