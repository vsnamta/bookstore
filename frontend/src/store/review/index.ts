import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { FindPayload } from '../../models/common';
import { ReviewResult } from '../../models/review';
import { AsyncReviewPage, ReviewRemoveAsyncPayload, ReviewSaveAsyncPayload, ReviewsState, ReviewUpdateAsyncPayload } from '../../models/review/store';

export const types = {
    FETCH_REVIEW_PAGE: 'review/FETCH_REVIEW_PAGE' as const,
    SET_ASYNC_REVIEW_PAGE: 'review/SET_ASYNC_REVIEW_PAGE' as const,
    SELECT_REVIEW: 'review/SELECT_REVIEW' as const,
    UPDATE_REVIEW_ASYNC: 'review/UPDATE_REVIEW_ASYNC' as const,
    UPDATE_REVIEW: 'review/UPDATE_REVIEW' as const,
    REMOVE_REVIEW_ASYNC: 'review/REMOVE_REVIEW_ASYNC' as const,
    REMOVE_REVIEW: 'review/REMOVE_REVIEW' as const,
    SAVE_REVIEW_ASYNC: 'review/SAVE_REVIEW_ASYNC' as const,
    SAVE_REVIEW: 'review/SAVE_REVIEW' as const
};

export const actions = {
    fetchReviewPage: createAction(types.FETCH_REVIEW_PAGE)<FindPayload>(), 
    setAsyncReviewPage: createAction(types.SET_ASYNC_REVIEW_PAGE)<AsyncReviewPage>(),
    selectReview: createAction(types.SELECT_REVIEW)<number>(),
    updateReviewAsync: createAction(types.UPDATE_REVIEW_ASYNC)<ReviewUpdateAsyncPayload>(), 
    updateReview: createAction(types.UPDATE_REVIEW)<ReviewResult>(),
    removeReviewAsync: createAction(types.REMOVE_REVIEW_ASYNC)<ReviewRemoveAsyncPayload>(),
    removeReview: createAction(types.REMOVE_REVIEW)<number>(),
    saveReviewAsync: createAction(types.SAVE_REVIEW_ASYNC)<ReviewSaveAsyncPayload>(),
    saveReview: createAction(types.SAVE_REVIEW)<ReviewResult>()  
};

const initialState: ReviewsState = {
    asyncReviewPage: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    review: undefined
};

const reducer = createReducer<ReviewsState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_REVIEW_PAGE]: (state, { payload: asyncReviewPage }: ReturnType<typeof actions.setAsyncReviewPage>) => ({
        asyncReviewPage: asyncReviewPage,
        review: undefined
    }),
    [types.SELECT_REVIEW]: (state, { payload: id }: ReturnType<typeof actions.selectReview>) => ({
        ...state,
        review: state.asyncReviewPage.result?.list.find(review => review.id === id)
    }),
    [types.UPDATE_REVIEW]: (state, { payload: updatedReview }: ReturnType<typeof actions.updateReview>) => ({
        asyncReviewPage: {
            ...state.asyncReviewPage,
            result: state.asyncReviewPage.result
                ? {
                    ...state.asyncReviewPage.result,
                    list: state.asyncReviewPage.result.list.map(review => 
                        review.id === updatedReview.id
                            ? updatedReview 
                            : review
                    )
                }
                : undefined
        },
        review: updatedReview
    }),
    [types.REMOVE_REVIEW]: (state, { payload: removedId }: ReturnType<typeof actions.removeReview>) => ({
        asyncReviewPage: {
            ...state.asyncReviewPage,
            // result: {
            //     list: state.asyncReviewPage.result?.list.filter(review => review.id !== removedId),
            //     totalCount: state.asyncReviewPage.result?.totalCount - 1
            // }
        },
        review: undefined
    }),
    [types.SAVE_REVIEW]: (state, { payload: savedReview }: ReturnType<typeof actions.saveReview>) => ({
        ...state,
        // asyncReviewPage: {
        //     ...state.asyncReviewPage,
        //     result: {
        //         list: [savedReview, ...(state.asyncReviewPage.result?.list as ReviewResult[]).slice(0, 9)],
        //         totalCount: state.asyncReviewPage.result?.totalCount + 1
        //     }
        // },
        review: savedReview
    })
});

export default reducer;