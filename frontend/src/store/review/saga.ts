import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import reviewApi from '../../apis/reviewApi';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/review';
import { AsyncReviewPage } from '../../models/review/store';

function* fetchReviewPageSaga({ payload: findPayload }: ReturnType<typeof actions.fetchReviewPage>) {
    const asyncReviewPage: AsyncReviewPage = yield select((state: RootState) => state.reviews.asyncReviewPage);
    
    if(asyncReviewPage.result !== undefined 
        && JSON.stringify(asyncReviewPage.payload) === JSON.stringify(findPayload)) {
        return;
    }

    try {
        const reviewPage: Page<ReviewResult> = yield call(reviewApi.findAll, findPayload);

        yield put(actions.setAsyncReviewPage({
            payload: findPayload,
            result: reviewPage,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncReviewPage({
            payload: findPayload,
            result: undefined,
            error: error
    }));
    }
};

function* updateReviewAsyncSaga({ payload: reviewUpdateAsyncPayload }: ReturnType<typeof actions.updateReviewAsync>) {
    try {
        const review: ReviewResult = yield call(reviewApi.update, reviewUpdateAsyncPayload.id, reviewUpdateAsyncPayload.payload);

        yield put(actions.updateReview(review));
        reviewUpdateAsyncPayload.onSuccess?.(review);
    } catch (error) {
        reviewUpdateAsyncPayload.onFailure?.(error);
    }
};

function* removeReviewAsyncSaga({ payload: reviewRemoveAsyncPayload }: ReturnType<typeof actions.removeReviewAsync>) {
    try {
        yield call(reviewApi.remove, reviewRemoveAsyncPayload.id);

        const findPayload: FindPayload = yield select((state: RootState) => state.reviews.asyncReviewPage.payload);
        const { page, size } = findPayload.pageCriteria;
        const reviewPage: Page<ReviewResult> = yield select((state: RootState) => state.reviews.asyncReviewPage.result);

        if(page === Math.ceil(reviewPage.totalCount / size) && reviewPage.list.length > 1) {
            yield put(actions.removeReview(reviewRemoveAsyncPayload.id));
        } else {
            const reviewPage: Page<ReviewResult> = yield put(actions.fetchReviewPage(findPayload));

            yield put(actions.setAsyncReviewPage({
                payload: findPayload,
                result: reviewPage,
                error: undefined
            }));
        }

        reviewRemoveAsyncPayload.onSuccess?.();
    } catch (error) {
        reviewRemoveAsyncPayload.onFailure?.(error);
    }
};

function* saveReviewAsyncSaga({ payload: reviewSaveAsyncPayload }: ReturnType<typeof actions.saveReviewAsync>) {
    try {
        const review: ReviewResult = yield call(reviewApi.save, reviewSaveAsyncPayload.payload);

        const currentFindPayload: FindPayload = yield select((state: RootState) => state.reviews.asyncReviewPage.payload);

        const findPayload: FindPayload = {
            searchCriteria: { column: "productId", keyword: reviewSaveAsyncPayload.payload.productId + "" },
            pageCriteria: { page: 1, size: 10 }
        };

        if(JSON.stringify(currentFindPayload) === JSON.stringify(findPayload)) {
            yield put(actions.saveReview(review));
        } else {
            const reviewPage: Page<ReviewResult> = yield put(actions.fetchReviewPage(findPayload));

            yield put(actions.setAsyncReviewPage({
                payload: findPayload,
                result: reviewPage,
                error: undefined
            }));
        }

        reviewSaveAsyncPayload.onSuccess?.(review);
    } catch (error) {
        reviewSaveAsyncPayload.onFailure?.(error);
    }
};

export default function* reviewsSaga() {
    yield takeEvery(types.FETCH_REVIEW_PAGE, fetchReviewPageSaga);
    yield takeEvery(types.UPDATE_REVIEW_ASYNC, updateReviewAsyncSaga);
    yield takeEvery(types.REMOVE_REVIEW_ASYNC, removeReviewAsyncSaga);
    yield takeEvery(types.SAVE_REVIEW_ASYNC, saveReviewAsyncSaga);
}