import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CategoryResult } from '../../models/categories';
import { CategoriesAction, createFindCategoryAction, createRemoveCategoryAction, createSaveCategoryAction, createSetCategoryListAsyncAction, createUpdateCategoryAction } from './action';
import { FIND_CATEGORY, REMOVE_CATEGORY, SAVE_CATEGORY, SET_CATEGORY_LIST_ASYNC, UPDATE_CATEGORY } from './actionType';

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
    [SET_CATEGORY_LIST_ASYNC]: (state, { payload: categoryListAsync }: ReturnType<typeof createSetCategoryListAsyncAction>) => ({
        categoryListAsync: categoryListAsync,
        category: undefined
    }),
    [FIND_CATEGORY]: (state, { payload: id }: ReturnType<typeof createFindCategoryAction>) => ({
        ...state,
        category: (state.categoryListAsync.result as CategoryResult[])
            .flatMap(category => [category, ...category.children])
            .find(category => category.id === id)
    }),
    [UPDATE_CATEGORY]: (state, { payload: updatedCategory }: ReturnType<typeof createUpdateCategoryAction>) => ({
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
    [SAVE_CATEGORY]: (state, { payload: savedCategory }: ReturnType<typeof createSaveCategoryAction>) => ({
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
    [REMOVE_CATEGORY]: (state, { payload: removedId }: ReturnType<typeof createRemoveCategoryAction>) => {
        const categoryList = state.categoryListAsync.result as CategoryResult[];

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