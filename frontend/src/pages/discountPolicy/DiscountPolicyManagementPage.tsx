import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createFindDiscountPolicyAction, createFindDiscountPolicyListAction, createSaveDiscountPolicyAction, createUpdateDiscountPolicyAction, DiscountPolicySaveActionPayload, DiscountPolicyUpdateActionPayload } from '../../store/discountPolicy/action';
import DiscountPolicyManagementTemplate from '../../components/discountPolicy/DiscountPolicyManagementTemplate';

function DiscountPolicyManagementPage() {
    const dispatch = useDispatch();
    const { discountPolicyListAsync, discountPolicy } = useSelector((state: RootState) => state.discountPolcies);

    useEffect(() => {
        dispatch(createFindDiscountPolicyListAction());
    }, []);

    const selectDiscountPolicy = useCallback((id: number) => {
        dispatch(createFindDiscountPolicyAction(id));
    }, []);

    const saveDiscountPolicy = useCallback((payload: DiscountPolicySaveActionPayload) => {
        dispatch(createSaveDiscountPolicyAction(payload));
    }, []);

    const updateDiscountPolicy = useCallback((payload: DiscountPolicyUpdateActionPayload) => {
        dispatch(createUpdateDiscountPolicyAction(payload));
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