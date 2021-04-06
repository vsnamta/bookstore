import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { PointHistoryFindPayload, PointHistoryResult } from '../../models/pointHistories';
import { createSetPointHistoryPageAsyncAction, PointHistoriesAction } from './action';
import { SET_POINT_HISTORY_PAGE_ASYNC } from './actionType';

export interface PointHistoryPageAsync {
    payload?: PointHistoryFindPayload;
    result?: Page<PointHistoryResult>;
    error?: ApiError; 
}

export interface PointHistoriesState {
    pointHistoryPageAsync: PointHistoryPageAsync;
}

const initialState: PointHistoriesState = {
    pointHistoryPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    }
};

export default createReducer<PointHistoriesState, PointHistoriesAction>(initialState, {
    [SET_POINT_HISTORY_PAGE_ASYNC]: (state, { payload: pointHistoryPageAsync }: ReturnType<typeof createSetPointHistoryPageAsyncAction>) => ({
        pointHistoryPageAsync: pointHistoryPageAsync
    }),
});