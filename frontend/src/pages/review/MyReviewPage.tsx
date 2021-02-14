import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MyReviewList from '../../components/reivew/MyReviewList';
import ReviewUpdateModal from '../../components/reivew/ReviewUpdateModal';
import useModal from '../../hooks/common/useModal';
import useReviewManagement from '../../hooks/review/useReviewManagement';
import { FindPayload } from '../../models/common';
import { LoginMember } from '../../models/members';
import { ReviewUpdatePayload } from '../../models/reviews';
import { RootState } from '../../store';

function MyReviewPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const [reviewManagementState, useReviewManagementMethods] = useReviewManagement({
        column: "memberId", 
        keyword: (loginMember as LoginMember).id + ""
    });
    const {reviewPageState, review} = reviewManagementState;
    const {
        updatePageCriteria,
        selectReview,
        updateReview,
        removeReview
    } = useReviewManagementMethods;
    
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectReview = useCallback((id: number) => {
        selectReview(id);
        openUpdateModal();
    }, [selectReview]);

    const onUpdateReview = useCallback((id: number, payload: ReviewUpdatePayload) => {
        updateReview(id, payload)
            .then(() => closeUpdateModal());
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(reviewPageState.payload as FindPayload).pageCriteria,
            page: selectedItem.selected + 1
        });
    }, [updatePageCriteria, reviewPageState.payload]);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>리뷰내역</h3>
                {reviewPageState.result && 
                <>
                    <MyReviewList 
                        reviewList={reviewPageState.result.list} 
                        onSelectReview={onSelectReview}
                        onRemoveReview={removeReview} 
                    />
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(reviewPageState.result.totalCount / 10)}
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
                {review && 
                <ReviewUpdateModal 
                    isOpen={updateModalIsOpen}
                    onRequestClose={closeUpdateModal}
                    review={review}
                    onUpdateReview={onUpdateReview}
                />}
            </MyPageLayout>                                                 
        </Layout>
    )
};

export default MyReviewPage;