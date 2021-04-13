import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewManagement from '../../components/reivew/MyReviewManagement';
import { MyData } from '../../models/auth';
import { FindPayload } from '../../models/common';
import { ReviewRemoveAsyncPayload, ReviewUpdateAsyncPayload } from '../../models/review/store';
import { rootActions, RootState } from '../../store';

function MyReviewManagementContainer() {
    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData) as MyData;
    const { asyncReviewPage, review } = useSelector((state: RootState) => state.reviews);

    useEffect(() => {
        dispatch(rootActions.fetchReviewPage({
            searchCriteria: { 
                column: "memberId", 
                keyword: myData.id + "" 
            },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectReview = useCallback((id: number) => {
        dispatch(rootActions.selectReview(id));
    }, []);

    const updateReview = useCallback((payload: ReviewUpdateAsyncPayload) => {
        dispatch(rootActions.updateReviewAsync(payload));
    }, []);

    const removeReview = useCallback((payload: ReviewRemoveAsyncPayload) => {
        dispatch(rootActions.removeReviewAsync(payload));
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
        <MyReviewManagement 
            asyncReviewPage={asyncReviewPage}
            review={review}
            selectReview={selectReview}
            removeReview={removeReview}
            updateReview={updateReview}
            onPageChange={onPageChange}
        />
    )
};

export default MyReviewManagementContainer;