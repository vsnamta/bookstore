import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import Title from '../../components/general/Title';
import MemberManagementContainer from '../../container/member/MemberManagementContainer';

function MemberManagementPage() {
    return (
        <AdminLayout>
            <Title content={"회원 관리"} />
            <MemberManagementContainer />
        </AdminLayout>
    )
};

export default MemberManagementPage;