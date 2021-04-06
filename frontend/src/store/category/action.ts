import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../../models/categories';
import { FIND_CATEGORY, FIND_CATEGORY_LIST, REMOVE_CATEGORY, REMOVE_CATEGORY_REQUEST, SAVE_CATEGORY, SAVE_CATEGORY_REQUEST, SET_CATEGORY_LIST_ASYNC, UPDATE_CATEGORY, UPDATE_CATEGORY_REQUEST } from './actionType';
import { CategoryListAsync } from './reducer';

export interface CategoryUpdateRequestActionPayload { 
    id: number, 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CategorySaveRequestActionPayload { 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CategoryRemoveRequestActionPayload { 
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export const createCategoryListFindAction = createAction(FIND_CATEGORY_LIST)<void>();
export const createCategoryListAsyncSetAction = createAction(SET_CATEGORY_LIST_ASYNC)<CategoryListAsync>();

export const createCategoryFindAction = createAction(FIND_CATEGORY)<number>();

export const createCategoryUpdateRequestAction = createAction(UPDATE_CATEGORY_REQUEST)<CategoryUpdateRequestActionPayload>();
export const createCategoryUpdateAction = createAction(UPDATE_CATEGORY)<CategoryResult>();

export const createCategorySaveRequestAction = createAction(SAVE_CATEGORY_REQUEST)<CategorySaveRequestActionPayload>();
export const createCategorySaveAction = createAction(SAVE_CATEGORY)<CategoryResult>();

export const createCategoryRemoveRequestAction = createAction(REMOVE_CATEGORY_REQUEST)<CategoryRemoveRequestActionPayload>();
export const createCategoryRemoveAction = createAction(REMOVE_CATEGORY)<number>();

export const actions = { 
    createCategoryListFindAction, createCategoryListAsyncSetAction,
    createCategoryFindAction,
    createCategoryUpdateRequestAction, createCategoryUpdateAction, 
    createCategorySaveRequestAction, createCategorySaveAction,
    createCategoryRemoveRequestAction, createCategoryRemoveAction
};

export type CategoriesAction = ActionType<typeof actions>;