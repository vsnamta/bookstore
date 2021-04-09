import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { FindPayload, Page } from '../../models/common';
import { ReviewResult } from '../../models/review';
import { ReviewRemoveAsyncPayload, ReviewSaveAsyncPayload, ReviewsState, ReviewUpdateAsyncPayload } from '../../models/review/store';

export const types ={
    FETCH_REVIEW_PAGE: 'review/FETCH_REVIEW_PAGE' as const,
    SET_REVIEWS_STATE: 'review/SET_REVIEWS_STATE' as const,
    SELECT_REVIEW: 'review/SELECT_REVIEW' as const,
    UPDATE_REVIEW_ASYNC: 'review/UPDATE_REVIEW_ASYNC' as const,
    UPDATE_REVIEW: 'review/UPDATE_REVIEW' as const,
    REMOVE_REVIEW_ASYNC: 'review/REMOVE_REVIEW_ASYNC' as const,
    SAVE_REVIEW_ASYNC: 'review/SAVE_REVIEW_ASYNC' as const
};

export const actions = {
    fetchReviewPage: createAction(types.FETCH_REVIEW_PAGE)<FindPayload>(), 
    setReviewsState: createAction(types.SET_REVIEWS_STATE)<ReviewsState>(),
    selectReview: createAction(types.SELECT_REVIEW)<number>(),
    updateReviewAsync: createAction(types.UPDATE_REVIEW_ASYNC)<ReviewUpdateAsyncPayload>(), 
    updateReview: createAction(types.UPDATE_REVIEW)<ReviewResult>(),
    removeReviewAsync: createAction(types.REMOVE_REVIEW_ASYNC)<ReviewRemoveAsyncPayload>(),
    saveReviewAsync: createAction(types.SAVE_REVIEW_ASYNC)<ReviewSaveAsyncPayload>() 
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
    [types.SET_REVIEWS_STATE]: (state, { payload: reviewsState }: ReturnType<typeof actions.setReviewsState>) => (
        reviewsState
    ),
    [types.SELECT_REVIEW]: (state, { payload: id }: ReturnType<typeof actions.selectReview>) => ({
        ...state,
        review: (state.asyncReviewPage.result as Page<ReviewResult>).list
            .find(review => review.id === id)
    }),
    [types.UPDATE_REVIEW]: (state, { payload: updatedReview }: ReturnType<typeof actions.updateReview>) => ({
        asyncReviewPage: {
            ...state.asyncReviewPage,
            result: {
                ...state.asyncReviewPage.result as Page<ReviewResult>,
                list: (state.asyncReviewPage.result as Page<ReviewResult>).list
                    .map(review => 
                        review.id === updatedReview.id
                            ? updatedReview 
                            : review
                    )
            }
        },
        review: updatedReview
    })
});

export default reducer;