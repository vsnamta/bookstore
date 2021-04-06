import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import reviewApi from '../../apis/reviewApi';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { createFindReviewPageAction, createRemoveReviewAction, createRemoveReviewRequestAction, createSaveReviewAction, createSaveReviewRequestAction, createSetReviewPageAsyncAction, createUpdateReviewAction, createUpdateReviewRequestAction } from './action';
import { FIND_REVIEW_PAGE, REMOVE_REVIEW_REQUEST, SAVE_REVIEW_REQUEST, UPDATE_REVIEW_REQUEST } from './actionType';
import { ReviewsState } from './reducer';

function* findReviewPageSaga({ payload: findPayload }: ReturnType<typeof createFindReviewPageAction>) {
    const reviewsState: ReviewsState = yield select((state: RootState) => state.reviews);
    
    if(JSON.stringify(reviewsState.reviewPageAsync.payload) === JSON.stringify(findPayload) 
        && reviewsState.reviewPageAsync.result !== undefined) {
        return;
    }

    try {
        const reviewPage: Page<ReviewResult> = yield call(reviewApi.findAll, findPayload);

        yield put(createSetReviewPageAsyncAction({
            payload: findPayload,
            result: reviewPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetReviewPageAsyncAction({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* updateReviewRequestSaga({ payload: reviewUpdateActionPayload }: ReturnType<typeof createUpdateReviewRequestAction>) {
    try {
        const review: ReviewResult = yield call(reviewApi.update, reviewUpdateActionPayload.id, reviewUpdateActionPayload.payload);

        yield put(createUpdateReviewAction(review));
        reviewUpdateActionPayload.onSuccess && reviewUpdateActionPayload.onSuccess(review);
    } catch (error) {
        reviewUpdateActionPayload.onFailure && reviewUpdateActionPayload.onFailure(error);
    }
};

function* saveReviewRequestSaga({ payload: reviewSaveActionPayload }: ReturnType<typeof createSaveReviewRequestAction>) {
    try {
        const review: ReviewResult = yield call(reviewApi.save, reviewSaveActionPayload.payload);

        const findPayload: FindPayload = {
            searchCriteria: {
                column: "productId",
                keyword: reviewSaveActionPayload.payload.productId + ""
            },
            pageCriteria: { page: 1, size: 10 }
        };

        const reviewPage: Page<ReviewResult> = yield put(createFindReviewPageAction(findPayload));

        yield put(createSaveReviewAction({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: review
        }));
        reviewSaveActionPayload.onSuccess && reviewSaveActionPayload.onSuccess(review);
    } catch (error) {
        reviewSaveActionPayload.onFailure && reviewSaveActionPayload.onFailure(error);
    }
};

function* removeReviewRequestSaga({ payload: reviewRemoveActionPayload }: ReturnType<typeof createRemoveReviewRequestAction>) {
    const findPayload: FindPayload = yield select((state: RootState) => state.reviews.reviewPageAsync.payload);

    try {
        yield call(reviewApi.remove, reviewRemoveActionPayload.id);

        const reviewPage: Page<ReviewResult> = yield put(createFindReviewPageAction(findPayload));

        yield put(createRemoveReviewAction({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: undefined
        }));
        reviewRemoveActionPayload.onSuccess && reviewRemoveActionPayload.onSuccess();
    } catch (error) {
        reviewRemoveActionPayload.onFailure && reviewRemoveActionPayload.onFailure(error);
    }
};

export default function* reviewsSaga() {
    yield takeEvery(FIND_REVIEW_PAGE, findReviewPageSaga);
    yield takeEvery(UPDATE_REVIEW_REQUEST, updateReviewRequestSaga);
    yield takeEvery(SAVE_REVIEW_REQUEST, saveReviewRequestSaga);
    yield takeEvery(REMOVE_REVIEW_REQUEST, removeReviewRequestSaga);
}