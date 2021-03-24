import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from '../../models/reviews';
import { FIND_REVIEW, FIND_REVIEW_PAGE, FIND_REVIEW_PAGE_FAILURE, FIND_REVIEW_PAGE_REQUEST, FIND_REVIEW_PAGE_SUCCESS, REMOVE_REVIEW, REMOVE_REVIEW_SUCCESS, SAVE_REVIEW, SAVE_REVIEW_SUCCESS, UPDATE_REVIEW, UPDATE_REVIEW_SUCCESS } from './actionType';

export interface ReviewUpdateActionPayload { 
    id: number, 
    payload: ReviewUpdatePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ReviewSaveActionPayload { 
    payload: ReviewSavePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ReviewRemoveActionPayload { 
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindReviewPageAction = createAction(FIND_REVIEW_PAGE)<FindPayload>();
export const findReviewPageAsyncActionCreator = createAsyncAction(FIND_REVIEW_PAGE_REQUEST, FIND_REVIEW_PAGE_SUCCESS, FIND_REVIEW_PAGE_FAILURE)<FindPayload, Page<ReviewResult>, ApiError>();

export const createFindReviewAction = createAction(FIND_REVIEW)<number>();

export const createUpdateReviewAction = createAction(UPDATE_REVIEW)<ReviewUpdateActionPayload>();
export const createUpdateReviewSuccessAction = createAction(UPDATE_REVIEW_SUCCESS)<ReviewResult>();

export const createSaveReviewAction = createAction(SAVE_REVIEW)<ReviewSaveActionPayload>();
export const createSaveReviewSuccessAction = createAction(SAVE_REVIEW_SUCCESS)<ReviewResult>();

export const createRemoveReviewAction = createAction(REMOVE_REVIEW)<ReviewRemoveActionPayload>();
export const createRemoveReviewSuccessAction = createAction(REMOVE_REVIEW_SUCCESS)<number>();

export const actions = {
    createFindReviewPageAction, findReviewPageAsyncActionCreator,
    createFindReviewAction,
    createUpdateReviewAction, createUpdateReviewSuccessAction,
    createSaveReviewAction, createSaveReviewSuccessAction,
    createRemoveReviewAction, createRemoveReviewSuccessAction
};

export type ReviewsAction = ActionType<typeof actions>;