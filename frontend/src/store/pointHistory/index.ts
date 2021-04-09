import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { PointHistoryFindPayload } from '../../models/pointHistory';
import { PointHistoriesState, AsyncPointHistoryPage } from '../../models/pointHistory/store';

export const types = {
    FETCH_POINT_HISTORY_PAGE: 'pointHistory/FETCH_POINT_HISTORY_PAGE' as const,
    SET_ASYNC_POINT_HISTORY_PAGE: 'pointHistory/SET_ASYNC_POINT_HISTORY_PAGE' as const
};

export const actions = {
    fetchPointHistoryPage: createAction(types.FETCH_POINT_HISTORY_PAGE)<PointHistoryFindPayload>(), 
    setAsyncPointHistoryPage: createAction(types.SET_ASYNC_POINT_HISTORY_PAGE)<AsyncPointHistoryPage>()
};

const initialState: PointHistoriesState = {
    asyncPointHistoryPage: {
        payload : undefined,
        result: undefined,
        error: undefined
    }
};

const reducer = createReducer<PointHistoriesState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_POINT_HISTORY_PAGE]: (state, { payload: asyncPointHistoryPage }: ReturnType<typeof actions.setAsyncPointHistoryPage>) => ({
        asyncPointHistoryPage: asyncPointHistoryPage
    }),
});

export default reducer;