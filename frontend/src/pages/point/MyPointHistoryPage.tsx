import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import PointHistoryList from '../../components/pointHistory/PointHistoryList';
import usePointHistoryPage from '../../hooks/pointHistory/usePointHistoryPage';
import { PointHistoryFindPayload } from '../../models/pointHistories';
import { RootState } from '../../store';

function MyPointHistoryPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }} />
    }

    const [pointHistoryPageState, updateMemberId, updatePageCriteria] = usePointHistoryPage(loginMember.id);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(pointHistoryPageState.payload as PointHistoryFindPayload).pageCriteria,
            page: selectedItem.selected + 1
        });
    }, [updatePageCriteria, pointHistoryPageState.payload]);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>포인트내역</h3>
                {pointHistoryPageState.error && <ErrorDetail message={"오류 발생"} />}
                {pointHistoryPageState.result &&
                <>
                    <PointHistoryList pointhistoryList={pointHistoryPageState.result.list} />
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(pointHistoryPageState.result.totalCount / 10)}
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
                </>}
            </MyPageLayout>                       
        </Layout>
    )
};

export default MyPointHistoryPage;