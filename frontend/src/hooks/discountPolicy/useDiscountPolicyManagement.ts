import { useCallback, useState } from "react";
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from "../../models/discountPolicies";
import discountPolicyService from '../../services/discountPolicyService';
import useDiscountPolicyList, { DiscountPolicyListState } from "./useDiscountPolicyList";

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
        return discountPolicyService.save(payload)
           .then(id => {
               setDiscountPolicyList(discountPoliyList =>
                    (discountPoliyList as DiscountPolicyResult[]).concat({
                        id: id,
                        name: payload.name,
                        discountPercent: payload.discountPercent,
                        depositPercent: payload.depositPercent
                    })
               );
            });  
    }, []);

    const updateDiscountPolicy = useCallback((id: number, payload: DiscountPolicySaveOrUpdatePayload) => {
        return discountPolicyService.update(id, payload)
            .then(id => {
                setDiscountPolicyList(discountPoliyList =>
                    (discountPoliyList as DiscountPolicyResult[]).map(discountPolicy => 
                        discountPolicy.id === id
                            ? { 
                                ...discountPolicy, 
                                name: payload.name, 
                                discountPercent: payload.discountPercent, 
                                depositPercent: payload.depositPercent 
                            } 
                            : discountPolicy
                    )
                );
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