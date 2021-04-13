import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import Title from '../../components/general/Title';
import CategoryManagementContainer from '../../container/category/CategoryManagementContainer';

function CategoryManagementPage() {
    return (
        <AdminLayout>
            <Title content={"카테고리 관리"} />
            <CategoryManagementContainer />
        </AdminLayout>
    )
};

export default CategoryManagementPage;