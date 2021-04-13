import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import ProductUpdateFormContainer from '../../container/product/ProductUpdateFormContainer';

function ProductUpdatePage() {
    return (
        <AdminLayout>
            <ProductUpdateFormContainer />
        </AdminLayout>
    )
};

export default ProductUpdatePage;