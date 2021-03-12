import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
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
import { ProductsState } from '../../store/product/reducer';

function ProductListPage() {  
    const location = useLocation();
    
    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const productsState: ProductsState = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();

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
            ...productsState.productPageAsync.payload as ProductFindPayload,
            pageCriteria: {
                ...(productsState.productPageAsync.payload as ProductFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [productsState.productPageAsync.payload]);

    const onSortChange = useCallback((sortCriteria: { sortColumn: string, sortDirection: string }) => {
        dispatch(findProductPage({
            ...productsState.productPageAsync.payload as ProductFindPayload,
            pageCriteria: {
                ...(productsState.productPageAsync.payload as ProductFindPayload).pageCriteria, 
                sortColumn: sortCriteria.sortColumn,
                sortDirection: sortCriteria.sortDirection
            }
        }));
    }, [productsState.productPageAsync.payload]);

    return (
        <Layout>
            <main className="inner-page-sec-padding-bottom">
                <div className="container">         
                    <ProductListFilterBar totalCount={productsState.productPageAsync.result?.totalCount} onSortChange={onSortChange} />
                    <ProductList productList={productsState.productPageAsync.result?.list} />
                    <Pagination
                        page={productsState.productPageAsync.payload?.pageCriteria.page}  
                        totalCount={productsState.productPageAsync.result?.totalCount}
                        onPageChange={onPageChange}
                    />
                    {productsState.productPageAsync.error && <ErrorDetail message={"오류 발생"} />}
                </div>
		    </main>
        </Layout>
    )
};

export default ProductListPage;