import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductList from '../../components/product/AdminProductList';
import ProductManagementBar from '../../components/product/ProductManagementBar';
import { ApiError } from '../../error/ApiError';
import { Page, SearchCriteria } from '../../models/common';
import { ProductFindPayload, ProductResult } from '../../models/products';

interface ProductManagementTemplateProps {
    productPageAsync?: {
        payload?: ProductFindPayload | undefined;
        result?: Page<ProductResult> | undefined;
        error?: ApiError | undefined;
    };
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
    onMoveSave: () => void;
}

function ProductManagementTemplate({ productPageAsync, onUpdateSearchCriteria, onPageChange, onMoveSave }: ProductManagementTemplateProps) {
    return (
        <AdminLayout>
            <Title content={"상품 관리"} />
            <ProductManagementBar
                searchCriteria={(productPageAsync?.payload as ProductFindPayload).searchCriteria}
                onUpdateSearchCriteria={onUpdateSearchCriteria}  
                onMoveSave={onMoveSave}
            />
            <AdminProductList 
                productList={productPageAsync?.result?.list} 
            />
            <Pagination
                page={productPageAsync?.payload?.pageCriteria.page}  
                totalCount={productPageAsync?.result?.totalCount}
                onPageChange={onPageChange}
            />
            {productPageAsync?.error && <ErrorDetail message={productPageAsync.error.message} />}
        </AdminLayout>
    )
};

export default ProductManagementTemplate;