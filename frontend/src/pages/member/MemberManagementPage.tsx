import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
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
            searchCriteria: { column: "", keyword: "" },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(findMemberPage({
            ...membersState.memberPageAsync.payload as FindPayload,
            searchCriteria: searchCriteria,
        }));
    }, [membersState.memberPageAsync.payload]);

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

            {membersState.memberPageAsync.error && <ErrorDetail message={"오류 발생"} />}
            
            {membersState.memberPageAsync.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>회원관리</h2>
                    </div>
                    <MemberManagementBar onUpdateSearchCriteria={onUpdateSearchCriteria}/>
                    <div className="row">
                        <div className="col-12">
                            <MemberList 
                                memberList={membersState.memberPageAsync.result.list}
                            />
                        </div>                       
                    </div>
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(membersState.memberPageAsync.result.totalCount / 10)}
                                    pageRangeDisplayed={10}
                                    marginPagesDisplayed={0}
                                    onPageChange={onPageChange}
                                    containerClassName={"pagination-btns flex-center"}
                                    previousLinkClassName={"single-btn prev-btn"}
                                    previousLabel={"<"}
                                    activeClassName={"active"}
                                    pageLinkClassName={"single-btn"}
                                    nextLinkClassName={"single-btn next-btn"}
                                    nextLabel={">"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>}
        </AdminLayout>
    )
};

export default MemberManagementPage;