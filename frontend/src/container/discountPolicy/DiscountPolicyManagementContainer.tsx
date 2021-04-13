import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiscountPolicyManagement from '../../components/discountPolicy/DiscountPolicyManagement';
import { DiscountPolicySaveAsyncPayload, DiscountPolicyUpdateAsyncPayload } from '../../models/discountPolicy/store';
import { RootState } from '../../store';
import { rootActions } from '../../store';

function DiscountPolicyManagementContainer() {
    const dispatch = useDispatch();
    const { asyncDiscountPolicyList, discountPolicy } = useSelector((state: RootState) => state.discountPolcies);

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
        <DiscountPolicyManagement 
            asyncDiscountPolicyList={asyncDiscountPolicyList}
            discountPolicy={discountPolicy}
            selectDiscountPolicy={selectDiscountPolicy}
            updateDiscountPolicy={updateDiscountPolicy}
            saveDiscountPolicy={saveDiscountPolicy}
        />
    )
};

export default DiscountPolicyManagementContainer;