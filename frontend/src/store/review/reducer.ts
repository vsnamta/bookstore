import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { createReviewFindAction, createReviewRemoveAction, createReviewSaveAction, createReviewPageAsyncSetAction, createReviewUpdateAction, ReviewsAction } from './action';
import { FIND_REVIEW, REMOVE_REVIEW, SAVE_REVIEW, SET_REVIEW_PAGE_ASYNC, UPDATE_REVIEW } from './actionType';

export interface ReviewPageAsync {
    payload?: FindPayload;
    result?: Page<ReviewResult>;
    error?: ApiError; 
}

export interface ReviewsState {
    reviewPageAsync: ReviewPageAsync;
    review?: ReviewResult;
}

const initialState: ReviewsState = {
    reviewPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    review: undefined
};

export default createReducer<ReviewsState, ReviewsAction>(initialState, {
    [SET_REVIEW_PAGE_ASYNC]: (state, { payload: reviewPageAsync }: ReturnType<typeof createReviewPageAsyncSetAction>) => ({
        ...state,
        reviewPageAsync: reviewPageAsync
    }),
    [FIND_REVIEW]: (state, { payload: id }: ReturnType<typeof createReviewFindAction>) => ({
        ...state,
        review: (state.reviewPageAsync.result as Page<ReviewResult>).list
            .find(review => review.id === id)
    }),
    [UPDATE_REVIEW]: (state, { payload: updatedReview }: ReturnType<typeof createReviewUpdateAction>) => ({
        reviewPageAsync: {
            ...state.reviewPageAsync,
            result: {
                ...state.reviewPageAsync.result as Page<ReviewResult>,
                list: (state.reviewPageAsync.result as Page<ReviewResult>).list
                    .map(review => 
                        review.id === updatedReview.id
                            ? updatedReview 
                            : review
                    )
            }
        },
        review: updatedReview
    }),
    [SAVE_REVIEW]: (state, { payload: reviewsState }: ReturnType<typeof createReviewSaveAction>) => (
        reviewsState
    ),
    [REMOVE_REVIEW]: (state, { payload: reviewsState }: ReturnType<typeof createReviewRemoveAction>) => (
        reviewsState
    )
});