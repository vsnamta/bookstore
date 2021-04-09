import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";
import { FindPayload, Page } from "../common";

export interface ReviewsState {
    asyncReviewPage: AsyncReviewPage;
    review?: ReviewResult;
}

export interface AsyncReviewPage {
    payload?: FindPayload;
    result?: Page<ReviewResult>;
    error?: ApiError; 
}

export interface ReviewUpdateAsyncPayload { 
    id: number, 
    payload: ReviewUpdatePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ReviewRemoveAsyncPayload { 
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export interface ReviewSaveAsyncPayload { 
    payload: ReviewSavePayload,
    onSuccess?: (review: ReviewResult) => void, 
    onFailure?: (error: ApiError) => void
}