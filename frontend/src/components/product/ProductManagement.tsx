import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import AdminProductList from './AdminProductList';
import ProductManagementBar from './ProductManagementBar';
import { SearchCriteria } from '../../models/common';
import { AsyncProductPage } from '../../models/product/store';

interface ProductManagementProps {
    asyncProductPage: AsyncProductPage;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: { selected: number; }) => void;
}

function ProductManagement({ asyncProductPage, onUpdateSearchCriteria, onPageChange }: ProductManagementProps) {
    return (
        <>
            <ProductManagementBar
                searchCriteria={asyncProductPage.payload?.searchCriteria}
                onUpdateSearchCriteria={onUpdateSearchCriteria}  
            />
            <AdminProductList 
                productList={asyncProductPage.result?.list} 
            />
            <Pagination
                page={asyncProductPage.payload?.pageCriteria.page}  
                totalCount={asyncProductPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            {asyncProductPage.error && <ErrorDetail message={asyncProductPage.error.message} />}
        </>
    )
};

export default React.memo(ProductManagement);