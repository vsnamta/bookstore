import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryManagement from '../../components/category/CategoryManagement';
import { CategoryRemoveAsyncPayload, CategorySaveAsyncPayload, CategoryUpdateAsyncPayload } from '../../models/category/store';
import { rootActions, RootState } from '../../store';

function CategoryManagementContainer() {
    const dispatch = useDispatch();
    const { asyncCategoryList, category } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(rootActions.fetchCategoryList());
    }, []);

    const selectCategory = useCallback((id: number) => {
        dispatch(rootActions.selectCategory(id));
    }, []);

    const saveCategory = useCallback((payload: CategorySaveAsyncPayload) => {
        dispatch(rootActions.saveCategoryAsync(payload));
    }, []);

    const updateCategory = useCallback((payload: CategoryUpdateAsyncPayload) => {
        dispatch(rootActions.updateCategoryAsync(payload));
    }, []);

    const removeCategory = useCallback((payload: CategoryRemoveAsyncPayload) => {
        dispatch(rootActions.removeCategoryAsync(payload));
    }, []);
    
    return (
        <CategoryManagement 
            asyncCategoryList={asyncCategoryList}
            category={category}
            selectCategory={selectCategory}
            removeCategory={removeCategory}
            updateCategory={updateCategory}
            saveCategory={saveCategory}
        />
    )
};

export default CategoryManagementContainer;