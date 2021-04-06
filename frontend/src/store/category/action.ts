import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../../models/categories';
import { FIND_CATEGORY, FIND_CATEGORY_LIST, REMOVE_CATEGORY, REMOVE_CATEGORY_REQUEST, SAVE_CATEGORY, SAVE_CATEGORY_REQUEST, SET_CATEGORY_LIST_ASYNC, UPDATE_CATEGORY, UPDATE_CATEGORY_REQUEST } from './actionType';
import { CategoryListAsync } from './reducer';

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
export const createSetCategoryListAsyncAction = createAction(SET_CATEGORY_LIST_ASYNC)<CategoryListAsync>();

export const createFindCategoryAction = createAction(FIND_CATEGORY)<number>();

export const createUpdateCategoryRequestAction = createAction(UPDATE_CATEGORY_REQUEST)<CategoryUpdateActionPayload>();
export const createUpdateCategoryAction = createAction(UPDATE_CATEGORY)<CategoryResult>();

export const createSaveCategoryRequestAction = createAction(SAVE_CATEGORY_REQUEST)<CategorySaveActionPayload>();
export const createSaveCategoryAction = createAction(SAVE_CATEGORY)<CategoryResult>();

export const createRemoveCategoryRequestAction = createAction(REMOVE_CATEGORY_REQUEST)<CategoryRemoveActionPayload>();
export const createRemoveCategoryAction = createAction(REMOVE_CATEGORY)<number>();

export const actions = { 
    createFindCategoryListAction, createSetCategoryListAsyncAction,
    createFindCategoryAction,
    createUpdateCategoryRequestAction, createUpdateCategoryAction, 
    createSaveCategoryRequestAction, createSaveCategoryAction,
    createRemoveCategoryRequestAction, createRemoveCategoryAction
};

export type CategoriesAction = ActionType<typeof actions>;