import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductList from '../../components/product/AdminProductList';
import ProductManagementBar from '../../components/product/ProductManagementBar';
import { ProductFindPayload } from '../../models/products';
import { SearchCriteria } from '../../models/common';
import { RootState } from '../../store';
import { findProductPage } from '../../store/product/action';
import { ProductsState } from '../../store/product/reducer';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';

function ProductManagementPage() {
    const history = useHistory();
    const location = useLocation();
    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
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

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(findProductPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
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

    const onMoveSave = useCallback(() => {
        history.push("/admin/product/save");
    }, []);  
    
    return (
        <AdminLayout>
            <Title content={"상품 관리"} />
            <ProductManagementBar
                searchCriteria={(productPageAsync.payload as ProductFindPayload).searchCriteria}
                onUpdateSearchCriteria={onUpdateSearchCriteria}  
                onMoveSave={onMoveSave}
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

export default ProductManagementPage;