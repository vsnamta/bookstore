import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from '../../models/reviews';
import { FIND_REVIEW, FIND_REVIEW_PAGE, FIND_REVIEW_PAGE_FAILURE, FIND_REVIEW_PAGE_REQUEST, FIND_REVIEW_PAGE_SUCCESS, REMOVE_REVIEW, REMOVE_REVIEW_SUCCESS, SAVE_REVIEW, SAVE_REVIEW_SUCCESS, UPDATE_REVIEW, UPDATE_REVIEW_SUCCESS } from './actionType';

export const findReviewPage = createAction(FIND_REVIEW_PAGE)<FindPayload>();

export const findReviewPageAsync = createAsyncAction(
    FIND_REVIEW_PAGE_REQUEST,
    FIND_REVIEW_PAGE_SUCCESS,
    FIND_REVIEW_PAGE_FAILURE
)<FindPayload, Page<ReviewResult>, ApiError>();

export const findReview = createAction(FIND_REVIEW)<number>();

export const updateReview = createAction(UPDATE_REVIEW)<{ 
    id: number, 
    payload: ReviewUpdatePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const updateReviewSuccess = createAction(UPDATE_REVIEW_SUCCESS)<ReviewResult>();

export const saveReview = createAction(SAVE_REVIEW)<{ 
    payload: ReviewSavePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const saveReviewSuccess = createAction(SAVE_REVIEW_SUCCESS)<ReviewResult>();

export const removeReview = createAction(REMOVE_REVIEW)<{ 
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}>();

export const removeReviewSuccess = createAction(REMOVE_REVIEW_SUCCESS)<number>();

export const actions = {
    findReviewPage, findReviewPageAsync,
    findReview,
    updateReview, updateReviewSuccess,
    saveReview, saveReviewSuccess,
    removeReview, removeReviewSuccess
};

export type ReviewsAction = ActionType<typeof actions>;