import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { PointHistoryFindPayload, PointHistoryResult } from '../../models/pointHistories';
import { FIND_POINT_HISTORY_PAGE, FIND_POINT_HISTORY_PAGE_FAILURE, FIND_POINT_HISTORY_PAGE_REQUEST, FIND_POINT_HISTORY_PAGE_SUCCESS } from './actionType';

export const findPointHistoryPage = createAction(FIND_POINT_HISTORY_PAGE)<PointHistoryFindPayload>();

export const findPointHistoryPageAsync = createAsyncAction(
    FIND_POINT_HISTORY_PAGE_REQUEST,
    FIND_POINT_HISTORY_PAGE_SUCCESS,
    FIND_POINT_HISTORY_PAGE_FAILURE
)<PointHistoryFindPayload, Page<PointHistoryResult>, ApiError>();

export const actions = {
    findPointHistoryPage, findPointHistoryPageAsync
};

export type PointHistoriesAction = ActionType<typeof actions>;