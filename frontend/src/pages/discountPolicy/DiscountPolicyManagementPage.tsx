import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiscountPolicyManagementTemplate from '../../components/discountPolicy/DiscountPolicyManagementTemplate';
import { DiscountPolicySaveAsyncPayload, DiscountPolicyUpdateAsyncPayload } from '../../models/discountPolicy/store';
import { RootState } from '../../store';
import { rootActions } from '../../store';

function DiscountPolicyManagementPage() {
    const dispatch = useDispatch();
    const { discountPolicyListAsync, discountPolicy } = useSelector((state: RootState) => state.discountPolcies);

    useEffect(() => {
        dispatch(rootActions.fetchDiscountPolicyList());
    }, []);

    const selectDiscountPolicy = useCallback((id: number) => {
        dispatch(rootActions.selectDiscountPolicy(id));
    }, []);

    const saveDiscountPolicy = useCallback((payload: DiscountPolicySaveAsyncPayload) => {
        dispatch(rootActions.saveDiscountPolicyAsync(payload));
    }, []);

    const updateDiscountPolicy = useCallback((payload: DiscountPolicyUpdateAsyncPayload) => {
        dispatch(rootActions.updateDiscountPolicyAsync(payload));
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