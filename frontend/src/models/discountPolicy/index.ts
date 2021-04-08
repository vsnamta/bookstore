export interface DiscountPolicyResult {
    id: number;
    name: string;
    discountPercent: number;
    depositPercent: number;
}

export interface DiscountPolicySaveOrUpdatePayload {
    name: string;
    discountPercent: number;
    depositPercent: number;
}