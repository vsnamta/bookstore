import { call, put, takeEvery } from 'redux-saga/effects';
import reviewApi from '../../apis/reviewApi';
import { Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { createFindReviewPageAction, createRemoveReviewAction, createRemoveReviewSuccessAction, createSaveReviewAction, createSaveReviewSuccessAction, createUpdateReviewAction, createUpdateReviewSuccessAction, findReviewPageAsyncActionCreator } from './action';
import { FIND_REVIEW_PAGE, REMOVE_REVIEW, SAVE_REVIEW, UPDATE_REVIEW } from './actionType';

function* findReviewPageSaga(action: ReturnType<typeof createFindReviewPageAction>) {
    yield put(findReviewPageAsyncActionCreator.request(action.payload));

    try {
        const reviewPage: Page<ReviewResult> = yield call(reviewApi.findAll, action.payload);

        yield put(findReviewPageAsyncActionCreator.success(reviewPage));
    } catch (error) {
        yield put(findReviewPageAsyncActionCreator.failure(error));
    }
};

function* updateReviewSaga(action: ReturnType<typeof createUpdateReviewAction>) {
    try {
        const review: ReviewResult = yield call(reviewApi.update, action.payload.id, action.payload.payload);

        yield put(createUpdateReviewSuccessAction(review));
        action.payload.onSuccess && action.payload.onSuccess(review);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveReviewSaga(action: ReturnType<typeof createSaveReviewAction>) {
    try {
        const review: ReviewResult = yield call(reviewApi.save, action.payload.payload);

        yield put(createSaveReviewSuccessAction(review));
        action.payload.onSuccess && action.payload.onSuccess(review);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* removeReviewSaga(action: ReturnType<typeof createRemoveReviewAction>) {
    try {
        yield call(reviewApi.remove, action.payload.id);

        yield put(createRemoveReviewSuccessAction(action.payload.id));
        action.payload.onSuccess && action.payload.onSuccess();
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* reviewsSaga() {
    yield takeEvery(FIND_REVIEW_PAGE, findReviewPageSaga);
    yield takeEvery(UPDATE_REVIEW, updateReviewSaga);
    yield takeEvery(SAVE_REVIEW, saveReviewSaga);
    yield takeEvery(REMOVE_REVIEW, removeReviewSaga);
}