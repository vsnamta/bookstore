import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import useModal from '../../hooks/useModal';
import { MyData } from '../../models/auth';
import { ProductDetailResult } from '../../models/product';
import { AsyncProduct } from '../../models/product/store';
import { AsyncReviewPage, ReviewSaveAsyncPayload } from '../../models/review/store';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import ReviewList from '../reivew/ReviewList';
import ReviewManagementBar from '../reivew/ReviewManagementBar';
import ReviewSaveModal from '../reivew/ReviewSaveModal';

interface ReviewManagementProps {
    product?: ProductDetailResult;
    asyncReviewPage: AsyncReviewPage;
    myData?: MyData;
    saveReview: (payload: ReviewSaveAsyncPayload) => void;
    onPageChange: (selectedItem: { selected: number; }) => void;
}

function ReviewManagement({ product, asyncReviewPage, myData, saveReview, onPageChange }: ReviewManagementProps) {
    const history = useHistory();
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onOpenSaveModal = useCallback(() => {
        if(!myData) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        openSaveModal();
    }, [myData]);

    const onSaveReview = useCallback((payload: ReviewSaveAsyncPayload) => {
        saveReview({
            payload: payload.payload,
            onSuccess: review => {
                payload.onSuccess && payload.onSuccess(review);
                closeSaveModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <>
            <Title content={"리뷰"} />
            <ReviewManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            /> 
            <ReviewList 
                reviewList={asyncReviewPage.result?.list}
            />
            <Pagination
                page={asyncReviewPage.payload?.pageCriteria.page}  
                totalCount={asyncReviewPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            <ReviewSaveModal
                product={product} 
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveReview={onSaveReview}
            />
        </>
    )
};

export default React.memo(ReviewManagement);