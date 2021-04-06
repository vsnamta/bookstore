import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import PointHistoryApi from '../../apis/pointHistoryApi';
import { Page } from '../../models/common';
import { PointHistoryResult } from '../../models/pointHistories';
import { createPointHistoryPageFindAction, createPointHistoryPageAsyncSetAction } from './action';
import { FIND_POINT_HISTORY_PAGE } from './actionType';
import { PointHistoriesState } from './reducer';

function* findPointHistoryPageSaga({ payload: pointHistoryFindPayload }: ReturnType<typeof createPointHistoryPageFindAction>) {
    const pointHistoriesState: PointHistoriesState = yield select((state: RootState) => state.pointHistories);
    
    if(JSON.stringify(pointHistoriesState.pointHistoryPageAsync.payload) === JSON.stringify(pointHistoryFindPayload) 
        && pointHistoriesState.pointHistoryPageAsync.result !== undefined) {
        return;
    }

    try {
        const pointHistoryPage: Page<PointHistoryResult> = yield call(PointHistoryApi.findAll, pointHistoryFindPayload);

        yield put(createPointHistoryPageAsyncSetAction({
            payload: pointHistoryFindPayload,
            result: pointHistoryPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createPointHistoryPageAsyncSetAction({
            payload: pointHistoryFindPayload,
            result: undefined,
            error: error
        }));
    }
};

export default function* pointHistoriesSaga() {
    yield takeEvery(FIND_POINT_HISTORY_PAGE, findPointHistoryPageSaga);
}