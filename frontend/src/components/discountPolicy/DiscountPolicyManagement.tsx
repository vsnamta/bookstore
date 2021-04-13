import React, { useCallback } from 'react';
import useModal from '../../hooks/useModal';
import { DiscountPolicyResult } from '../../models/discountPolicy';
import { AsyncDiscountPolicyList, DiscountPolicySaveAsyncPayload, DiscountPolicyUpdateAsyncPayload } from '../../models/discountPolicy/store';
import ErrorDetail from '../general/ErrorDetail';
import Title from '../general/Title';
import DiscountPolicyList from './DiscountPolicyList';
import DiscountPolicyManagementBar from './DiscountPolicyManagementBar';
import DiscountPolicySaveModal from './DiscountPolicySaveModal';
import DiscountPolicyUpdateModal from './DiscountPolicyUpdateModal';

interface DiscountPolicyManagementProps {
    asyncDiscountPolicyList: AsyncDiscountPolicyList;
    discountPolicy?: DiscountPolicyResult;
    selectDiscountPolicy: (id: number) => void;
    updateDiscountPolicy: (payload: DiscountPolicyUpdateAsyncPayload) => void;
    saveDiscountPolicy: (payload: DiscountPolicySaveAsyncPayload) => void;
}

function DiscountPolicyManagement({ 
    asyncDiscountPolicyList, discountPolicy, selectDiscountPolicy, updateDiscountPolicy, saveDiscountPolicy 
}: DiscountPolicyManagementProps) {
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectDiscountPolicy = useCallback((id: number) => {
        selectDiscountPolicy(id);
        openUpdateModal();
    }, []);

    const onSaveDiscountPolicy = useCallback((payload: DiscountPolicySaveAsyncPayload) => {
        saveDiscountPolicy({
            payload: payload.payload,
            onSuccess: discountPolicy => {
                payload.onSuccess?.(discountPolicy);
                closeSaveModal();
                openUpdateModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <>
            <DiscountPolicyManagementBar 
                onOpenSaveModal={openSaveModal}
            /> 
            <DiscountPolicyList 
                discountPolicyList={asyncDiscountPolicyList.result} 
                onSelectDiscountPolicy={onSelectDiscountPolicy}
            />
            {asyncDiscountPolicyList.error && <ErrorDetail message={asyncDiscountPolicyList.error.message} />}
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
        </>
    )
};

export default React.memo(DiscountPolicyManagement);