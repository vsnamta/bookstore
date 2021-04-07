import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewTemplate from '../../components/reivew/MyReviewTemplate';
import { MyData } from '../../models/auth';
import { FindPayload } from '../../models/common';
import { ReviewRemoveAsyncPayload, ReviewUpdateAsyncPayload } from '../../models/review/store';
import { RootState } from '../../store';
import { actions } from '../../store/review';

function MyReviewPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const { reviewPageAsync, review } = useSelector((state: RootState) => state.reviews);

    useEffect(() => {
        dispatch(actions.fetchReviewPage({
            searchCriteria: { 
                column: "memberId", 
                keyword: loginMember.id + "" 
            },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectReview = useCallback((id: number) => {
        dispatch(actions.selectReview(id));
    }, []);

    const updateReview = useCallback((payload: ReviewUpdateAsyncPayload) => {
        dispatch(actions.updateReviewAsync(payload));
    }, []);

    const removeReview = useCallback((payload: ReviewRemoveAsyncPayload) => {
        dispatch(actions.removeReviewAsync(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(actions.fetchReviewPage({
            ...reviewPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(reviewPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [reviewPageAsync.payload]);
    
    return (
        <MyReviewTemplate 
            reviewPageAsync={reviewPageAsync}
            review={review}
            selectReview={selectReview}
            removeReview={removeReview}
            updateReview={updateReview}
            onPageChange={onPageChange}
        />
    )
};

export default MyReviewPage;