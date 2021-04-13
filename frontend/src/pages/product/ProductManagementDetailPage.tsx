import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import ProductManagementDetailContainer from '../../container/product/ProductManagementDetailContainer';
import StockManagementContainer from '../../container/stock/StockManagementContainer';

function ProductManagementDetailPage() {
    return (
        <AdminLayout>
            <ProductManagementDetailContainer />
            <StockManagementContainer />
        </AdminLayout>
    )
};

export default ProductManagementDetailPage;