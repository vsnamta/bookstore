import { useCallback, useState } from "react";
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from "../../models/discountPolicies";
import discountPolicyApi from '../../apis/discountPolicyApi';
import useDiscountPolicyList, { DiscountPolicyListState } from "./useDiscountPolicyList";
import { ApiError } from "../../error/ApiError";

interface DiscountPolicyManagementState {
    discountPolicyListState: DiscountPolicyListState;
    discountPolicy?: DiscountPolicyResult;
}

interface UseDiscountPolicyManagementMethods {
    selectDiscountPolicy: (id: number) => void;
    saveDiscountPolicy: (payload: DiscountPolicySaveOrUpdatePayload) => Promise<void>;
    updateDiscountPolicy: (id: number, payload: DiscountPolicySaveOrUpdatePayload) => Promise<void>;
}

function useDiscountPolicyManagement() : [
    DiscountPolicyManagementState,
    UseDiscountPolicyManagementMethods
] {
    const [discountPolicyListState, setDiscountPolicyList] = useDiscountPolicyList();
    const [discountPolicy, setDiscountPolicy] = useState<DiscountPolicyResult>();

    const selectDiscountPolicy = useCallback((id: number) => {
        const selected = (discountPolicyListState.result as DiscountPolicyResult[]).find(discountPolicy => discountPolicy.id === id);
        setDiscountPolicy(selected);
    }, [discountPolicyListState.result]); 

    const saveDiscountPolicy = useCallback((payload: DiscountPolicySaveOrUpdatePayload) => {
        return discountPolicyApi.save(payload)
           .then(savedDiscountPolicy => {
               setDiscountPolicyList(discountPoliyList =>
                    (discountPoliyList as DiscountPolicyResult[]).concat(savedDiscountPolicy)
               );
            })
            .catch((error: ApiError) => {
                
            });  
    }, []);

    const updateDiscountPolicy = useCallback((id: number, payload: DiscountPolicySaveOrUpdatePayload) => {
        return discountPolicyApi.update(id, payload)
            .then(updatedDiscountPolicy => {
                setDiscountPolicyList(discountPoliyList =>
                    (discountPoliyList as DiscountPolicyResult[]).map(discountPolicy => 
                        discountPolicy.id === updatedDiscountPolicy.id ? updatedDiscountPolicy : discountPolicy
                    )
                );
            })
            .catch((error: ApiError) => {
                
            });
    }, []);

    return [{
        discountPolicyListState,
        discountPolicy
    }, {
        selectDiscountPolicy,
        saveDiscountPolicy,
        updateDiscountPolicy
    }];
}

export default useDiscountPolicyManagement;