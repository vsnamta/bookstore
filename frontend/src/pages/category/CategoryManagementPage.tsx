import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CategoryList from '../../components/category/CategoryList';
import CategoryManagementBar from '../../components/category/CategoryManagementBar';
import CategorySaveModal from '../../components/category/CategorySaveModal';
import CategoryUpdateModal from '../../components/category/CategoryUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import useCategoryManagement from '../../hooks/category/useCategoryManagement';
import useModal from '../../hooks/common/useModal';
import { CategorySaveOrUpdatePayload } from '../../models/categories';
import { RootState } from '../../store';

function CategoryManagementPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    }  

    const [categoryManagementState, useCategoryManagementMethods] = useCategoryManagement();
    const {categoryListState, category} = categoryManagementState;
    const {selectCategory, saveCategory, updateCategory, removeCategory} = useCategoryManagementMethods;
    
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
    }, [selectCategory]);

    const onSaveCategory = useCallback((payload: CategorySaveOrUpdatePayload) => {
        saveCategory(payload)
            .then(() => closeSaveModal());
    }, []);

    const onUpdateCategory = useCallback((id: number, payload: CategorySaveOrUpdatePayload) => {
        updateCategory(id, payload)
            .then(() => closeUpdateModal());
    }, []);
    
    return (
        <AdminLayout>
            {categoryListState.error && <ErrorDetail message={"오류 발생"} />}

            {categoryListState.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>카테고리 관리</h2>
                    </div>
                    <CategoryManagementBar 
                        onOpenSaveModal={onOpenSaveModal}
                    />
                    <div className="row">
                        <div className="col-12">
                            <CategoryList 
                                categoryList={categoryListState.result}
                                onSelectCategory={onSelectCategory}
                                onRemoveCategory={removeCategory}
                            />
                        </div>
                    </div>
                </div>
            </main>}
            <CategorySaveModal 
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveCategory={onSaveCategory}
                categoryList={saveCategoryType === "super" ? undefined : categoryListState.result}
            />
            {category &&
            <CategoryUpdateModal 
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
                category={category}
                onUpdateCategory={onUpdateCategory}
                categoryList={!category.parentId? undefined : categoryListState.result}
            />}
        </AdminLayout>
    )
};

export default CategoryManagementPage;