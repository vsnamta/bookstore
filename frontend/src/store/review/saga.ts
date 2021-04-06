import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import reviewApi from '../../apis/reviewApi';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { createFindReviewPageAction, createRemoveReviewAction, createRemoveReviewSuccessAction, createSaveReviewAction, createSaveReviewSuccessAction, createUpdateReviewAction, createUpdateReviewSuccessAction, findReviewPageAsyncActionCreator } from './action';
import { FIND_REVIEW_PAGE, REMOVE_REVIEW, SAVE_REVIEW, UPDATE_REVIEW } from './actionType';
import { ReviewsState } from './reducer';

function* findReviewPageSaga({ payload: findPayload }: ReturnType<typeof createFindReviewPageAction>) {
    const reviewsState: ReviewsState = yield select((state: RootState) => state.reviews);
    
    if(JSON.stringify(reviewsState.reviewPageAsync.payload) === JSON.stringify(findPayload) 
        && reviewsState.reviewPageAsync.result !== undefined) {
        return;
    }
    
    yield put(findReviewPageAsyncActionCreator.request(findPayload));

    try {
        const reviewPage: Page<ReviewResult> = yield call(reviewApi.findAll, findPayload);

        yield put(findReviewPageAsyncActionCreator.success(reviewPage));
    } catch (error) {
        yield put(findReviewPageAsyncActionCreator.failure(error));
    }
};

function* updateReviewSaga({ payload: reviewUpdateActionPayload }: ReturnType<typeof createUpdateReviewAction>) {
    try {
        const review: ReviewResult = yield call(reviewApi.update, reviewUpdateActionPayload.id, reviewUpdateActionPayload.payload);

        yield put(createUpdateReviewSuccessAction(review));
        reviewUpdateActionPayload.onSuccess && reviewUpdateActionPayload.onSuccess(review);
    } catch (error) {
        reviewUpdateActionPayload.onFailure && reviewUpdateActionPayload.onFailure(error);
    }
};

function* saveReviewSaga({ payload: reviewSaveActionPayload }: ReturnType<typeof createSaveReviewAction>) {
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

        yield put(createSaveReviewSuccessAction({
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

function* removeReviewSaga({ payload: reviewRemoveActionPayload }: ReturnType<typeof createRemoveReviewAction>) {
    const findPayload: FindPayload = yield select((state: RootState) => state.reviews.reviewPageAsync.payload);

    try {
        yield call(reviewApi.remove, reviewRemoveActionPayload.id);

        const reviewPage: Page<ReviewResult> = yield put(createFindReviewPageAction(findPayload));

        yield put(createRemoveReviewSuccessAction({
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
    yield takeEvery(UPDATE_REVIEW, updateReviewSaga);
    yield takeEvery(SAVE_REVIEW, saveReviewSaga);
    yield takeEvery(REMOVE_REVIEW, removeReviewSaga);
}