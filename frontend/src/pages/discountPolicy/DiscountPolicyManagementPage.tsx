import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiscountPolicyList from '../../components/discountPolicy/DiscountPolicyList';
import DiscountPolicyManagementBar from '../../components/discountPolicy/DiscountPolicyManagementBar';
import DiscountPolicySaveModal from '../../components/discountPolicy/DiscountPolicySaveModal';
import DiscountPolicyUpdateModal from '../../components/discountPolicy/DiscountPolicyUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import useModal from '../../hooks/useModal';
import { DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';
import { RootState } from '../../store';
import { findDiscountPolicy, findDiscountPolicyList, saveDiscountPolicy, updateDiscountPolicy } from '../../store/discountPolicy/action';

function DiscountPolicyManagementPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findDiscountPolicyList());
    }, []);

    const { discountPolicyListState, discountPolicy } = useSelector((state: RootState) => ({
        discountPolicyListState: state.discountPolcies.discountPolicyListAsync,
        discountPolicy: state.discountPolcies.discountPolicy
    }));

    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectDiscountPolicy = useCallback((id: number) => {
        dispatch(findDiscountPolicy(id));
        openUpdateModal();
    }, []);

    const onSaveDiscountPolicy = useCallback((payload: DiscountPolicySaveOrUpdatePayload) => {
        dispatch(saveDiscountPolicy({
            payload: payload,
            onSuccess: discountPolicy => {
                alert("저장되었습니다.");
                closeSaveModal();
                openUpdateModal();
            },
            onFailure: error => {}
        }));
    }, []);

    const onUpdateDiscountPolicy = useCallback((id: number, payload: DiscountPolicySaveOrUpdatePayload) => {
        dispatch(updateDiscountPolicy({
            id: id,
            payload: payload,
            onSuccess: discountPolicy => {
                alert("변경되었습니다.");
            },
            onFailure: error => {}
        }));
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