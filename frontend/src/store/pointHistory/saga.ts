import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import PointHistoryApi from '../../apis/pointHistoryApi';
import { Page } from '../../models/common';
import { PointHistoryResult } from '../../models/pointHistory';
import { PointHistoriesState } from '../../models/pointHistory/store';

function* fetchPointHistoryPageSaga({ payload: pointHistoryFindPayload }: ReturnType<typeof actions.fetchPointHistoryPage>) {
    const pointHistoriesState: PointHistoriesState = yield select((state: RootState) => state.pointHistories);
    
    if(JSON.stringify(pointHistoriesState.pointHistoryPageAsync.payload) === JSON.stringify(pointHistoryFindPayload) 
        && pointHistoriesState.pointHistoryPageAsync.result !== undefined) {
        return;
    }

    try {
        const pointHistoryPage: Page<PointHistoryResult> = yield call(PointHistoryApi.findAll, pointHistoryFindPayload);

        yield put(actions.setPointHistoryPageAsync({
            payload: pointHistoryFindPayload,
            result: pointHistoryPage,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setPointHistoryPageAsync({
            payload: pointHistoryFindPayload,
            result: undefined,
            error: error
        }));
    }
};

export default function* pointHistoriesSaga() {
    yield takeEvery(types.FETCH_POINT_HISTORY_PAGE, fetchPointHistoryPageSaga);
}