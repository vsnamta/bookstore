import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryList from '../../components/category/CategoryList';
import CategoryManagementBar from '../../components/category/CategoryManagementBar';
import CategorySaveModal from '../../components/category/CategorySaveModal';
import CategoryUpdateModal from '../../components/category/CategoryUpdateModal';
import ErrorDetail from '../../components/general/ErrorDetail';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import useModal from '../../hooks/useModal';
import { CategorySaveOrUpdatePayload } from '../../models/categories';
import { RootState } from '../../store';
import { findCategory, findCategoryList, removeCategory, saveCategory, updateCategory } from '../../store/category/action';
import CategoryManagementTemplate from '../../templates/category/CategoryManagementTemplate';

function CategoryManagementPage() {
    const dispatch = useDispatch();
    const { categoryListAsync, category } = useSelector((state: RootState) => state.categories);

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
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onUpdateCategory = useCallback((id: number, payload: CategorySaveOrUpdatePayload) => {
        dispatch(updateCategory({
            id: id,
            payload: payload,
            onSuccess: category => alert("변경되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onRemoveCategory = useCallback((id: number) => {
        dispatch(removeCategory({
            id: id,
            onSuccess: () => alert("삭제되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);
    
    return (
        <CategoryManagementTemplate 
            categoryListAsync={categoryListAsync}
            category={category}
            saveCategoryType={saveCategoryType}
            saveModalIsOpen={saveModalIsOpen}
            updateModalIsOpen={updateModalIsOpen}
            onSelectCategory={onSelectCategory}
            onRemoveCategory={onRemoveCategory}
            onUpdateCategory={onUpdateCategory}
            onSaveCategory={onSaveCategory}
            onOpenSaveModal={onOpenSaveModal}
            closeSaveModal={closeSaveModal}
            closeUpdateModal={closeUpdateModal}
        />
        // <AdminLayout>
        //     <Title content={"카테고리 관리"} />
        //     <CategoryManagementBar 
        //         onOpenSaveModal={onOpenSaveModal}
        //     />
        //     <CategoryList 
        //         categoryList={categoryListAsync.result}
        //         onSelectCategory={onSelectCategory}
        //         onRemoveCategory={onRemoveCategory}
        //     />
        //     {categoryListAsync.error && <ErrorDetail message={categoryListAsync.error.message} />}
        //     <CategorySaveModal 
        //         categoryList={saveCategoryType === "super" ? undefined : categoryListAsync.result}
        //         isOpen={saveModalIsOpen}
        //         onSaveCategory={onSaveCategory}
        //         onRequestClose={closeSaveModal}
        //     />
        //     <CategoryUpdateModal 
        //         category={category}
        //         categoryList={!category?.parentId? undefined : categoryListAsync.result}
        //         isOpen={updateModalIsOpen}
        //         onUpdateCategory={onUpdateCategory}
        //         onRequestClose={closeUpdateModal}
        //     />
        // </AdminLayout>
    )
};

export default CategoryManagementPage;