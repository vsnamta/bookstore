import React, { useCallback } from 'react';
import DiscountPolicyList from '../../components/discountPolicy/DiscountPolicyList';
import DiscountPolicyManagementBar from '../../components/discountPolicy/DiscountPolicyManagementBar';
import DiscountPolicySaveModal from '../../components/discountPolicy/DiscountPolicySaveModal';
import DiscountPolicyUpdateModal from '../../components/discountPolicy/DiscountPolicyUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import useModal from '../../hooks/common/useModal';
import useDiscountPolicyManagement from '../../hooks/discountPolicy/useDiscountPolicyManagement';
import { DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';

function DiscountPolicyManagementPage() {
    const [discountPolicyManagementState, useDiscountPolicyManagementMethods] = useDiscountPolicyManagement();
    const {discountPolicyListState, discountPolicy} = discountPolicyManagementState;
    const {selectDiscountPolicy, saveDiscountPolicy, updateDiscountPolicy} = useDiscountPolicyManagementMethods;
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectDiscountPolicy = useCallback((id: number) => {
        selectDiscountPolicy(id);
        openUpdateModal();
    }, [selectDiscountPolicy]);

    const onSaveDiscountPolicy = useCallback((payload: DiscountPolicySaveOrUpdatePayload) => {
        saveDiscountPolicy(payload)
            .then(() => closeSaveModal());
    }, []);

    const onUpdateDiscountPolicy = useCallback((id: number, payload: DiscountPolicySaveOrUpdatePayload) => {
        updateDiscountPolicy(id, payload)
            .then(() => closeUpdateModal());
    }, []);

    return (
        <AdminLayout>
            {discountPolicyListState.error && <ErrorDetail message={"오류 발생"} />}

            {discountPolicyListState.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>할인정책 관리</h2>
                    </div>
                    <DiscountPolicyManagementBar 
                        onOpenSaveModal={openSaveModal}
                    /> 
                    <div className="row">
                        <div className="col-12">
                            <DiscountPolicyList 
                                discountPolicyList={discountPolicyListState.result} 
                                onSelectDiscountPolicy={onSelectDiscountPolicy}
                            />
                        </div>
                    </div>
                </div>
            </main>}
            <DiscountPolicySaveModal 
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveDiscountPolicy={onSaveDiscountPolicy}
            />
            {discountPolicy &&
            <DiscountPolicyUpdateModal 
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
                discountPolicy={discountPolicy}
                onUpdateDiscountPolicy={onUpdateDiscountPolicy}
            />}
        </AdminLayout>
    )
};

export default DiscountPolicyManagementPage;