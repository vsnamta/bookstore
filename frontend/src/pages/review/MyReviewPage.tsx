import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindPayload } from '../../models/common';
import { LoginMember } from '../../models/members';
import { RootState } from '../../store';
import { createFindReviewAction, createFindReviewPageAction, createRemoveReviewAction, createUpdateReviewAction, ReviewRemoveActionPayload, ReviewUpdateActionPayload } from '../../store/review/action';
import MyReviewTemplate from '../../components/reivew/MyReviewTemplate';
import { MyData } from '../../models/auths';

function MyReviewPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const { reviewPageAsync, review } = useSelector((state: RootState) => state.reviews);

    useEffect(() => {
        dispatch(createFindReviewPageAction({
            searchCriteria: { 
                column: "memberId", 
                keyword: loginMember.id + "" 
            },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectReview = useCallback((id: number) => {
        dispatch(createFindReviewAction(id));
    }, []);

    const updateReview = useCallback((payload: ReviewUpdateActionPayload) => {
        dispatch(createUpdateReviewAction(payload));
    }, []);

    const removeReview = useCallback((payload: ReviewRemoveActionPayload) => {
        dispatch(createRemoveReviewAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createFindReviewPageAction({
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