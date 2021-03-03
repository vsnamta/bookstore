import { useCallback, useState } from "react";
import { CategoryResult, CategorySaveOrUpdatePayload } from "../../models/categories";
import categoryApi from '../../apis/categoryApi';
import useCategoryList, { CategoryListState } from "./useCategoryList";
import { ApiError } from "../../error/ApiError";

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
    const [categoryListState, setCategoryList] = useCategoryList();
    const [category, setCategory] = useState<CategoryResult>();

    const selectCategory = useCallback((id: number) => {
        const selectedCategory = (categoryListState.result as CategoryResult[])
            .flatMap(category => [category, ...category.children])
            .find(category => category.id === id);

        setCategory(selectedCategory);
    }, [categoryListState.result]);

    const saveCategory = useCallback((payload: CategorySaveOrUpdatePayload) => {
        return categoryApi.save(payload)
           .then(savedCategory => {
                if(!savedCategory.parentId) {
                    setCategoryList(categoryList =>
                        (categoryList as CategoryResult[]).concat(savedCategory)
                    );
                } else {
                    setCategoryList(categoryList =>
                        (categoryList as CategoryResult[]).map(category => 
                            category.id === savedCategory.parentId 
                                ? {
                                    ...category,
                                    children: category.children.concat(savedCategory)
                                } 
                                : category
                        )
                    );
                }
            })
            .catch((error: ApiError) => {
                
            });
    }, []);

    const updateCategory = useCallback((id: number, payload: CategorySaveOrUpdatePayload) => {
        return categoryApi.update(id, payload)
            .then(updatedCategory => {
                if(!updatedCategory.parentId) {
                    setCategoryList(categoryList =>
                        (categoryList as CategoryResult[]).map(category => 
                            category.id === updatedCategory.id 
                                ? updatedCategory 
                                : category
                        )
                    );
                } else {
                    setCategoryList(categoryList =>
                        (categoryList as CategoryResult[]).map(category => 
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
                    );
                }
            })
            .catch((error: ApiError) => {
                
            });
    }, []);

    const removeCategory = useCallback((id: number) => {
        const removedCategory = (categoryListState.result as CategoryResult[])
            .flatMap(category => [category, ...category.children])
            .find(category => category.id === id) as CategoryResult;

        return categoryApi.remove(id)
            .then(() => {
                if(!removedCategory.parentId) {
                    setCategoryList(categoryList =>
                        (categoryList as CategoryResult[]).filter(category => category.id !== removedCategory.id)
                    );
                } else {
                    setCategoryList(categoryList =>
                        (categoryList as CategoryResult[]).map(category => 
                            category.id === removedCategory.parentId
                                ? {
                                    ...category,
                                    children: category.children.filter(subCategory => subCategory.id !== removedCategory.id)
                                } 
                                : category
                        )
                    );
                }
            })
            .catch((error: ApiError) => {
                
            });   
    }, [categoryListState.result]);

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