import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewManagement from '../../components/reivew/ReviewManagement';
import { FindPayload } from '../../models/common';
import { ReviewSaveAsyncPayload } from '../../models/review/store';
import { rootActions, RootState } from '../../store';

function ReviewManagementContainer() {
    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData);
    const asyncProduct = useSelector((state: RootState) => state.products.asyncProduct);
    const asyncReviewPage = useSelector((state: RootState) => state.reviews.asyncReviewPage);

    useEffect(() => {
        dispatch(rootActions.fetchReviewPage({
            searchCriteria: { column: "productId", keyword: id },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveReview = useCallback((payload: ReviewSaveAsyncPayload) => {
        dispatch(rootActions.saveReviewAsync(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchReviewPage({
            ...asyncReviewPage.payload as FindPayload,
            pageCriteria: {
                ...(asyncReviewPage.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncReviewPage.payload]);

    return (
        <ReviewManagement
            product={asyncProduct.result}
            asyncReviewPage={asyncReviewPage}
            myData={myData}
            saveReview={saveReview}
            onPageChange={onPageChange}
        />
    )
};

export default ReviewManagementContainer;