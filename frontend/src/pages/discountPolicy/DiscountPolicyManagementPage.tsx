import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiscountPolicyManagementTemplate from '../../components/discountPolicy/DiscountPolicyManagementTemplate';
import { RootState } from '../../store';
import { createDiscountPolicyFindAction, createDiscountPolicyListFindAction, createDiscountPolicySaveRequestAction, createDiscountPolicyUpdateRequestAction, DiscountPolicySaveRequestActionPayload, DiscountPolicyUpdateRequestActionPayload } from '../../store/discountPolicy/action';

function DiscountPolicyManagementPage() {
    const dispatch = useDispatch();
    const { discountPolicyListAsync, discountPolicy } = useSelector((state: RootState) => state.discountPolcies);

    useEffect(() => {
        dispatch(createDiscountPolicyListFindAction());
    }, []);

    const selectDiscountPolicy = useCallback((id: number) => {
        dispatch(createDiscountPolicyFindAction(id));
    }, []);

    const saveDiscountPolicy = useCallback((payload: DiscountPolicySaveRequestActionPayload) => {
        dispatch(createDiscountPolicySaveRequestAction(payload));
    }, []);

    const updateDiscountPolicy = useCallback((payload: DiscountPolicyUpdateRequestActionPayload) => {
        dispatch(createDiscountPolicyUpdateRequestAction(payload));
    }, []);

    return (
        <DiscountPolicyManagementTemplate 
            discountPolicyListAsync={discountPolicyListAsync}
            discountPolicy={discountPolicy}
            selectDiscountPolicy={selectDiscountPolicy}
            updateDiscountPolicy={updateDiscountPolicy}
            saveDiscountPolicy={saveDiscountPolicy}
        />
    )
};

export default DiscountPolicyManagementPage;