import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import ProductSaveFormContainer from '../../container/product/ProductSaveFormContainer';

function ProductSavePage() {
    return (
        <AdminLayout>
            <ProductSaveFormContainer />
        </AdminLayout>
    )
};

export default ProductSavePage;