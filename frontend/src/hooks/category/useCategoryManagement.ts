import { useCallback, useState } from "react";
import { CategoryResult, CategorySaveOrUpdatePayload } from "../../models/categories";
import categoryService from '../../services/categoryService';
import useCategoryList, { CategoryListState } from "./useCategoryList";

interface CategoryManagementState {
    categoryListState: CategoryListState;
    category?: CategoryResult;
}

interface UseCategoryManagementMethods {
    selectCategory: (id: number) => void;
    saveCategory: (payload: CategorySaveOrUpdatePayload) => Promise<void>;
    updateCategory: (id: number, payload: CategorySaveOrUpdatePayload) => Promise<void>;
    removeCategory: (id: number) => Promise<void>
}

function useCategoryManagement(): [
    CategoryManagementState,
    UseCategoryManagementMethods
] {    
    const [categoryListState, setCategoryList, selectCategoryList] = useCategoryList();
    const [category, setCategory] = useState<CategoryResult>();

    const selectCategory = useCallback((id: number) => {
        const selected = (categoryListState.result as CategoryResult[])
            .flatMap(category => [category, ...category.children])
            .find(category => category.id === id);

        setCategory(selected);
    }, [categoryListState.result]);

    const saveCategory = useCallback((payload: CategorySaveOrUpdatePayload) => {
        return categoryService.save(payload)
           .then(id => {
                selectCategoryList();
            });
    }, []);

    const updateCategory = useCallback((id: number, payload: CategorySaveOrUpdatePayload) => {
        return categoryService.update(id, payload)
            .then(id => {
                selectCategoryList();
            });
    }, []);

    const removeCategory = useCallback((id: number) => {
        return categoryService.remove(id)
            .then(id => {
                selectCategoryList();   
            });    
    }, []);

    return [{
        categoryListState,
        category
    }, {
        selectCategory,
        saveCategory,
        updateCategory,
        removeCategory
    }];
}

export default useCategoryManagement;