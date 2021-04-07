import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryManagementTemplate from '../../components/category/CategoryManagementTemplate';
import { CategoryRemoveAsyncPayload, CategorySaveAsyncPayload, CategoryUpdateAsyncPayload } from '../../models/category/store';
import { RootState } from '../../store';
import { actions } from '../../store/category';

function CategoryManagementPage() {
    const dispatch = useDispatch();
    const { categoryListAsync, category } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(actions.fetchCategoryList());
    }, []);

    const selectCategory = useCallback((id: number) => {
        dispatch(actions.selectCategory(id));
    }, []);

    const saveCategory = useCallback((payload: CategorySaveAsyncPayload) => {
        dispatch(actions.saveCategoryAsync(payload));
    }, []);

    const updateCategory = useCallback((payload: CategoryUpdateAsyncPayload) => {
        dispatch(actions.updateCategoryAsync(payload));
    }, []);

    const removeCategory = useCallback((payload: CategoryRemoveAsyncPayload) => {
        dispatch(actions.removeCategoryAsync(payload));
    }, []);
    
    return (
        <CategoryManagementTemplate 
            categoryListAsync={categoryListAsync}
            category={category}
            selectCategory={selectCategory}
            removeCategory={removeCategory}
            updateCategory={updateCategory}
            saveCategory={saveCategory}
        />
    )
};

export default CategoryManagementPage;