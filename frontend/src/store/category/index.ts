import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { CategoryResult } from '../../models/category';
import { CategoriesState, CategoryRemoveAsyncPayload, CategorySaveAsyncPayload, CategoryUpdateAsyncPayload } from '../../models/category/store';

export const types = {
    FETCH_CATEGORY_LIST: 'category/FETCH_CATEGORY_LIST' as const,
    SET_CATEGORIES_STATE: 'category/SET_CATEGORIES_STATE' as const,
    SELECT_CATEGORY: 'category/SELECT_CATEGORY' as const,
    UPDATE_CATEGORY_ASYNC: 'category/UPDATE_CATEGORY_ASYNC' as const,
    UPDATE_CATEGORY: 'category/UPDATE_CATEGORY' as const,
    REMOVE_CATEGORY_ASYNC: 'category/REMOVE_CATEGORY_ASYNC' as const,
    REMOVE_CATEGORY: 'category/REMOVE_CATEGORY' as const,
    SAVE_CATEGORY_ASYNC: 'category/SAVE_CATEGORY_ASYNC' as const,
    SAVE_CATEGORY: 'category/SAVE_CATEGORY' as const
};

export const actions = { 
    fetchCategoryList: createAction(types.FETCH_CATEGORY_LIST)<undefined>(), 
    setCategoriesState: createAction(types.SET_CATEGORIES_STATE)<CategoriesState>(),
    selectCategory: createAction(types.SELECT_CATEGORY)<number>(),
    updateCategoryAsync: createAction(types.UPDATE_CATEGORY_ASYNC)<CategoryUpdateAsyncPayload>(), 
    updateCategory: createAction(types.UPDATE_CATEGORY)<CategoryResult>(), 
    removeCategoryAsync: createAction(types.REMOVE_CATEGORY_ASYNC)<CategoryRemoveAsyncPayload>(), 
    removeCategory: createAction(types.REMOVE_CATEGORY)<number>(),
    saveCategoryAsync: createAction(types.SAVE_CATEGORY_ASYNC)<CategorySaveAsyncPayload>(), 
    saveCategory: createAction(types.SAVE_CATEGORY)<CategoryResult>()
};

const initialState: CategoriesState = {
    asyncCategoryList: {
        result: undefined,
        error: undefined
    },
    category: undefined
};

const reducer = createReducer<CategoriesState, ActionType<typeof actions>>(initialState, {
    [types.SET_CATEGORIES_STATE]: (state, { payload: categoriesState }: ReturnType<typeof actions.setCategoriesState>) => (
        categoriesState
    ),
    [types.SELECT_CATEGORY]: (state, { payload: id }: ReturnType<typeof actions.selectCategory>) => ({
        ...state,
        category: state.asyncCategoryList.result?.flatMap(category => 
                [category, ...category.children]
            )
            .find(category => category.id === id)
    }),
    [types.UPDATE_CATEGORY]: (state, { payload: updatedCategory }: ReturnType<typeof actions.updateCategory>) => ({
        asyncCategoryList: {
            // ...state.asyncCategoryList,
            result: !updatedCategory.parentId 
                ? state.asyncCategoryList.result?.map(category => 
                    category.id === updatedCategory.id 
                        ? updatedCategory 
                        : category
                )
                : state.asyncCategoryList.result?.map(category => 
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
                )
        },
        category: updatedCategory
    }),
    [types.REMOVE_CATEGORY]: (state, { payload: removedId }: ReturnType<typeof actions.removeCategory>) => {
        const categoryList = state.asyncCategoryList.result;

        if(categoryList === undefined) {
            return state;
        }

        const removedCategory = categoryList
            .flatMap(category => [category, ...category.children])
            .find(category => category.id === removedId) as CategoryResult;

        return {
            asyncCategoryList: {
                // ...state.asyncCategoryList,
                result: !removedCategory.parentId 
                    ? categoryList.filter(category => category.id !== removedCategory.id)
                    : categoryList.map(category => 
                        category.id === removedCategory.parentId
                            ? {
                                ...category,
                                children: category.children.filter(subCategory => subCategory.id !== removedCategory.id)
                            } 
                            : category
                    )
            },
            category: undefined
        }
    },
    [types.SAVE_CATEGORY]: (state, { payload: savedCategory }: ReturnType<typeof actions.saveCategory>) => ({
        asyncCategoryList: {
            // ...state.asyncCategoryList,
            result: !savedCategory.parentId 
                ? state.asyncCategoryList.result?.concat(savedCategory)
                : state.asyncCategoryList.result?.map(category => 
                    category.id === savedCategory.parentId 
                        ? {
                            ...category,
                            children: category.children.concat(savedCategory)
                        } 
                        : category
                )
        },
        category: savedCategory
    })
});

export default reducer;