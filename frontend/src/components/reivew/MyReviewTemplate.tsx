import React, { useCallback } from 'react';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import MyReviewList from './MyReviewList';
import ReviewUpdateModal from './ReviewUpdateModal';
import useModal from '../../hooks/useModal';
import { ReviewResult } from '../../models/reviews';
import { ReviewRemoveActionPayload, ReviewUpdateActionPayload } from '../../store/review/action';
import { ReviewPageAsync } from '../../store/review/reducer';

interface MyReviewTemplateProps {
    reviewPageAsync: ReviewPageAsync;
    review?: ReviewResult;
    selectReview: (id: number) => void;
    removeReview: (payload: ReviewRemoveActionPayload) => void;
    updateReview: (payload: ReviewUpdateActionPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MyReviewTemplate({
    reviewPageAsync, review, selectReview, removeReview, updateReview, onPageChange
}: MyReviewTemplateProps) {
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectReview = useCallback((id: number) => {
        selectReview(id);
        openUpdateModal();
    }, []);

    return (
        <Layout>
            <MyPageLayout>
                <h3>리뷰내역</h3>
                <MyReviewList 
                    reviewList={reviewPageAsync.result?.list} 
                    onSelectReview={onSelectReview}
                    onRemoveReview={removeReview} 
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
                    onUpdateReview={updateReview}
                    onRequestClose={closeUpdateModal}
                />
            </MyPageLayout>                                                 
        </Layout>
    )
};

export default MyReviewTemplate;