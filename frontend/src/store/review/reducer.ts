import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { createFindReviewAction, createRemoveReviewSuccessAction, createSaveReviewAction, createSaveReviewSuccessAction, createUpdateReviewSuccessAction, findReviewPageAsyncActionCreator, ReviewsAction } from './action';
import { FIND_REVIEW, FIND_REVIEW_PAGE_FAILURE, FIND_REVIEW_PAGE_REQUEST, FIND_REVIEW_PAGE_SUCCESS, REMOVE_REVIEW_SUCCESS, SAVE_REVIEW_SUCCESS, UPDATE_REVIEW_SUCCESS } from './actionType';

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
    [FIND_REVIEW_PAGE_REQUEST]: (state, { payload: findPayload }: ReturnType<typeof findReviewPageAsyncActionCreator.request>) => ({
        ...state,
        reviewPageAsync: {
            payload: findPayload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_REVIEW_PAGE_SUCCESS]: (state, { payload: reviewPage }: ReturnType<typeof findReviewPageAsyncActionCreator.success>) => ({
        ...state,
        reviewPageAsync: {
            ...state.reviewPageAsync,
            result: reviewPage
        } 
    }),
    [FIND_REVIEW_PAGE_FAILURE]: (state, { payload: error }: ReturnType<typeof findReviewPageAsyncActionCreator.failure>) => ({
        ...state,
        reviewPageAsync: {
            ...state.reviewPageAsync,
            error: error
        } 
    }),
    [FIND_REVIEW]: (state, { payload: id }: ReturnType<typeof createFindReviewAction>) => ({
        ...state,
        review: (state.reviewPageAsync.result as Page<ReviewResult>).list
            .find(review => review.id === id)
    }),
    [UPDATE_REVIEW_SUCCESS]: (state, { payload: updatedReview }: ReturnType<typeof createUpdateReviewSuccessAction>) => ({
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
    [SAVE_REVIEW_SUCCESS]: (state, { payload: reviewsState }: ReturnType<typeof createSaveReviewSuccessAction>) => (
        reviewsState
    ),
    [REMOVE_REVIEW_SUCCESS]: (state, { payload: reviewsState }: ReturnType<typeof createRemoveReviewSuccessAction>) => (
        reviewsState
    )
});