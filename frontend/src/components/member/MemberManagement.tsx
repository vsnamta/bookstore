import React from 'react';
import { SearchCriteria } from '../../models/common';
import { AsyncMemberPage } from '../../models/member/store';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import MemberList from './MemberList';
import MemberManagementBar from './MemberManagementBar';

interface MemberManagementProps {
    asyncMemberPage: AsyncMemberPage;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MemberManagement({ asyncMemberPage, onUpdateSearchCriteria, onPageChange }: MemberManagementProps) {
    return (
        <>
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
        </>
    )
};

export default React.memo(MemberManagement);