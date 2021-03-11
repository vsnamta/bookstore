import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
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
            {productsState.productPageAsync.error && <ErrorDetail message={"오류 발생"} />}
            {productsState.productPageAsync.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">         
                    <ProductListFilterBar productListLength={productsState.productPageAsync.result.totalCount} onSortChange={onSortChange} />
                    <ProductList productList={productsState.productPageAsync.result.list}/>
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(productsState.productPageAsync.result.totalCount / 10)}
                                    pageRangeDisplayed={10}
                                    marginPagesDisplayed={0}
                                    onPageChange={onPageChange}
                                    containerClassName={"pagination-btns flex-center"}
                                    previousLinkClassName={"single-btn prev-btn"}
                                    previousLabel={"<"}
                                    activeClassName={"active"}
                                    pageLinkClassName={"single-btn"}
                                    nextLinkClassName={"single-btn next-btn"}
                                    nextLabel={">"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
		    </main>}
        </Layout>
    )
};

export default ProductListPage;