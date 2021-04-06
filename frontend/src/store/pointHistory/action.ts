import { ActionType, createAction } from 'typesafe-actions';
import { PointHistoryFindPayload } from '../../models/pointHistories';
import { FIND_POINT_HISTORY_PAGE, SET_POINT_HISTORY_PAGE_ASYNC } from './actionType';
import { PointHistoryPageAsync } from './reducer';

export const createPointHistoryPageFindAction = createAction(FIND_POINT_HISTORY_PAGE)<PointHistoryFindPayload>();
export const createPointHistoryPageAsyncSetAction = createAction(SET_POINT_HISTORY_PAGE_ASYNC)<PointHistoryPageAsync>();

export const actions = {
    createPointHistoryPageFindAction, createPointHistoryPageAsyncSetAction
};

export type PointHistoriesAction = ActionType<typeof actions>;