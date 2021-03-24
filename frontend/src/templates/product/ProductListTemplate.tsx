import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import ProductList from '../../components/product/ProductList';
import ProductListFilterBar from '../../components/product/ProductListFilterBar';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductFindPayload, ProductResult } from '../../models/products';

interface ProductListTemplateProps {
    productPageAsync?: {
        payload?: ProductFindPayload | undefined;
        result?: Page<ProductResult> | undefined;
        error?: ApiError | undefined;
    };
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
    onSortChange: (sortCriteria: {
        sortColumn: string;
        sortDirection: string;
    }) => void;
}

function ProductListTemplate({ productPageAsync, onSortChange, onPageChange }: ProductListTemplateProps) {  
    return (
        <Layout>      
            <ProductListFilterBar 
                totalCount={productPageAsync?.result?.totalCount} 
                onSortChange={onSortChange} 
            />
            <ProductList productList={productPageAsync?.result?.list} />
            <Pagination
                page={productPageAsync?.payload?.pageCriteria.page}  
                totalCount={productPageAsync?.result?.totalCount}
                onPageChange={onPageChange}
            />
            {productPageAsync?.error && <ErrorDetail message={productPageAsync.error.message} />}
        </Layout>
    )
};

export default ProductListTemplate;