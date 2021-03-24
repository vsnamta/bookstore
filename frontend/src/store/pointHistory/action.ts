import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { PointHistoryFindPayload, PointHistoryResult } from '../../models/pointHistories';
import { FIND_POINT_HISTORY_PAGE, FIND_POINT_HISTORY_PAGE_FAILURE, FIND_POINT_HISTORY_PAGE_REQUEST, FIND_POINT_HISTORY_PAGE_SUCCESS } from './actionType';

export const createFindPointHistoryPageAction = createAction(FIND_POINT_HISTORY_PAGE)<PointHistoryFindPayload>();
export const findPointHistoryPageAsyncActionCreator = createAsyncAction(FIND_POINT_HISTORY_PAGE_REQUEST, FIND_POINT_HISTORY_PAGE_SUCCESS, FIND_POINT_HISTORY_PAGE_FAILURE)<PointHistoryFindPayload, Page<PointHistoryResult>, ApiError>();

export const actions = {
    createFindPointHistoryPageAction, findPointHistoryPageAsyncActionCreator
};

export type PointHistoriesAction = ActionType<typeof actions>;