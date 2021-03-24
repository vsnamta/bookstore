import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MyReviewList from '../../components/reivew/MyReviewList';
import ReviewUpdateModal from '../../components/reivew/ReviewUpdateModal';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult, ReviewUpdatePayload } from '../../models/reviews';

interface MyReviewTemplateProps {
    reviewPageAsync?: {
        payload?: FindPayload | undefined;
        result?: Page<ReviewResult> | undefined;
        error?: ApiError | undefined;
    };
    review?: ReviewResult | undefined;
    updateModalIsOpen: boolean;
    onSelectReview: (id: number) => void;
    onRemoveReview: (id: number) => void;
    onUpdateReview: (id: number, payload: ReviewUpdatePayload) => void;
    closeUpdateModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MyReviewTemplate({
    reviewPageAsync, review, updateModalIsOpen,
    onSelectReview, onRemoveReview, onUpdateReview, closeUpdateModal, onPageChange
}: MyReviewTemplateProps) {
    return (
        <Layout>
            <MyPageLayout>
                <h3>리뷰내역</h3>
                <MyReviewList 
                    reviewList={reviewPageAsync?.result?.list} 
                    onSelectReview={onSelectReview}
                    onRemoveReview={onRemoveReview} 
                />
                <Pagination
                    page={reviewPageAsync?.payload?.pageCriteria.page}  
                    totalCount={reviewPageAsync?.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {reviewPageAsync?.error && <ErrorDetail message={reviewPageAsync.error.message} />}
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

export default MyReviewTemplate;