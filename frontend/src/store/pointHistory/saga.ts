import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import PointHistoryApi from '../../apis/pointHistoryApi';
import { Page } from '../../models/common';
import { PointHistoryResult } from '../../models/pointHistories';
import { createFindPointHistoryPageAction, findPointHistoryPageAsyncActionCreator } from './action';
import { FIND_POINT_HISTORY_PAGE } from './actionType';
import { PointHistoriesState } from './reducer';

function* findPointHistoryPageSaga({ payload: pointHistoryFindPayload }: ReturnType<typeof createFindPointHistoryPageAction>) {
    const pointHistoriesState: PointHistoriesState = yield select((state: RootState) => state.pointHistories);
    
    if(JSON.stringify(pointHistoriesState.pointHistoryPageAsync.payload) === JSON.stringify(pointHistoryFindPayload) 
        && pointHistoriesState.pointHistoryPageAsync.result !== undefined) {
        return;
    }
    
    yield put(findPointHistoryPageAsyncActionCreator.request(pointHistoryFindPayload));

    try {
        const pointHistoryPage: Page<PointHistoryResult> = yield call(PointHistoryApi.findAll, pointHistoryFindPayload);

        yield put(findPointHistoryPageAsyncActionCreator.success(pointHistoryPage));
    } catch (error) {
        yield put(findPointHistoryPageAsyncActionCreator.failure(error));
    }
};

export default function* pointHistoriesSaga() {
    yield takeEvery(FIND_POINT_HISTORY_PAGE, findPointHistoryPageSaga);
}