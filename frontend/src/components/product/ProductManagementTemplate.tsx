import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import AdminProductList from './AdminProductList';
import ProductManagementBar from './ProductManagementBar';
import { SearchCriteria } from '../../models/common';
import { ProductPageAsync } from '../../store/product/reducer';

interface ProductManagementTemplateProps {
    productPageAsync: ProductPageAsync;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductManagementTemplate({ productPageAsync, onUpdateSearchCriteria, onPageChange }: ProductManagementTemplateProps) {
    return (
        <AdminLayout>
            <Title content={"상품 관리"} />
            <ProductManagementBar
                searchCriteria={productPageAsync.payload?.searchCriteria}
                onUpdateSearchCriteria={onUpdateSearchCriteria}  
            />
            <AdminProductList 
                productList={productPageAsync.result?.list} 
            />
            <Pagination
                page={productPageAsync.payload?.pageCriteria.page}  
                totalCount={productPageAsync.result?.totalCount}
                onPageChange={onPageChange}
            />
            {productPageAsync.error && <ErrorDetail message={productPageAsync.error.message} />}
        </AdminLayout>
    )
};

export default ProductManagementTemplate;