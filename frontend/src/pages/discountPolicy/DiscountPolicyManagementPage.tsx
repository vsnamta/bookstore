import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import Title from '../../components/general/Title';
import DiscountPolicyManagementContainer from '../../container/discountPolicy/DiscountPolicyManagementContainer';

function DiscountPolicyManagementPage() {
    return (
        <AdminLayout>
            <Title content={"할인정책 관리"} />
            <DiscountPolicyManagementContainer />
        </AdminLayout>
    )
};

export default DiscountPolicyManagementPage;