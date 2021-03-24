import { call, put, takeEvery } from 'redux-saga/effects';
import PointHistoryApi from '../../apis/pointHistoryApi';
import { Page } from '../../models/common';
import { PointHistoryResult } from '../../models/pointHistories';
import { createFindPointHistoryPageAction, findPointHistoryPageAsyncActionCreator } from './action';
import { FIND_POINT_HISTORY_PAGE } from './actionType';

function* findPointHistoryPageSaga(action: ReturnType<typeof createFindPointHistoryPageAction>) {
    yield put(findPointHistoryPageAsyncActionCreator.request(action.payload));

    try {
        const pointHistoryPage: Page<PointHistoryResult> = yield call(PointHistoryApi.findAll, action.payload);

        yield put(findPointHistoryPageAsyncActionCreator.success(pointHistoryPage));
    } catch (error) {
        yield put(findPointHistoryPageAsyncActionCreator.failure(error));
    }
};

export default function* pointHistoriesSaga() {
    yield takeEvery(FIND_POINT_HISTORY_PAGE, findPointHistoryPageSaga);
}