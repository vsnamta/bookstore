import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';
import { FIND_DISCOUNT_POLICY, FIND_DISCOUNT_POLICY_LIST, SAVE_DISCOUNT_POLICY, SAVE_DISCOUNT_POLICY_REQUEST, SET_DISCOUNT_POLICY_LIST_ASYNC, UPDATE_DISCOUNT_POLICY, UPDATE_DISCOUNT_POLICY_REQUEST } from './actionType';
import { DiscountPolicyListAsync } from './reducer';

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
export const createSetDiscountPolicyListAsyncAction = createAction(SET_DISCOUNT_POLICY_LIST_ASYNC)<DiscountPolicyListAsync>();

export const createFindDiscountPolicyAction = createAction(FIND_DISCOUNT_POLICY)<number>();

export const createUpdateDiscountPolicyRequestAction = createAction(UPDATE_DISCOUNT_POLICY_REQUEST)<DiscountPolicyUpdateActionPayload>();
export const createUpdateDiscountPolicyAction = createAction(UPDATE_DISCOUNT_POLICY)<DiscountPolicyResult>();

export const createSaveDiscountPolicyRequestAction = createAction(SAVE_DISCOUNT_POLICY_REQUEST)<DiscountPolicySaveActionPayload>();
export const createSaveDiscountPolicyAction = createAction(SAVE_DISCOUNT_POLICY)<DiscountPolicyResult>();

export const actions = { 
    createFindDiscountPolicyListAction, createSetDiscountPolicyListAsyncAction,
    createFindDiscountPolicyAction,
    createUpdateDiscountPolicyRequestAction, createUpdateDiscountPolicyAction, 
    createSaveDiscountPolicyRequestAction, createSaveDiscountPolicyAction
};

export type DiscountPoliciesAction = ActionType<typeof actions>;