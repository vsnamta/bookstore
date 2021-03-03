import qs from 'qs';
import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductList from '../../components/product/AdminProductList';
import ProductManagementBar from '../../components/product/ProductManagementBar';
import useProductPage from '../../hooks/product/useProductPage';
import { ProductFindPayload } from '../../models/products';
import { RootState } from '../../store';

function ProductManagementPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
    const history = useHistory();
    const location = useLocation();

    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const [productPageState, , updateSearchCriteria, updatePageCriteria] = useProductPage(
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
    
    const onMoveSave = useCallback(() => {
        history.push("/admin/product/save");
    }, []);  

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(productPageState.payload as ProductFindPayload).pageCriteria, 
            page:selectedItem.selected + 1
        });
    }, [updatePageCriteria, productPageState.payload]);
    
    return (
        <AdminLayout>
            {productPageState.error && <ErrorDetail message={"오류 발생"} />}
            {productPageState.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>상품관리</h2>
                    </div>
                    <ProductManagementBar
                        onUpdateSearchCriteria={updateSearchCriteria}  
                        onMoveSave={onMoveSave}
                    />
                    <div className="row">
                        <div className="col-12">
                            <AdminProductList productList={productPageState.result.list} />
                        </div>
                    </div>
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
        </AdminLayout>
    )
};

export default ProductManagementPage;