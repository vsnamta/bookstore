import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewTemplate from '../../components/reivew/MyReviewTemplate';
import { MyData } from '../../models/auths';
import { FindPayload } from '../../models/common';
import { RootState } from '../../store';
import { createReviewFindAction, createReviewPageFindAction, createReviewRemoveRequestAction, createReviewUpdateRequestAction, ReviewRemoveRequestActionPayload, ReviewUpdateRequestActionPayload } from '../../store/review/action';

function MyReviewPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const { reviewPageAsync, review } = useSelector((state: RootState) => state.reviews);

    useEffect(() => {
        dispatch(createReviewPageFindAction({
            searchCriteria: { 
                column: "memberId", 
                keyword: loginMember.id + "" 
            },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectReview = useCallback((id: number) => {
        dispatch(createReviewFindAction(id));
    }, []);

    const updateReview = useCallback((payload: ReviewUpdateRequestActionPayload) => {
        dispatch(createReviewUpdateRequestAction(payload));
    }, []);

    const removeReview = useCallback((payload: ReviewRemoveRequestActionPayload) => {
        dispatch(createReviewRemoveRequestAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createReviewPageFindAction({
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