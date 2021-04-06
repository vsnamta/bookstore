import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CategoryResult } from '../../models/categories';
import { CategoriesAction, createRemoveCategorySuccessAction, createSaveCategorySuccessAction, createUpdateCategorySuccessAction } from './action';
import { FIND_CATEGORY, FIND_CATEGORY_LIST_FAILURE, FIND_CATEGORY_LIST_REQUEST, FIND_CATEGORY_LIST_SUCCESS, REMOVE_CATEGORY_SUCCESS, SAVE_CATEGORY_SUCCESS, UPDATE_CATEGORY_SUCCESS } from './actionType';

export interface CategoryListAsync {
    result?: CategoryResult[];
    error?: ApiError;
}

export interface CategoriesState {
    categoryListAsync: CategoryListAsync;
    category?: CategoryResult;
}

const initialState: CategoriesState = {
    categoryListAsync: {
        result: undefined,
        error: undefined
    },
    category: undefined
};

export default createReducer<CategoriesState, CategoriesAction>(initialState, {
    [FIND_CATEGORY_LIST_REQUEST]: (state, action) => ({
        ...state,
        categoryListAsync: {
            result: undefined,
            error: undefined
        }
    }),
    [FIND_CATEGORY_LIST_SUCCESS]: (state, action) => ({
        ...state,
        categoryListAsync: {
            ...state.categoryListAsync,
            result: action.payload
        } 
    }),
    [FIND_CATEGORY_LIST_FAILURE]: (state, action) => ({
        ...state,
        categoryListAsync: {
            ...state.categoryListAsync,
            error: action.payload
        } 
    }),
    [FIND_CATEGORY]: (state, action) => ({
        ...state,
        category: (state.categoryListAsync.result as CategoryResult[])
            .flatMap(category => [category, ...category.children])
            .find(category => category.id === action.payload)
    }),
    [UPDATE_CATEGORY_SUCCESS]: (state, { payload: updatedCategory }: ReturnType<typeof createUpdateCategorySuccessAction>) => ({
        categoryListAsync: {
            result: !updatedCategory.parentId 
                ? (state.categoryListAsync.result as CategoryResult[]).map(category => 
                    category.id === updatedCategory.id 
                        ? updatedCategory 
                        : category
                )
                : (state.categoryListAsync.result as CategoryResult[]).map(category => 
                    category.id === updatedCategory.parentId 
                        ? {
                            ...category,
                            children: category.children.map(subCategory => 
                                subCategory.id === updatedCategory.id 
                                    ? updatedCategory 
                                    : subCategory
                            )
                        } 
                        : category
                ),
            error: undefined
        },
        category: updatedCategory
    }),
    [SAVE_CATEGORY_SUCCESS]: (state, { payload: savedCategory }: ReturnType<typeof createSaveCategorySuccessAction>) => ({
        categoryListAsync: {
            result: !savedCategory.parentId 
                ? (state.categoryListAsync.result as CategoryResult[]).concat(savedCategory)
                : (state.categoryListAsync.result as CategoryResult[]).map(category => 
                    category.id === savedCategory.parentId 
                        ? {
                            ...category,
                            children: category.children.concat(savedCategory)
                        } 
                        : category
                ),
            error: undefined
        },
        category: savedCategory
    }),
    [REMOVE_CATEGORY_SUCCESS]: (state, { payload: removedId }: ReturnType<typeof createRemoveCategorySuccessAction>) => {
        const categoryList = state.categoryListAsync.result as CategoryResult[];

        //const removedId = action.payload;
        const removedCategory = categoryList
            .flatMap(category => [category, ...category.children])
            .find(category => category.id === removedId) as CategoryResult;

        return {
            categoryListAsync: {
                result: !removedCategory.parentId 
                    ? categoryList.filter(category => category.id !== removedCategory.id)
                    : categoryList.map(category => 
                        category.id === removedCategory.parentId
                            ? {
                                ...category,
                                children: category.children.filter(subCategory => subCategory.id !== removedCategory.id)
                            } 
                            : category
                    ),
                error: undefined
            },
            category: undefined
        }
    }
});