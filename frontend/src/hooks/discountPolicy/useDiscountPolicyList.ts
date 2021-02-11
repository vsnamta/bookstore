import { useCallback, useEffect, useState } from "react";
import { DiscountPolicyResult } from "../../models/discountPolicies";
import discountPolicyService from '../../services/discountPolicyService';

export interface DiscountPolicyListState {
    result?: DiscountPolicyResult[];
    error?: Error;
}

function useDiscountPolicyList() : [
    DiscountPolicyListState,
    React.Dispatch<React.SetStateAction<DiscountPolicyResult[] | undefined>>,
] {
    const [discountPolicyList, setDiscountPolicyList] = useState<DiscountPolicyResult[]>();
    const [error, setError] = useState<Error>();

    const selectDiscountPolicyList = useCallback(() => {
        setError(undefined);

        discountPolicyService.findAll()
            .then(discountPolicyList => setDiscountPolicyList(discountPolicyList))
            .catch(error => {
                setError(error);
                setDiscountPolicyList(undefined);
            });
    }, []);

    useEffect(() => {
        selectDiscountPolicyList();
    }, []);

    return [{
        result: discountPolicyList,
        error: error
    }, setDiscountPolicyList];
}

export default useDiscountPolicyList;