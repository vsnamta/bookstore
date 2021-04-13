import React, { useCallback, useState } from 'react';
import useModal from '../../hooks/useModal';
import { CategoryResult } from '../../models/category';
import { AsyncCategoryList, CategoryRemoveAsyncPayload, CategorySaveAsyncPayload, CategoryUpdateAsyncPayload } from '../../models/category/store';
import ErrorDetail from '../general/ErrorDetail';
import CategoryList from './CategoryList';
import CategoryManagementBar from './CategoryManagementBar';
import CategorySaveModal from './CategorySaveModal';
import CategoryUpdateModal from './CategoryUpdateModal';

interface CategoryManagementProps {
    asyncCategoryList: AsyncCategoryList;
    category?: CategoryResult;
    selectCategory: (id: number) => void;
    removeCategory: (payload: CategoryRemoveAsyncPayload) => void;
    updateCategory: (payload: CategoryUpdateAsyncPayload) => void;
    saveCategory: (payload: CategorySaveAsyncPayload) => void;
}

function CategoryManagement({ 
    asyncCategoryList, category, selectCategory, removeCategory, updateCategory, saveCategory 
}: CategoryManagementProps) {
    const [saveCategoryType, setSaveCategoryType] = useState<string>("super");
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onOpenSaveModal = useCallback((saveCategoryType: string) => {
        setSaveCategoryType(saveCategoryType);
        openSaveModal();
    }, []);

    const onSelectCategory = useCallback((id: number) => {
        selectCategory(id);
        openUpdateModal();
    }, []);

    const onSaveCategory = useCallback((payload: CategorySaveAsyncPayload) => {
        saveCategory({
            payload: payload.payload,
            onSuccess: category => {
                payload.onSuccess?.(category);
                closeSaveModal();
                openUpdateModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <>
            <CategoryManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            />
            <CategoryList 
                categoryList={asyncCategoryList.result}
                onSelectCategory={onSelectCategory}
                onRemoveCategory={removeCategory}
            />
            {asyncCategoryList.error && <ErrorDetail message={asyncCategoryList.error.message} />}
            <CategorySaveModal 
                categoryList={saveCategoryType === "super" ? undefined : asyncCategoryList.result}
                isOpen={saveModalIsOpen}
                onSaveCategory={onSaveCategory}
                onRequestClose={closeSaveModal}
            />
            <CategoryUpdateModal 
                category={category}
                categoryList={!category?.parentId? undefined : asyncCategoryList.result}
                isOpen={updateModalIsOpen}
                onUpdateCategory={updateCategory}
                onRequestClose={closeUpdateModal}
            />
        </>
    )
};

export default React.memo(CategoryManagement);