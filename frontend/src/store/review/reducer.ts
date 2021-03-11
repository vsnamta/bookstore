import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { ReviewsAction } from './action';
import { FIND_REVIEW, FIND_REVIEW_PAGE_FAILURE, FIND_REVIEW_PAGE_REQUEST, FIND_REVIEW_PAGE_SUCCESS, REMOVE_REVIEW_SUCCESS, SAVE_REVIEW_SUCCESS, UPDATE_REVIEW_SUCCESS } from './actionType';

export interface ReviewsState {
    reviewPageAsync: {
        payload?: FindPayload;
        result?: Page<ReviewResult>;
        error?: ApiError; 
    };
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
    [FIND_REVIEW_PAGE_REQUEST]: (state, action) => ({
        ...state,
        reviewPageAsync: {
            payload: action.payload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_REVIEW_PAGE_SUCCESS]: (state, action) => ({
        ...state,
        reviewPageAsync: {
            ...state.reviewPageAsync,
            result: action.payload
        } 
    }),
    [FIND_REVIEW_PAGE_FAILURE]: (state, action) => ({
        ...state,
        reviewPageAsync: {
            ...state.reviewPageAsync,
            error: action.payload
        } 
    }),
    [FIND_REVIEW]: (state, action) => ({
        ...state,
        review: (state.reviewPageAsync.result as Page<ReviewResult>).list
            .find(review => review.id === action.payload)
    }),
    [UPDATE_REVIEW_SUCCESS]: (state, action) => ({
        reviewPageAsync: {
            ...state.reviewPageAsync,
            result: {
                ...state.reviewPageAsync.result as Page<ReviewResult>,
                list: (state.reviewPageAsync.result as Page<ReviewResult>).list
                    .map(review => 
                        review.id === action.payload.id
                            ? action.payload 
                            : review
                    )
            }
        },
        review: action.payload
    }),
    [SAVE_REVIEW_SUCCESS]: (state, action) => ({
        reviewPageAsync: initialState.reviewPageAsync,
        review: action.payload
    }),
    [REMOVE_REVIEW_SUCCESS]: (state, action) => ({
        reviewPageAsync: initialState.reviewPageAsync,
        review: undefined
    })
});