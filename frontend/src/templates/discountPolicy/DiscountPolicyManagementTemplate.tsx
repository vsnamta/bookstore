import React from 'react';
import DiscountPolicyList from '../../components/discountPolicy/DiscountPolicyList';
import DiscountPolicyManagementBar from '../../components/discountPolicy/DiscountPolicyManagementBar';
import DiscountPolicySaveModal from '../../components/discountPolicy/DiscountPolicySaveModal';
import DiscountPolicyUpdateModal from '../../components/discountPolicy/DiscountPolicyUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import { ApiError } from '../../error/ApiError';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';

interface DiscountPolicyManagementTemplateProps {
    discountPolicyListAsync?: {
        result?: DiscountPolicyResult[] | undefined;
        error?: ApiError | undefined;
    };
    discountPolicy?: DiscountPolicyResult;
    saveModalIsOpen: boolean;
    updateModalIsOpen: boolean;
    onSelectDiscountPolicy: (id: number) => void;
    onUpdateDiscountPolicy: (id: number, payload: DiscountPolicySaveOrUpdatePayload) => void;
    onSaveDiscountPolicy: (payload: DiscountPolicySaveOrUpdatePayload) => void;
    onOpenSaveModal: () => void;
    closeSaveModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    closeUpdateModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function DiscountPolicyManagementTemplate({
    discountPolicyListAsync, discountPolicy, saveModalIsOpen, updateModalIsOpen,
    onSelectDiscountPolicy, onUpdateDiscountPolicy, onSaveDiscountPolicy, onOpenSaveModal, closeSaveModal, closeUpdateModal
}: DiscountPolicyManagementTemplateProps) {
    return (
        <AdminLayout>
            <Title content={"할인정책 관리"} />
            <DiscountPolicyManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            /> 
            <DiscountPolicyList 
                discountPolicyList={discountPolicyListAsync?.result} 
                onSelectDiscountPolicy={onSelectDiscountPolicy}
            />
            {discountPolicyListAsync?.error && <ErrorDetail message={discountPolicyListAsync.error.message} />}
            <DiscountPolicySaveModal 
                isOpen={saveModalIsOpen}
                onSaveDiscountPolicy={onSaveDiscountPolicy}
                onRequestClose={closeSaveModal}
            />
            <DiscountPolicyUpdateModal 
                discountPolicy={discountPolicy}
                isOpen={updateModalIsOpen}
                onUpdateDiscountPolicy={onUpdateDiscountPolicy}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default DiscountPolicyManagementTemplate;