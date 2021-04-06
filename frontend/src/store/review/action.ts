import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from '../../models/reviews';
import { FIND_REVIEW, FIND_REVIEW_PAGE, REMOVE_REVIEW, REMOVE_REVIEW_REQUEST, SAVE_REVIEW, SAVE_REVIEW_REQUEST, SET_REVIEW_PAGE_ASYNC, UPDATE_REVIEW, UPDATE_REVIEW_REQUEST } from './actionType';
import { ReviewPageAsync, ReviewsState } from './reducer';

export interface ReviewUpdateRequestActionPayload { 
    id: number, 
    payload: ReviewUpdatePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ReviewSaveRequestActionPayload { 
    payload: ReviewSavePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ReviewRemoveRequestActionPayload { 
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export const createReviewPageFindAction = createAction(FIND_REVIEW_PAGE)<FindPayload>();
export const createReviewPageAsyncSetAction = createAction(SET_REVIEW_PAGE_ASYNC)<ReviewPageAsync>();

export const createReviewFindAction = createAction(FIND_REVIEW)<number>();

export const createReviewUpdateRequestAction = createAction(UPDATE_REVIEW_REQUEST)<ReviewUpdateRequestActionPayload>();
export const createReviewUpdateAction = createAction(UPDATE_REVIEW)<ReviewResult>();

export const createReviewSaveRequestAction = createAction(SAVE_REVIEW_REQUEST)<ReviewSaveRequestActionPayload>();
export const createReviewSaveAction = createAction(SAVE_REVIEW)<ReviewsState>();

export const createReviewRemoveRequestAction = createAction(REMOVE_REVIEW_REQUEST)<ReviewRemoveRequestActionPayload>();
export const createReviewRemoveAction = createAction(REMOVE_REVIEW)<ReviewsState>();

export const actions = {
    createReviewPageFindAction, createReviewPageAsyncSetAction,
    createReviewFindAction,
    createReviewUpdateRequestAction, createReviewUpdateAction,
    createReviewSaveRequestAction, createReviewSaveAction,
    createReviewRemoveRequestAction, createReviewRemoveAction
};

export type ReviewsAction = ActionType<typeof actions>;