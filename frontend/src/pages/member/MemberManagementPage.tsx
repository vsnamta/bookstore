import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import MemberList from '../../components/member/MemberList';
import MemberManagementBar from '../../components/member/MemberManagementBar';
import { FindPayload, SearchCriteria } from '../../models/common';
import { RootState } from '../../store';
import { findMemberPage } from '../../store/member/action';

function MemberManagementPage() {
    const dispatch = useDispatch();
    const memberPageAsync = useSelector((state: RootState) => state.members.memberPageAsync);

    useEffect(() => {
        dispatch(findMemberPage({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(findMemberPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findMemberPage({
            ...memberPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(memberPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [memberPageAsync.payload]);

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

export default MemberManagementPage;