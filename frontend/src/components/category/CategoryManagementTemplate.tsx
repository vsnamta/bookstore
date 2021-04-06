import React, { useCallback, useState } from 'react';
import CategoryList from './CategoryList';
import CategoryManagementBar from './CategoryManagementBar';
import CategorySaveModal from './CategorySaveModal';
import CategoryUpdateModal from './CategoryUpdateModal';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Title from '../general/Title';
import useModal from '../../hooks/useModal';
import { CategoryResult } from '../../models/categories';
import { CategoryRemoveRequestActionPayload, CategorySaveRequestActionPayload, CategoryUpdateRequestActionPayload } from '../../store/category/action';
import { CategoryListAsync } from '../../store/category/reducer';

interface CategoryManagementTemplateProps {
    categoryListAsync: CategoryListAsync;
    category?: CategoryResult;
    selectCategory: (id: number) => void;
    removeCategory: (payload: CategoryRemoveRequestActionPayload) => void;
    updateCategory: (payload: CategoryUpdateRequestActionPayload) => void;
    saveCategory: (payload: CategorySaveRequestActionPayload) => void;
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

    const onSaveCategory = useCallback((payload: CategorySaveRequestActionPayload) => {
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