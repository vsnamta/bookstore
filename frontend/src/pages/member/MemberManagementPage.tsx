import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import MemberList from '../../components/member/MemberList';
import MemberManagementBar from '../../components/member/MemberManagementBar';
import usePage from '../../hooks/common/usePage';
import { FindPayload } from '../../models/common';
import { MemberResult } from '../../models/members';
import memberService from '../../services/memberService';
import { RootState } from '../../store';

function MemberManagementPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 

    const [
        memberPageState, 
        setMemberPage, 
        updateSearchCriteria, 
        updatePageCriteria
    ] = usePage<MemberResult>({ column: "", keyword: "" }, memberService.findAll);
    
    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(memberPageState.payload as FindPayload).pageCriteria,
            page: selectedItem.selected + 1
        });
    }, [updatePageCriteria, memberPageState.payload]);
    
    return (
        <AdminLayout>
            
            {memberPageState.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>회원관리</h2>
                    </div>
                    <MemberManagementBar onUpdateSearchCriteria={updateSearchCriteria}/>
                    <div className="row">
                        <div className="col-12">
                            <MemberList 
                                memberList={memberPageState.result.list}
                            />
                        </div>                       
                    </div>
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(memberPageState.result.totalCount / 10)}
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