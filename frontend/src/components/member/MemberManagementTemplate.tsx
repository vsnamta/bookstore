import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import MemberList from './MemberList';
import MemberManagementBar from './MemberManagementBar';
import { SearchCriteria } from '../../models/common';
import { AsyncMemberPage } from '../../models/member/store';

interface MemberManagementTemplateProps {
    asyncMemberPage: AsyncMemberPage;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MemberManagementTemplate({ asyncMemberPage, onUpdateSearchCriteria, onPageChange }: MemberManagementTemplateProps) {
    return (
        <AdminLayout>
            <Title content={"회원 관리"} />
            <MemberManagementBar
                searchCriteria={asyncMemberPage.payload?.searchCriteria} 
                onUpdateSearchCriteria={onUpdateSearchCriteria}
            />
            <MemberList 
                memberList={asyncMemberPage.result?.list}
            />
            <Pagination 
                page={asyncMemberPage.payload?.pageCriteria.page} 
                totalCount={asyncMemberPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            {asyncMemberPage.error && <ErrorDetail message={asyncMemberPage.error.message} />}
        </AdminLayout>
    )
};

export default MemberManagementTemplate;