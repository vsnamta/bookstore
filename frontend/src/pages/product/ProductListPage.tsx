import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import ProductList from '../../components/product/ProductList';
import ProductListFilterBar from '../../components/product/ProductListFilterBar';
import { ProductFindPayload } from '../../models/products';
import { RootState } from '../../store';
import { findProductPage } from '../../store/product/action';

function ProductListPage() {  
    const location = useLocation();
    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const dispatch = useDispatch();
    const productPageAsync = useSelector((state: RootState) => state.products.productPageAsync);

    useEffect(() => {
        dispatch(findProductPage({
            categoryId: categoryId? Number.parseInt(categoryId as string): undefined,
            searchCriteria: searchCriteria
                ? {
                    column: (searchCriteria as qs.ParsedQs).column as string, 
                    keyword: (searchCriteria as qs.ParsedQs).keyword as string
                }
                : undefined,
            pageCriteria: {
                page: pageCriteria? Number.parseInt((pageCriteria as qs.ParsedQs).page as string): 1, 
                size: 10
            }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findProductPage({
            ...productPageAsync.payload as ProductFindPayload,
            pageCriteria: {
                ...(productPageAsync.payload as ProductFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [productPageAsync.payload]);

    const onSortChange = useCallback((sortCriteria: { sortColumn: string, sortDirection: string }) => {
        dispatch(findProductPage({
            ...productPageAsync.payload as ProductFindPayload,
            pageCriteria: {
                ...(productPageAsync.payload as ProductFindPayload).pageCriteria, 
                sortColumn: sortCriteria.sortColumn,
                sortDirection: sortCriteria.sortDirection
            }
        }));
    }, [productPageAsync.payload]);

    return (
        <Layout>      
            <ProductListFilterBar totalCount={productPageAsync.result?.totalCount} onSortChange={onSortChange} />
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

export default ProductListPage;