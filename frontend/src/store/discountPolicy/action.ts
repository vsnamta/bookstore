import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';
import { FIND_DISCOUNT_POLICY, FIND_DISCOUNT_POLICY_LIST, SAVE_DISCOUNT_POLICY, SAVE_DISCOUNT_POLICY_REQUEST, SET_DISCOUNT_POLICY_LIST_ASYNC, UPDATE_DISCOUNT_POLICY, UPDATE_DISCOUNT_POLICY_REQUEST } from './actionType';
import { DiscountPolicyListAsync } from './reducer';

export interface DiscountPolicyUpdateRequestActionPayload { 
    id: number, 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface DiscountPolicySaveRequestActionPayload { 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createDiscountPolicyListFindAction = createAction(FIND_DISCOUNT_POLICY_LIST)<void>();
export const createDiscountPolicyListAsyncSetAction = createAction(SET_DISCOUNT_POLICY_LIST_ASYNC)<DiscountPolicyListAsync>();

export const createDiscountPolicyFindAction = createAction(FIND_DISCOUNT_POLICY)<number>();

export const createDiscountPolicyUpdateRequestAction = createAction(UPDATE_DISCOUNT_POLICY_REQUEST)<DiscountPolicyUpdateRequestActionPayload>();
export const createDiscountPolicyUpdateAction = createAction(UPDATE_DISCOUNT_POLICY)<DiscountPolicyResult>();

export const createDiscountPolicySaveRequestAction = createAction(SAVE_DISCOUNT_POLICY_REQUEST)<DiscountPolicySaveRequestActionPayload>();
export const createDiscountPolicySaveAction = createAction(SAVE_DISCOUNT_POLICY)<DiscountPolicyResult>();

export const actions = { 
    createDiscountPolicyListFindAction, createDiscountPolicyListAsyncSetAction,
    createDiscountPolicyFindAction,
    createDiscountPolicyUpdateRequestAction, createDiscountPolicyUpdateAction, 
    createDiscountPolicySaveRequestAction, createDiscountPolicySaveAction
};

export type DiscountPoliciesAction = ActionType<typeof actions>;