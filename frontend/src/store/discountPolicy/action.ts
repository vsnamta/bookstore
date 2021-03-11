import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';
import { FIND_DISCOUNT_POLICY, FIND_DISCOUNT_POLICY_LIST, FIND_DISCOUNT_POLICY_LIST_FAILURE, FIND_DISCOUNT_POLICY_LIST_REQUEST, FIND_DISCOUNT_POLICY_LIST_SUCCESS, SAVE_DISCOUNT_POLICY, SAVE_DISCOUNT_POLICY_SUCCESS, UPDATE_DISCOUNT_POLICY, UPDATE_DISCOUNT_POLICY_SUCCESS } from './actionType';

export const findDiscountPolicyList = createAction(FIND_DISCOUNT_POLICY_LIST)<void>();

export const findDiscountPolicyListAsync = createAsyncAction(
    FIND_DISCOUNT_POLICY_LIST_REQUEST,
    FIND_DISCOUNT_POLICY_LIST_SUCCESS,
    FIND_DISCOUNT_POLICY_LIST_FAILURE
)<void, DiscountPolicyResult[], ApiError>();

export const findDiscountPolicy = createAction(FIND_DISCOUNT_POLICY)<number>();

export const updateDiscountPolicy = createAction(UPDATE_DISCOUNT_POLICY)<{ 
    id: number, 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const updateDiscountPolicySuccess = createAction(UPDATE_DISCOUNT_POLICY_SUCCESS)<DiscountPolicyResult>();

export const saveDiscountPolicy = createAction(SAVE_DISCOUNT_POLICY)<{ 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const saveDiscountPolicySuccess = createAction(SAVE_DISCOUNT_POLICY_SUCCESS)<DiscountPolicyResult>();

export const actions = { 
    findDiscountPolicyList, findDiscountPolicyListAsync,
    findDiscountPolicy,
    updateDiscountPolicy, updateDiscountPolicySuccess, 
    saveDiscountPolicy, saveDiscountPolicySuccess
};

export type DiscountPoliciesAction = ActionType<typeof actions>;