import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import AdminLayout from '../../components/layout/AdminLayout';
import MemberList from '../../components/member/MemberList';
import MemberManagementBar from '../../components/member/MemberManagementBar';
import { FindPayload, SearchCriteria } from '../../models/common';
import { RootState } from '../../store';
import { findMemberPage } from '../../store/member/action';

function MemberManagementPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 

    const dispatch = useDispatch();
    const membersState = useSelector((state: RootState) => state.members);

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
            ...membersState.memberPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(membersState.memberPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [membersState.memberPageAsync.payload]);

    return (
        <AdminLayout>
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>회원관리</h2>
                    </div>
                    <MemberManagementBar
                        searchCriteria={membersState.memberPageAsync.payload?.searchCriteria} 
                        onUpdateSearchCriteria={onUpdateSearchCriteria}
                    />
                    <div className="row">
                        <div className="col-12">
                            <MemberList 
                                memberList={membersState.memberPageAsync.result?.list}
                            />
                        </div>                       
                    </div>
                    <Pagination 
                        page={membersState.memberPageAsync.payload?.pageCriteria.page} 
                        totalCount={membersState.memberPageAsync.result?.totalCount}
                        onPageChange={onPageChange}
                    />
                    {membersState.memberPageAsync.error && <ErrorDetail message={"오류 발생"} />}
                </div>
            </main>
        </AdminLayout>
    )
};

export default MemberManagementPage;