import React from 'react';
import Layout from '../../components/common/Layout';
import ProductDetailContainer from '../../container/product/ProductDetailContainer';
import ReviewManagementContainer from '../../container/review/ReviewManagementContainer';

function ProductDetailPage() {
    return (
        <Layout>
            <ProductDetailContainer />
            <ReviewManagementContainer />
        </Layout>
    )
};

export default ProductDetailPage;