import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import reviewApi from '../../apis/reviewApi';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/review';
import { ReviewsState } from '../../models/review/store';

function* findReviewPageSaga({ payload: findPayload }: ReturnType<typeof actions.fetchReviewPage>) {
    const reviewsState: ReviewsState = yield select((state: RootState) => state.reviews);
    
    if(JSON.stringify(reviewsState.reviewPageAsync.payload) === JSON.stringify(findPayload) 
        && reviewsState.reviewPageAsync.result !== undefined) {
        return;
    }

    try {
        const reviewPage: Page<ReviewResult> = yield call(reviewApi.findAll, findPayload);

        yield put(actions.setReviewsState({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: undefined
        }));
    } catch (error) {
        yield put(actions.setReviewsState({
            reviewPageAsync: {
                payload: findPayload,
                result: undefined,
                error: error
            },
            review: undefined
        }));
    }
};

function* updateReviewAsyncSaga({ payload: reviewUpdateAsyncPayload }: ReturnType<typeof actions.updateReviewAsync>) {
    try {
        const review: ReviewResult = yield call(reviewApi.update, reviewUpdateAsyncPayload.id, reviewUpdateAsyncPayload.payload);

        yield put(actions.updateReview(review));
        reviewUpdateAsyncPayload.onSuccess && reviewUpdateAsyncPayload.onSuccess(review);
    } catch (error) {
        reviewUpdateAsyncPayload.onFailure && reviewUpdateAsyncPayload.onFailure(error);
    }
};

function* saveReviewAsyncSaga({ payload: reviewSaveAsyncPayload }: ReturnType<typeof actions.saveReviewAsync>) {
    try {
        const review: ReviewResult = yield call(reviewApi.save, reviewSaveAsyncPayload.payload);

        const findPayload: FindPayload = {
            searchCriteria: {
                column: "productId",
                keyword: reviewSaveAsyncPayload.payload.productId + ""
            },
            pageCriteria: { page: 1, size: 10 }
        };

        const reviewPage: Page<ReviewResult> = yield put(actions.fetchReviewPage(findPayload));

        yield put(actions.setReviewsState({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: review
        }));

        reviewSaveAsyncPayload.onSuccess && reviewSaveAsyncPayload.onSuccess(review);
    } catch (error) {
        reviewSaveAsyncPayload.onFailure && reviewSaveAsyncPayload.onFailure(error);
    }
};

function* removeReviewAsyncSaga({ payload: reviewRemoveAsyncPayload }: ReturnType<typeof actions.removeReviewAsync>) {
    try {
        yield call(reviewApi.remove, reviewRemoveAsyncPayload.id);

        const findPayload: FindPayload = yield select((state: RootState) => state.reviews.reviewPageAsync.payload);
        const reviewPage: Page<ReviewResult> = yield put(actions.fetchReviewPage(findPayload));

        yield put(actions.setReviewsState({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: undefined
        }));
        reviewRemoveAsyncPayload.onSuccess && reviewRemoveAsyncPayload.onSuccess();
    } catch (error) {
        reviewRemoveAsyncPayload.onFailure && reviewRemoveAsyncPayload.onFailure(error);
    }
};

export default function* reviewsSaga() {
    yield takeEvery(types.FETCH_REVIEW_PAGE, findReviewPageSaga);
    yield takeEvery(types.UPDATE_REVIEW_ASYNC, updateReviewAsyncSaga);
    yield takeEvery(types.SAVE_REVIEW_ASYNC, saveReviewAsyncSaga);
    yield takeEvery(types.REMOVE_REVIEW_ASYNC, removeReviewAsyncSaga);
}