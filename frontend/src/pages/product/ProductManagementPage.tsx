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

function ProductManagementPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
    const history = useHistory();
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

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(findProductPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
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

    const onMoveSave = useCallback(() => {
        history.push("/admin/product/save");
    }, []);  
    
    return (
        <AdminLayout>
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>상품관리</h2>
                    </div>
                    <ProductManagementBar
                        searchCriteria={(productsState.productPageAsync.payload as ProductFindPayload).searchCriteria}
                        onUpdateSearchCriteria={onUpdateSearchCriteria}  
                        onMoveSave={onMoveSave}
                    />
                    <div className="row">
                        <div className="col-12">
                            <AdminProductList productList={productsState.productPageAsync.result?.list} />
                        </div>
                    </div>
                    <Pagination
                        page={productsState.productPageAsync.payload?.pageCriteria.page}  
                        totalCount={productsState.productPageAsync.result?.totalCount}
                        onPageChange={onPageChange}
                    />
                    {productsState.productPageAsync.error && <ErrorDetail message={"오류 발생"} />}
                </div>
            </main>
        </AdminLayout>
    )
};

export default ProductManagementPage;