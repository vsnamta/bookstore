import React, { useCallback, useState } from 'react';
import CategoryList from './CategoryList';
import CategoryManagementBar from './CategoryManagementBar';
import CategorySaveModal from './CategorySaveModal';
import CategoryUpdateModal from './CategoryUpdateModal';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Title from '../general/Title';
import useModal from '../../hooks/useModal';
import { CategoryResult } from '../../models/category';
import { CategoryRemoveAsyncPayload, CategorySaveAsyncPayload, CategoryUpdateAsyncPayload } from '../../models/category/store';
import { CategoryListAsync } from '../../models/category/store';

interface CategoryManagementTemplateProps {
    categoryListAsync: CategoryListAsync;
    category?: CategoryResult;
    selectCategory: (id: number) => void;
    removeCategory: (payload: CategoryRemoveAsyncPayload) => void;
    updateCategory: (payload: CategoryUpdateAsyncPayload) => void;
    saveCategory: (payload: CategorySaveAsyncPayload) => void;
}

function CategoryManagementTemplate({ 
    categoryListAsync, category, selectCategory, removeCategory, updateCategory, saveCategory 
}: CategoryManagementTemplateProps) {
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
                payload.onSuccess && payload.onSuccess(category);
                closeSaveModal();
                openUpdateModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <AdminLayout>
            <Title content={"카테고리 관리"} />
            <CategoryManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            />
            <CategoryList 
                categoryList={categoryListAsync.result}
                onSelectCategory={onSelectCategory}
                onRemoveCategory={removeCategory}
            />
            {categoryListAsync.error && <ErrorDetail message={categoryListAsync.error.message} />}
            <CategorySaveModal 
                categoryList={saveCategoryType === "super" ? undefined : categoryListAsync.result}
                isOpen={saveModalIsOpen}
                onSaveCategory={onSaveCategory}
                onRequestClose={closeSaveModal}
            />
            <CategoryUpdateModal 
                category={category}
                categoryList={!category?.parentId? undefined : categoryListAsync.result}
                isOpen={updateModalIsOpen}
                onUpdateCategory={updateCategory}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default CategoryManagementTemplate;