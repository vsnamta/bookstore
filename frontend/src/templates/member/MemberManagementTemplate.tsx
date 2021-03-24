import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import MemberList from '../../components/member/MemberList';
import MemberManagementBar from '../../components/member/MemberManagementBar';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page, SearchCriteria } from '../../models/common';
import { MemberResult } from '../../models/members';

interface MemberManagementTemplateProps {
    memberPageAsync?: {
        payload?: FindPayload | undefined;
        result?: Page<MemberResult> | undefined;
        error?: ApiError | undefined;
    };
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
                searchCriteria={memberPageAsync?.payload?.searchCriteria} 
                onUpdateSearchCriteria={onUpdateSearchCriteria}
            />
            <MemberList 
                memberList={memberPageAsync?.result?.list}
            />
            <Pagination 
                page={memberPageAsync?.payload?.pageCriteria.page} 
                totalCount={memberPageAsync?.result?.totalCount}
                onPageChange={onPageChange}
            />
            {memberPageAsync?.error && <ErrorDetail message={memberPageAsync.error.message} />}
        </AdminLayout>
    )
};

export default MemberManagementTemplate;