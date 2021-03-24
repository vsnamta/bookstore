import React from 'react';
import CategoryList from '../../components/category/CategoryList';
import CategoryManagementBar from '../../components/category/CategoryManagementBar';
import CategorySaveModal from '../../components/category/CategorySaveModal';
import CategoryUpdateModal from '../../components/category/CategoryUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import { ApiError } from '../../error/ApiError';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../../models/categories';

interface CategoryManagementTemplateProps {
    categoryListAsync?: {
        result?: CategoryResult[] | undefined;
        error?: ApiError | undefined;
    };
    category?: CategoryResult;
    saveCategoryType: string;
    saveModalIsOpen: boolean;
    updateModalIsOpen: boolean;
    onSelectCategory: (id: number) => void;
    onRemoveCategory: (id: number) => void;
    onUpdateCategory: (id: number, payload: CategorySaveOrUpdatePayload) => void;
    onSaveCategory: (payload: CategorySaveOrUpdatePayload) => void;
    onOpenSaveModal: (saveCategoryType: string) => void;
    closeSaveModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    closeUpdateModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

function CategoryManagementTemplate({ 
    categoryListAsync, category, saveCategoryType, saveModalIsOpen, updateModalIsOpen,
    onSelectCategory, onRemoveCategory, onUpdateCategory, onSaveCategory, onOpenSaveModal, closeSaveModal, closeUpdateModal
}: CategoryManagementTemplateProps) {
    return (
        <AdminLayout>
            <Title content={"카테고리 관리"} />
            <CategoryManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            />
            <CategoryList 
                categoryList={categoryListAsync?.result}
                onSelectCategory={onSelectCategory}
                onRemoveCategory={onRemoveCategory}
            />
            {categoryListAsync?.error && <ErrorDetail message={categoryListAsync.error.message} />}
            <CategorySaveModal 
                categoryList={saveCategoryType === "super" ? undefined : categoryListAsync?.result}
                isOpen={saveModalIsOpen}
                onSaveCategory={onSaveCategory}
                onRequestClose={closeSaveModal}
            />
            <CategoryUpdateModal 
                category={category}
                categoryList={!category?.parentId? undefined : categoryListAsync?.result}
                isOpen={updateModalIsOpen}
                onUpdateCategory={onUpdateCategory}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default CategoryManagementTemplate;