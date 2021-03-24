import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../../models/categories';
import { FIND_CATEGORY, FIND_CATEGORY_LIST, FIND_CATEGORY_LIST_FAILURE, FIND_CATEGORY_LIST_REQUEST, FIND_CATEGORY_LIST_SUCCESS, REMOVE_CATEGORY, REMOVE_CATEGORY_SUCCESS, SAVE_CATEGORY, SAVE_CATEGORY_SUCCESS, UPDATE_CATEGORY, UPDATE_CATEGORY_SUCCESS } from './actionType';

export interface CategoryUpdateActionPayload { 
    id: number, 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CategorySaveActionPayload { 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CategoryRemoveActionPayload { 
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindCategoryListAction = createAction(FIND_CATEGORY_LIST)<void>();
export const findCategoryListAsyncActionCreator = createAsyncAction(FIND_CATEGORY_LIST_REQUEST, FIND_CATEGORY_LIST_SUCCESS, FIND_CATEGORY_LIST_FAILURE)<void, CategoryResult[], ApiError>();

export const createFindCategoryAction = createAction(FIND_CATEGORY)<number>();

export const createUpdateCategoryAction = createAction(UPDATE_CATEGORY)<CategoryUpdateActionPayload>();
export const createUpdateCategorySuccessAction = createAction(UPDATE_CATEGORY_SUCCESS)<CategoryResult>();

export const createSaveCategoryAction = createAction(SAVE_CATEGORY)<CategorySaveActionPayload>();
export const createSaveCategorySuccessAction = createAction(SAVE_CATEGORY_SUCCESS)<CategoryResult>();

export const createRemoveCategoryAction = createAction(REMOVE_CATEGORY)<CategoryRemoveActionPayload>();
export const createRemoveCategorySuccessAction = createAction(REMOVE_CATEGORY_SUCCESS)<number>();

export const actions = { 
    createFindCategoryListAction, findCategoryListAsyncActionCreator,
    createFindCategoryAction,
    createUpdateCategoryAction, createUpdateCategorySuccessAction, 
    createSaveCategoryAction, createSaveCategorySuccessAction,
    createRemoveCategoryAction, createRemoveCategorySuccessAction
};

export type CategoriesAction = ActionType<typeof actions>;