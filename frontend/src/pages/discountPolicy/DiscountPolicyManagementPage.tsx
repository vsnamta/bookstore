import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import DiscountPolicyList from '../../components/discountPolicy/DiscountPolicyList';
import DiscountPolicyManagementBar from '../../components/discountPolicy/DiscountPolicyManagementBar';
import DiscountPolicySaveModal from '../../components/discountPolicy/DiscountPolicySaveModal';
import DiscountPolicyUpdateModal from '../../components/discountPolicy/DiscountPolicyUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import useModal from '../../hooks/useModal';
import { DiscountPolicySaveOrUpdatePayload } from '../../models/discountPolicies';
import { RootState } from '../../store';
import { findDiscountPolicy, findDiscountPolicyList, saveDiscountPolicy, updateDiscountPolicy } from '../../store/discountPolicy/action';

function DiscountPolicyManagementPage() {
    const dispatch = useDispatch();
    const { discountPolicyListAsync, discountPolicy } = useSelector((state: RootState) => ({
        discountPolicyListAsync: state.discountPolcies.discountPolicyListAsync,
        discountPolicy: state.discountPolcies.discountPolicy
    }));

    useEffect(() => {
        dispatch(findDiscountPolicyList());
    }, []);

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
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onUpdateDiscountPolicy = useCallback((id: number, payload: DiscountPolicySaveOrUpdatePayload) => {
        dispatch(updateDiscountPolicy({
            id: id,
            payload: payload,
            onSuccess: discountPolicy => {
                alert("변경되었습니다.");
            },
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
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
                onUpdateDiscountPolicy={onUpdateDiscountPolicy}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default DiscountPolicyManagementPage;