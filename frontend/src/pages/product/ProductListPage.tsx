import qs from 'qs';
import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import ProductList from '../../components/product/ProductList';
import ProductListFilterBar from '../../components/product/ProductListFilterBar';
import useProductPage from '../../hooks/product/useProductPage';
import { ProductFindPayload } from '../../models/products';

function ProductListPage() {  
    const location = useLocation();
    
    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const [productPageState, , , updatePageCriteria] = useProductPage(
        categoryId? Number.parseInt(categoryId as string): undefined,
        searchCriteria
            ? {
                column: (searchCriteria as qs.ParsedQs).column as string, 
                keyword: (searchCriteria as qs.ParsedQs).keyword as string
            }
            : undefined,
        {
            page: pageCriteria? Number.parseInt((pageCriteria as qs.ParsedQs).page as string): 1, 
            size: 10
        }
    );

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(productPageState.payload as ProductFindPayload).pageCriteria, 
            page:selectedItem.selected + 1
        });
    }, [updatePageCriteria, productPageState.payload]);

    const onSortChange = useCallback((sortCriteria: { sortColumn: string, sortDirection: string }) => {
        updatePageCriteria({
            ...(productPageState.payload as ProductFindPayload).pageCriteria, 
            sortColumn: sortCriteria.sortColumn,
            sortDirection: sortCriteria.sortDirection
        });
    }, [updatePageCriteria, productPageState.payload]);

    return (
        <Layout>
            {productPageState.error && <ErrorDetail message={"오류 발생"} />}
            {productPageState.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">         
                    <ProductListFilterBar productListLength={productPageState.result.totalCount} onSortChange={onSortChange} />
                    <ProductList productList={productPageState.result.list}/>
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(productPageState.result.totalCount / 10)}
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