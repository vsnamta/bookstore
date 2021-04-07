import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { PointHistoryFindPayload } from '../../models/pointHistory';
import { PointHistoriesState, PointHistoryPageAsync } from '../../models/pointHistory/store';

export const types = {
    FETCH_POINT_HISTORY_PAGE: 'pointHistory/FETCH_POINT_HISTORY_PAGE' as const,
    SET_POINT_HISTORY_PAGE_ASYNC: 'pointHistory/SET_POINT_HISTORY_PAGE_ASYNC' as const
};

export const actions = {
    fetchPointHistoryPage: createAction(types.FETCH_POINT_HISTORY_PAGE)<PointHistoryFindPayload>(), 
    setPointHistoryPageAsync: createAction(types.SET_POINT_HISTORY_PAGE_ASYNC)<PointHistoryPageAsync>()
};

const initialState: PointHistoriesState = {
    pointHistoryPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    }
};

const reducer = createReducer<PointHistoriesState, ActionType<typeof actions>>(initialState, {
    [types.SET_POINT_HISTORY_PAGE_ASYNC]: (state, { payload: pointHistoryPageAsync }: ReturnType<typeof actions.setPointHistoryPageAsync>) => ({
        pointHistoryPageAsync: pointHistoryPageAsync
    }),
});

export default reducer;