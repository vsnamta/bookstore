import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../../models/categories';
import { FIND_CATEGORY, FIND_CATEGORY_LIST, FIND_CATEGORY_LIST_FAILURE, FIND_CATEGORY_LIST_REQUEST, FIND_CATEGORY_LIST_SUCCESS, REMOVE_CATEGORY, REMOVE_CATEGORY_SUCCESS, SAVE_CATEGORY, SAVE_CATEGORY_SUCCESS, UPDATE_CATEGORY, UPDATE_CATEGORY_SUCCESS } from './actionType';

export const findCategoryList = createAction(FIND_CATEGORY_LIST)<void>();

export const findCategoryListAsync = createAsyncAction(
    FIND_CATEGORY_LIST_REQUEST,
    FIND_CATEGORY_LIST_SUCCESS,
    FIND_CATEGORY_LIST_FAILURE
)<void, CategoryResult[], ApiError>();

export const findCategory = createAction(FIND_CATEGORY)<number>();

export const updateCategory = createAction(UPDATE_CATEGORY)<{ 
    id: number, 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const updateCategorySuccess = createAction(UPDATE_CATEGORY_SUCCESS)<CategoryResult>();

export const saveCategory = createAction(SAVE_CATEGORY)<{ 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const saveCategorySuccess = createAction(SAVE_CATEGORY_SUCCESS)<CategoryResult>();

export const removeCategory = createAction(REMOVE_CATEGORY)<{
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}>();

export const removeCategorySuccess = createAction(REMOVE_CATEGORY_SUCCESS)<number>();

export const actions = { 
    findCategoryList, findCategoryListAsync,
    findCategory,
    updateCategory, updateCategorySuccess, 
    saveCategory, saveCategorySuccess,
    removeCategory, removeCategorySuccess
};

export type CategoriesAction = ActionType<typeof actions>;