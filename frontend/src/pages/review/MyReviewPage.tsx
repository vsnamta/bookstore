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
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
    const { reviewPageAsync, review } = useSelector((state: RootState) => state.reviews);

    useEffect(() => {
        dispatch(findReviewPage({
            searchCriteria: { 
                column: "memberId", 
                keyword: loginMember.id + "" 
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
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onRemoveReview = useCallback((id: number) => {
        dispatch(removeReview({
            id: id,
            onSuccess: () => alert("삭제되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findReviewPage({
            ...reviewPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(reviewPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [reviewPageAsync.payload]);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>리뷰내역</h3>
                <MyReviewList 
                    reviewList={reviewPageAsync.result?.list} 
                    onSelectReview={onSelectReview}
                    onRemoveReview={onRemoveReview} 
                />
                <Pagination
                    page={reviewPageAsync.payload?.pageCriteria.page}  
                    totalCount={reviewPageAsync.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {reviewPageAsync.error && <ErrorDetail message={reviewPageAsync.error.message} />}
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