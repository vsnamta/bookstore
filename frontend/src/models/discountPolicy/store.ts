import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";

export interface DiscountPoliciesState {
    asyncDiscountPolicyList: AsyncDiscountPolicyList,
    discountPolicy?: DiscountPolicyResult;
}

export interface AsyncDiscountPolicyList {
    result?: DiscountPolicyResult[];
    error?: ApiError;
}

export interface DiscountPolicyUpdateAsyncPayload { 
    id: number, 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface DiscountPolicySaveAsyncPayload { 
    payload: DiscountPolicySaveOrUpdatePayload,
    onSuccess?: (discountPolicy: DiscountPolicyResult) => void, 
    onFailure?: (error: ApiError) => void
}