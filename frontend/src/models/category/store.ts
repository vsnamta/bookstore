import { CategoryResult, CategorySaveOrUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";

export interface CategoriesState {
    categoryListAsync: CategoryListAsync;
    category?: CategoryResult;
}

export interface CategoryListAsync {
    result?: CategoryResult[];
    error?: ApiError;
}

export interface CategoryUpdateAsyncPayload { 
    id: number, 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CategoryRemoveAsyncPayload { 
    id: number,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export interface CategorySaveAsyncPayload { 
    payload: CategorySaveOrUpdatePayload,
    onSuccess?: (category: CategoryResult) => void, 
    onFailure?: (error: ApiError) => void
}