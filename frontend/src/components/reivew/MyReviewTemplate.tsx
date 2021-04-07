import React, { useCallback } from 'react';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import MyReviewList from './MyReviewList';
import ReviewUpdateModal from './ReviewUpdateModal';
import useModal from '../../hooks/useModal';
import { ReviewResult } from '../../models/review';
import { ReviewRemoveAsyncPayload, ReviewUpdateAsyncPayload } from '../../models/review/store';
import { ReviewPageAsync } from '../../models/review/store';

interface MyReviewTemplateProps {
    reviewPageAsync: ReviewPageAsync;
    review?: ReviewResult;
    selectReview: (id: number) => void;
    removeReview: (payload: ReviewRemoveAsyncPayload) => void;
    updateReview: (payload: ReviewUpdateAsyncPayload) => void;
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