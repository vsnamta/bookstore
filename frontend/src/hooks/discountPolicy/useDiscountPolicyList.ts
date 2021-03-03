import { useCallback, useEffect, useState } from "react";
import { DiscountPolicyResult } from "../../models/discountPolicies";
import discountPolicyApi from '../../apis/discountPolicyApi';
import { ApiError } from "../../error/ApiError";

export interface DiscountPolicyListState {
    result?: DiscountPolicyResult[];
    error?: ApiError;
}

function useDiscountPolicyList() : [
    DiscountPolicyListState,
    React.Dispatch<React.SetStateAction<DiscountPolicyResult[] | undefined>>,
] {
    const [discountPolicyList, setDiscountPolicyList] = useState<DiscountPolicyResult[]>();
    const [error, setError] = useState<ApiError>();

    const selectDiscountPolicyList = useCallback(() => {
        setError(undefined);

        discountPolicyApi.findAll()
            .then(discountPolicyList => setDiscountPolicyList(discountPolicyList))
            .catch((error: ApiError) => {
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