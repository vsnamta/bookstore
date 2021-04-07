import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiscountPolicyManagementTemplate from '../../components/discountPolicy/DiscountPolicyManagementTemplate';
import { DiscountPolicySaveAsyncPayload, DiscountPolicyUpdateAsyncPayload } from '../../models/discountPolicy/store';
import { RootState } from '../../store';
import { actions } from '../../store/discountPolicy';

function DiscountPolicyManagementPage() {
    const dispatch = useDispatch();
    const { discountPolicyListAsync, discountPolicy } = useSelector((state: RootState) => state.discountPolcies);

    useEffect(() => {
        dispatch(actions.fetchDiscountPolicyList());
    }, []);

    const selectDiscountPolicy = useCallback((id: number) => {
        dispatch(actions.selectDiscountPolicy(id));
    }, []);

    const saveDiscountPolicy = useCallback((payload: DiscountPolicySaveAsyncPayload) => {
        dispatch(actions.saveDiscountPolicyAsync(payload));
    }, []);

    const updateDiscountPolicy = useCallback((payload: DiscountPolicyUpdateAsyncPayload) => {
        dispatch(actions.updateDiscountPolicyAsync(payload));
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