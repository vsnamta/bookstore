import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import PointHistoryApi from '../../apis/pointHistoryApi';
import { Page } from '../../models/common';
import { PointHistoryResult } from '../../models/pointHistory';
import { AsyncPointHistoryPage } from '../../models/pointHistory/store';

function* fetchPointHistoryPageSaga({ payload: pointHistoryFindPayload }: ReturnType<typeof actions.fetchPointHistoryPage>) {
    const asyncPointHistoryPage: AsyncPointHistoryPage = yield select((state: RootState) => state.pointHistories.asyncPointHistoryPage);
    
    if(asyncPointHistoryPage.result !== undefined 
        && JSON.stringify(asyncPointHistoryPage.payload) === JSON.stringify(pointHistoryFindPayload)) {
        return;
    }

    try {
        const pointHistoryPage: Page<PointHistoryResult> = yield call(PointHistoryApi.findAll, pointHistoryFindPayload);

        yield put(actions.setAsyncPointHistoryPage({
            payload: pointHistoryFindPayload,
            result: pointHistoryPage,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncPointHistoryPage({
            payload: pointHistoryFindPayload,
            result: undefined,
            error: error
        }));
    }
};

export default function* pointHistoriesSaga() {
    yield takeEvery(types.FETCH_POINT_HISTORY_PAGE, fetchPointHistoryPageSaga);
}