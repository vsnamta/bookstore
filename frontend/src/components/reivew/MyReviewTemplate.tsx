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
import { AsyncReviewPage } from '../../models/review/store';

interface MyReviewTemplateProps {
    asyncReviewPage: AsyncReviewPage;
    review?: ReviewResult;
    selectReview: (id: number) => void;
    removeReview: (payload: ReviewRemoveAsyncPayload) => void;
    updateReview: (payload: ReviewUpdateAsyncPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MyReviewTemplate({
    asyncReviewPage, review, selectReview, removeReview, updateReview, onPageChange
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
                    reviewList={asyncReviewPage.result?.list} 
                    onSelectReview={onSelectReview}
                    onRemoveReview={removeReview} 
                />
                <Pagination
                    page={asyncReviewPage.payload?.pageCriteria.page}  
                    totalCount={asyncReviewPage.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {asyncReviewPage.error && <ErrorDetail message={asyncReviewPage.error.message} />}
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