import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import Title from '../../components/general/Title';
import ProductManagementContainer from '../../container/product/ProductManagementContainer';

function ProductManagementPage() {
    return (
        <AdminLayout>
            <Title content={"상품 관리"} />
            <ProductManagementContainer />
        </AdminLayout>
    )
};

export default ProductManagementPage;