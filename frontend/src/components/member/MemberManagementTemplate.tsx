import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import MemberList from './MemberList';
import MemberManagementBar from './MemberManagementBar';
import { SearchCriteria } from '../../models/common';
import { MemberPageAsync } from '../../models/member/store';

interface MemberManagementTemplateProps {
    memberPageAsync: MemberPageAsync;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MemberManagementTemplate({ memberPageAsync, onUpdateSearchCriteria, onPageChange }: MemberManagementTemplateProps) {
    return (
        <AdminLayout>
            <Title content={"회원 관리"} />
            <MemberManagementBar
                searchCriteria={memberPageAsync.payload?.searchCriteria} 
                onUpdateSearchCriteria={onUpdateSearchCriteria}
            />
            <MemberList 
                memberList={memberPageAsync.result?.list}
            />
            <Pagination 
                page={memberPageAsync.payload?.pageCriteria.page} 
                totalCount={memberPageAsync.result?.totalCount}
                onPageChange={onPageChange}
            />
            {memberPageAsync.error && <ErrorDetail message={memberPageAsync.error.message} />}
        </AdminLayout>
    )
};

export default MemberManagementTemplate;