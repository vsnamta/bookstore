import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';
import { FIND_DISCOUNT_POLICY, FIND_DISCOUNT_POLICY_LIST, FIND_DISCOUNT_POLICY_LIST_FAILURE, FIND_DISCOUNT_POLICY_LIST_REQUEST, FIND_DISCOUNT_POLICY_LIST_SUCCESS, SAVE_DISCOUNT_POLICY, SAVE_DISCOUNT_POLICY_SUCCESS, UPDATE_DISCOUNT_POLICY, UPDATE_DISCOUNT_POLICY_SUCCESS } from './actionType';

export interface DiscountPolicyUpdateActionPayload { 
    id: number, 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface DiscountPolicySaveActionPayload { 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindDiscountPolicyListAction = createAction(FIND_DISCOUNT_POLICY_LIST)<void>();
export const findDiscountPolicyListAsyncActionCreator = createAsyncAction(FIND_DISCOUNT_POLICY_LIST_REQUEST, FIND_DISCOUNT_POLICY_LIST_SUCCESS, FIND_DISCOUNT_POLICY_LIST_FAILURE)<void, DiscountPolicyResult[], ApiError>();

export const createFindDiscountPolicyAction = createAction(FIND_DISCOUNT_POLICY)<number>();

export const createUpdateDiscountPolicyAction = createAction(UPDATE_DISCOUNT_POLICY)<DiscountPolicyUpdateActionPayload>();
export const createUpdateDiscountPolicySuccessAction = createAction(UPDATE_DISCOUNT_POLICY_SUCCESS)<DiscountPolicyResult>();

export const createSaveDiscountPolicyAction = createAction(SAVE_DISCOUNT_POLICY)<DiscountPolicySaveActionPayload>();
export const createSaveDiscountPolicySuccessAction = createAction(SAVE_DISCOUNT_POLICY_SUCCESS)<DiscountPolicyResult>();

export const actions = { 
    createFindDiscountPolicyListAction, findDiscountPolicyListAsyncActionCreator,
    createFindDiscountPolicyAction,
    createUpdateDiscountPolicyAction, createUpdateDiscountPolicySuccessAction, 
    createSaveDiscountPolicyAction, createSaveDiscountPolicySuccessAction
};

export type DiscountPoliciesAction = ActionType<typeof actions>;