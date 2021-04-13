import React, { useCallback } from 'react';
import useModal from '../../hooks/useModal';
import { ReviewResult } from '../../models/review';
import { AsyncReviewPage, ReviewRemoveAsyncPayload, ReviewUpdateAsyncPayload } from '../../models/review/store';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import MyReviewList from './MyReviewList';
import ReviewUpdateModal from './ReviewUpdateModal';

interface MyReviewManagementProps {
    asyncReviewPage: AsyncReviewPage;
    review?: ReviewResult;
    selectReview: (id: number) => void;
    removeReview: (payload: ReviewRemoveAsyncPayload) => void;
    updateReview: (payload: ReviewUpdateAsyncPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MyReviewManagement({
    asyncReviewPage, review, selectReview, removeReview, updateReview, onPageChange
}: MyReviewManagementProps) {
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectReview = useCallback((id: number) => {
        selectReview(id);
        openUpdateModal();
    }, []);

    return (
        <>
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
        </>
    )
};

export default React.memo(MyReviewManagement);