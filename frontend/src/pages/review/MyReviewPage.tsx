import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MyReviewList from '../../components/reivew/MyReviewList';
import ReviewUpdateModal from '../../components/reivew/ReviewUpdateModal';
import useModal from '../../hooks/useModal';
import { FindPayload } from '../../models/common';
import { LoginMember } from '../../models/members';
import { ReviewUpdatePayload } from '../../models/reviews';
import { RootState } from '../../store';
import { findReview, findReviewPage, removeReview, updateReview } from '../../store/review/action';

function MyReviewPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const { reviewPageState, review } = useSelector((state: RootState) => ({ 
        reviewPageState: state.reviews.reviewPageAsync,
        review: state.reviews.review
    }));
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findReviewPage({
            searchCriteria: { 
                column: "memberId", 
                keyword: (loginMember as LoginMember).id + "" 
            },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);
    
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectReview = useCallback((id: number) => {
        dispatch(findReview(id));
        openUpdateModal();
    }, []);

    const onUpdateReview = useCallback((id: number, payload: ReviewUpdatePayload) => {
        dispatch(updateReview({
            id: id,
            payload: payload,
            onSuccess: review => {
                alert("변경되었습니다.");
                closeUpdateModal();
            },
            onFailure: error => {}
        }));
    }, []);

    const onRemoveReview = useCallback((id: number) => {
        dispatch(removeReview({
            id: id,
            onSuccess: () => alert("삭제되었습니다."),
            onFailure: error => {}
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findReviewPage({
            ...reviewPageState.payload as FindPayload,
            pageCriteria: {
                ...(reviewPageState.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [reviewPageState.payload]);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>리뷰내역</h3>
                <MyReviewList 
                    reviewList={reviewPageState.result?.list} 
                    onSelectReview={onSelectReview}
                    onRemoveReview={onRemoveReview} 
                />
                <Pagination
                    page={reviewPageState.payload?.pageCriteria.page}  
                    totalCount={reviewPageState.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {reviewPageState.error && <ErrorDetail message={"오류 발생"} />}
                <ReviewUpdateModal 
                    review={review}
                    isOpen={updateModalIsOpen}
                    onUpdateReview={onUpdateReview}
                    onRequestClose={closeUpdateModal}
                />
            </MyPageLayout>                                                 
        </Layout>
    )
};

export default MyReviewPage;