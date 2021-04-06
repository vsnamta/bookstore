import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { PointHistoryFindPayload, PointHistoryResult } from '../../models/pointHistories';
import { findPointHistoryPageAsyncActionCreator, PointHistoriesAction } from './action';
import { FIND_POINT_HISTORY_PAGE_FAILURE, FIND_POINT_HISTORY_PAGE_REQUEST, FIND_POINT_HISTORY_PAGE_SUCCESS } from './actionType';

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
    [FIND_POINT_HISTORY_PAGE_REQUEST]: (state, { payload: pointHistoryFindPayload }: ReturnType<typeof findPointHistoryPageAsyncActionCreator.request>) => ({
        ...state,
        pointHistoryPageAsync: {
            payload: pointHistoryFindPayload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_POINT_HISTORY_PAGE_SUCCESS]: (state, { payload: pointHistoryPage }: ReturnType<typeof findPointHistoryPageAsyncActionCreator.success>) => ({
        ...state,
        pointHistoryPageAsync: {
            ...state.pointHistoryPageAsync,
            result: pointHistoryPage
        } 
    }),
    [FIND_POINT_HISTORY_PAGE_FAILURE]: (state, { payload: error }: ReturnType<typeof findPointHistoryPageAsyncActionCreator.failure>) => ({
        ...state,
        pointHistoryPageAsync: {
            ...state.pointHistoryPageAsync,
            error: error
        } 
    })
});