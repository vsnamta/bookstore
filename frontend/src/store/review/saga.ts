import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import reviewApi from '../../apis/reviewApi';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { createReviewPageFindAction, createReviewRemoveAction, createReviewRemoveRequestAction, createReviewSaveAction, createReviewSaveRequestAction, createReviewPageAsyncSetAction, createReviewUpdateAction, createReviewUpdateRequestAction } from './action';
import { FIND_REVIEW_PAGE, REMOVE_REVIEW_REQUEST, SAVE_REVIEW_REQUEST, UPDATE_REVIEW_REQUEST } from './actionType';
import { ReviewsState } from './reducer';

function* findReviewPageSaga({ payload: findPayload }: ReturnType<typeof createReviewPageFindAction>) {
    const reviewsState: ReviewsState = yield select((state: RootState) => state.reviews);
    
    if(JSON.stringify(reviewsState.reviewPageAsync.payload) === JSON.stringify(findPayload) 
        && reviewsState.reviewPageAsync.result !== undefined) {
        return;
    }

    try {
        const reviewPage: Page<ReviewResult> = yield call(reviewApi.findAll, findPayload);

        yield put(createReviewPageAsyncSetAction({
            payload: findPayload,
            result: reviewPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createReviewPageAsyncSetAction({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* updateReviewRequestSaga({ payload: reviewUpdateRequestActionPayload }: ReturnType<typeof createReviewUpdateRequestAction>) {
    try {
        const review: ReviewResult = yield call(reviewApi.update, reviewUpdateRequestActionPayload.id, reviewUpdateRequestActionPayload.payload);

        yield put(createReviewUpdateAction(review));
        reviewUpdateRequestActionPayload.onSuccess && reviewUpdateRequestActionPayload.onSuccess(review);
    } catch (error) {
        reviewUpdateRequestActionPayload.onFailure && reviewUpdateRequestActionPayload.onFailure(error);
    }
};

function* saveReviewRequestSaga({ payload: reviewSaveRequestActionPayload }: ReturnType<typeof createReviewSaveRequestAction>) {
    try {
        const review: ReviewResult = yield call(reviewApi.save, reviewSaveRequestActionPayload.payload);

        const findPayload: FindPayload = {
            searchCriteria: {
                column: "productId",
                keyword: reviewSaveRequestActionPayload.payload.productId + ""
            },
            pageCriteria: { page: 1, size: 10 }
        };

        const reviewPage: Page<ReviewResult> = yield put(createReviewPageFindAction(findPayload));

        yield put(createReviewSaveAction({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: review
        }));
        reviewSaveRequestActionPayload.onSuccess && reviewSaveRequestActionPayload.onSuccess(review);
    } catch (error) {
        reviewSaveRequestActionPayload.onFailure && reviewSaveRequestActionPayload.onFailure(error);
    }
};

function* removeReviewRequestSaga({ payload: reviewRemoveRequestActionPayload }: ReturnType<typeof createReviewRemoveRequestAction>) {
    const findPayload: FindPayload = yield select((state: RootState) => state.reviews.reviewPageAsync.payload);

    try {
        yield call(reviewApi.remove, reviewRemoveRequestActionPayload.id);

        const reviewPage: Page<ReviewResult> = yield put(createReviewPageFindAction(findPayload));

        yield put(createReviewRemoveAction({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: undefined
        }));
        reviewRemoveRequestActionPayload.onSuccess && reviewRemoveRequestActionPayload.onSuccess();
    } catch (error) {
        reviewRemoveRequestActionPayload.onFailure && reviewRemoveRequestActionPayload.onFailure(error);
    }
};

export default function* reviewsSaga() {
    yield takeEvery(FIND_REVIEW_PAGE, findReviewPageSaga);
    yield takeEvery(UPDATE_REVIEW_REQUEST, updateReviewRequestSaga);
    yield takeEvery(SAVE_REVIEW_REQUEST, saveReviewRequestSaga);
    yield takeEvery(REMOVE_REVIEW_REQUEST, removeReviewRequestSaga);
}