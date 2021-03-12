import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CategoryList from '../../components/category/CategoryList';
import CategoryManagementBar from '../../components/category/CategoryManagementBar';
import CategorySaveModal from '../../components/category/CategorySaveModal';
import CategoryUpdateModal from '../../components/category/CategoryUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import useModal from '../../hooks/useModal';
import { CategorySaveOrUpdatePayload } from '../../models/categories';
import { RootState } from '../../store';
import { findCategory, findCategoryList, saveCategory, updateCategory, removeCategory } from '../../store/category/action';

function CategoryManagementPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    }  

    const dispatch = useDispatch();

    const {categoryListState, category} = useSelector((state: RootState) => ({
        categoryListState: state.categories.categoryListAsync,
        category: state.categories.category
    }));

    useEffect(() => {
        dispatch(findCategoryList());
    }, []);

    const [saveCategoryType, setSaveCategoryType] = useState<string>("super");
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onOpenSaveModal = useCallback((saveCategoryType: string) => {
        setSaveCategoryType(saveCategoryType);
        openSaveModal();
    }, []);

    const onSelectCategory = useCallback((id: number) => {
        dispatch(findCategory(id));
        openUpdateModal();
    }, []);

    const onSaveCategory = useCallback((payload: CategorySaveOrUpdatePayload) => {
        dispatch(saveCategory({
            payload: payload,
            onSuccess: category => {
                alert("저장되었습니다.");
                closeSaveModal();
                openUpdateModal();
            },
            onFailure: error => {}
        }));
    }, []);

    const onUpdateCategory = useCallback((id: number, payload: CategorySaveOrUpdatePayload) => {
        dispatch(updateCategory({
            id: id,
            payload: payload,
            onSuccess: category => alert("변경되었습니다."),
            onFailure: error => {}
        }));
    }, []);

    const onRemoveCategory = useCallback((id: number) => {
        dispatch(removeCategory({
            id: id,
            onSuccess: () => alert("삭제되었습니다."),
            onFailure: (error) => {}
        }));
    }, []);
    
    return (
        <AdminLayout>
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
                                onRemoveCategory={onRemoveCategory}
                            />
                        </div>
                    </div>
                    {categoryListState.error && <ErrorDetail message={"오류 발생"} />}
                </div>
            </main>
            <CategorySaveModal 
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveCategory={onSaveCategory}
                categoryList={saveCategoryType === "super" ? undefined : categoryListState.result}
            />
            <CategoryUpdateModal 
                category={category}
                categoryList={!category?.parentId? undefined : categoryListState.result}
                isOpen={updateModalIsOpen}
                onUpdateCategory={onUpdateCategory}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default CategoryManagementPage;