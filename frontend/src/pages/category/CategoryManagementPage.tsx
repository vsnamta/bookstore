import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryManagementTemplate from '../../components/category/CategoryManagementTemplate';
import { RootState } from '../../store';
import { CategoryRemoveRequestActionPayload, CategorySaveRequestActionPayload, CategoryUpdateRequestActionPayload, createCategoryFindAction, createCategoryListFindAction, createCategoryRemoveRequestAction, createCategorySaveRequestAction, createCategoryUpdateRequestAction } from '../../store/category/action';

function CategoryManagementPage() {
    const dispatch = useDispatch();
    const { categoryListAsync, category } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(createCategoryListFindAction());
    }, []);

    const selectCategory = useCallback((id: number) => {
        dispatch(createCategoryFindAction(id));
    }, []);

    const saveCategory = useCallback((payload: CategorySaveRequestActionPayload) => {
        dispatch(createCategorySaveRequestAction(payload));
    }, []);

    const updateCategory = useCallback((payload: CategoryUpdateRequestActionPayload) => {
        dispatch(createCategoryUpdateRequestAction(payload));
    }, []);

    const removeCategory = useCallback((payload: CategoryRemoveRequestActionPayload) => {
        dispatch(createCategoryRemoveRequestAction(payload));
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