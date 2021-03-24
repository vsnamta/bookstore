import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CategoryRemoveActionPayload, CategorySaveActionPayload, CategoryUpdateActionPayload, createFindCategoryAction, createFindCategoryListAction, createRemoveCategoryAction, createSaveCategoryAction, createUpdateCategoryAction } from '../../store/category/action';
import CategoryManagementTemplate from '../../components/category/CategoryManagementTemplate';

function CategoryManagementPage() {
    const dispatch = useDispatch();
    const { categoryListAsync, category } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(createFindCategoryListAction());
    }, []);

    const selectCategory = useCallback((id: number) => {
        dispatch(createFindCategoryAction(id));
    }, []);

    const saveCategory = useCallback((payload: CategorySaveActionPayload) => {
        dispatch(createSaveCategoryAction(payload));
    }, []);

    const updateCategory = useCallback((payload: CategoryUpdateActionPayload) => {
        dispatch(createUpdateCategoryAction(payload));
    }, []);

    const removeCategory = useCallback((payload: CategoryRemoveActionPayload) => {
        dispatch(createRemoveCategoryAction(payload));
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