import React, { useCallback } from 'react';
import AdminLayout from '../common/AdminLayout';
import DiscountPolicyList from './DiscountPolicyList';
import DiscountPolicyManagementBar from './DiscountPolicyManagementBar';
import DiscountPolicySaveModal from './DiscountPolicySaveModal';
import DiscountPolicyUpdateModal from './DiscountPolicyUpdateModal';
import ErrorDetail from '../general/ErrorDetail';
import Title from '../general/Title';
import useModal from '../../hooks/useModal';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { DiscountPolicySaveActionPayload, DiscountPolicyUpdateActionPayload } from '../../store/discountPolicy/action';
import { DiscountPolicyListAsync } from '../../store/discountPolicy/reducer';

interface DiscountPolicyManagementTemplateProps {
    discountPolicyListAsync: DiscountPolicyListAsync;
    discountPolicy?: DiscountPolicyResult;
    selectDiscountPolicy: (id: number) => void;
    updateDiscountPolicy: (payload: DiscountPolicyUpdateActionPayload) => void;
    saveDiscountPolicy: (payload: DiscountPolicySaveActionPayload) => void;
}

function DiscountPolicyManagementTemplate({ 
    discountPolicyListAsync, discountPolicy, selectDiscountPolicy, updateDiscountPolicy, saveDiscountPolicy 
}: DiscountPolicyManagementTemplateProps) {
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectDiscountPolicy = useCallback((id: number) => {
        selectDiscountPolicy(id);
        openUpdateModal();
    }, []);

    const onSaveDiscountPolicy = useCallback((payload: DiscountPolicySaveActionPayload) => {
        saveDiscountPolicy({
            payload: payload.payload,
            onSuccess: discountPolicy => {
                payload.onSuccess && payload.onSuccess(discountPolicy);
                closeSaveModal();
                openUpdateModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <AdminLayout>
            <Title content={"할인정책 관리"} />
            <DiscountPolicyManagementBar 
                onOpenSaveModal={openSaveModal}
            /> 
            <DiscountPolicyList 
                discountPolicyList={discountPolicyListAsync.result} 
                onSelectDiscountPolicy={onSelectDiscountPolicy}
            />
            {discountPolicyListAsync.error && <ErrorDetail message={discountPolicyListAsync.error.message} />}
            <DiscountPolicySaveModal 
                isOpen={saveModalIsOpen}
                onSaveDiscountPolicy={onSaveDiscountPolicy}
                onRequestClose={closeSaveModal}
            />
            <DiscountPolicyUpdateModal 
                discountPolicy={discountPolicy}
                isOpen={updateModalIsOpen}
                onUpdateDiscountPolicy={updateDiscountPolicy}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default DiscountPolicyManagementTemplate;