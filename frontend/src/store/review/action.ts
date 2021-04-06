import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from '../../models/reviews';
import { FIND_REVIEW, FIND_REVIEW_PAGE, REMOVE_REVIEW, REMOVE_REVIEW_REQUEST, SAVE_REVIEW, SAVE_REVIEW_REQUEST, SET_REVIEW_PAGE_ASYNC, UPDATE_REVIEW, UPDATE_REVIEW_REQUEST } from './actionType';
import { ReviewPageAsync, ReviewsState } from './reducer';

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
export const createSetReviewPageAsyncAction = createAction(SET_REVIEW_PAGE_ASYNC)<ReviewPageAsync>();

export const createFindReviewAction = createAction(FIND_REVIEW)<number>();

export const createUpdateReviewRequestAction = createAction(UPDATE_REVIEW_REQUEST)<ReviewUpdateActionPayload>();
export const createUpdateReviewAction = createAction(UPDATE_REVIEW)<ReviewResult>();

export const createSaveReviewRequestAction = createAction(SAVE_REVIEW_REQUEST)<ReviewSaveActionPayload>();
export const createSaveReviewAction = createAction(SAVE_REVIEW)<ReviewsState>();

export const createRemoveReviewRequestAction = createAction(REMOVE_REVIEW_REQUEST)<ReviewRemoveActionPayload>();
export const createRemoveReviewAction = createAction(REMOVE_REVIEW)<ReviewsState>();

export const actions = {
    createFindReviewPageAction, createSetReviewPageAsyncAction,
    createFindReviewAction,
    createUpdateReviewRequestAction, createUpdateReviewAction,
    createSaveReviewRequestAction, createSaveReviewAction,
    createRemoveReviewRequestAction, createRemoveReviewAction
};

export type ReviewsAction = ActionType<typeof actions>;