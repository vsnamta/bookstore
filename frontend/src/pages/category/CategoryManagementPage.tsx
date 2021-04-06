import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryManagementTemplate from '../../components/category/CategoryManagementTemplate';
import { RootState } from '../../store';
import { CategoryRemoveActionPayload, CategorySaveActionPayload, CategoryUpdateActionPayload, createFindCategoryAction, createFindCategoryListAction, createRemoveCategoryRequestAction, createSaveCategoryRequestAction, createUpdateCategoryRequestAction } from '../../store/category/action';

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
        dispatch(createSaveCategoryRequestAction(payload));
    }, []);

    const updateCategory = useCallback((payload: CategoryUpdateActionPayload) => {
        dispatch(createUpdateCategoryRequestAction(payload));
    }, []);

    const removeCategory = useCallback((payload: CategoryRemoveActionPayload) => {
        dispatch(createRemoveCategoryRequestAction(payload));
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