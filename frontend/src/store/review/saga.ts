import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import reviewApi from '../../apis/reviewApi';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/reviews';
import { createFindReviewPageAction, createRemoveReviewAction, createRemoveReviewSuccessAction, createSaveReviewAction, createSaveReviewSuccessAction, createUpdateReviewAction, createUpdateReviewSuccessAction, findReviewPageAsyncActionCreator } from './action';
import { FIND_REVIEW_PAGE, REMOVE_REVIEW, SAVE_REVIEW, UPDATE_REVIEW } from './actionType';
import { ReviewsState } from './reducer';

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

        const findPayload: FindPayload = {
            searchCriteria: {
                column: "productId",
                keyword: action.payload.payload.productId + ""
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
        action.payload.onSuccess && action.payload.onSuccess(review);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* removeReviewSaga(action: ReturnType<typeof createRemoveReviewAction>) {
    const findPayload: FindPayload = yield select((state: RootState) => state.reviews.reviewPageAsync.payload);

    try {
        yield call(reviewApi.remove, action.payload.id);

        const reviewPage: Page<ReviewResult> = yield put(createFindReviewPageAction(findPayload));

        yield put(createRemoveReviewSuccessAction({
            reviewPageAsync: {
                payload: findPayload,
                result: reviewPage,
                error: undefined
            },
            review: undefined
        }));
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