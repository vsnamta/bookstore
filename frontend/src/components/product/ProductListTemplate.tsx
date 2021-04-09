import React from 'react';
import { AsyncProductPage } from '../../models/product/store';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import ProductList from './ProductList';
import ProductListFilterBar from './ProductListFilterBar';

interface ProductListTemplateProps {
    asyncProductPage: AsyncProductPage;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
    onSortChange: (sortCriteria: {
        sortColumn: string;
        sortDirection: string;
    }) => void;
}

function ProductListTemplate({ asyncProductPage, onSortChange, onPageChange }: ProductListTemplateProps) {  
    return (
        <Layout>      
            <ProductListFilterBar 
                totalCount={asyncProductPage.result?.totalCount} 
                onSortChange={onSortChange} 
            />
            <ProductList productList={asyncProductPage.result?.list} />
            <Pagination
                page={asyncProductPage.payload?.pageCriteria.page}  
                totalCount={asyncProductPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            {asyncProductPage.error && <ErrorDetail message={asyncProductPage.error.message} />}
        </Layout>
    )
};

export default ProductListTemplate;