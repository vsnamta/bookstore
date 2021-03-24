import React from 'react';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import ProductList from './ProductList';
import ProductListFilterBar from './ProductListFilterBar';
import { ProductPageAsync } from '../../store/product/reducer';

interface ProductListTemplateProps {
    productPageAsync: ProductPageAsync;
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
                totalCount={productPageAsync.result?.totalCount} 
                onSortChange={onSortChange} 
            />
            <ProductList productList={productPageAsync.result?.list} />
            <Pagination
                page={productPageAsync.payload?.pageCriteria.page}  
                totalCount={productPageAsync.result?.totalCount}
                onPageChange={onPageChange}
            />
            {productPageAsync.error && <ErrorDetail message={productPageAsync.error.message} />}
        </Layout>
    )
};

export default ProductListTemplate;