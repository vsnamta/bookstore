import qs from 'qs';
import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductDetail from '../../components/product/AdminProductDetail';
import StockList from '../../components/stock/StockList';
import StockManagementBar from '../../components/stock/StockManagementBar';
import StockSaveModal from '../../components/stock/StockSaveModal';
import useModal from '../../hooks/common/useModal';
import useProduct from '../../hooks/product/useProduct';
import useStockManagement from '../../hooks/stock/useStockManagement';
import { StockFindPayload, StockSavePayload } from '../../models/stocks';
import { RootState } from '../../store';

function ProductManagementDetailPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
    const history = useHistory();
    
    const { id } = useParams<{id: string}>();
    const [productState] = useProduct(Number.parseInt(id));
    const productFindPayload = useSelector((state: RootState) => state.productPage.payload);
    
    const [stockManagementState, useStockManagementMethods] = useStockManagement(Number.parseInt(id));
    const {stockPageState} = stockManagementState;
    const {updatePageCriteria, saveStock} = useStockManagementMethods;
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onMoveUpdate = useCallback(() => {
        history.push(`/admin/product/update/${id}`);
    }, []);

    const onMoveList = useCallback(() => {
        const queryString = qs.stringify(productFindPayload, { allowDots: true });
        history.push(`/admin/product/list?${queryString}`);
    }, [productFindPayload]);

    const onSaveStock = useCallback((payload: StockSavePayload) => {
        saveStock(payload)
            .then(() => closeSaveModal());
    }, [saveStock]);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(stockPageState.payload as StockFindPayload).pageCriteria,
            page: selectedItem.selected + 1
        });
    }, [updatePageCriteria, stockPageState.payload]);
    
    return (
        <AdminLayout>
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    {productState.result &&
                    <AdminProductDetail 
                        product={productState.result}
                        onMoveUpdate={onMoveUpdate}
                        onMoveList={onMoveList}
                    />}
                    <div className="section-title section-title--bordered">
                        <h2>재고</h2>
                    </div>
                    {stockPageState.result &&
                    <>
                        <StockManagementBar 
                            onOpenSaveModal={openSaveModal}
                        />
                        <div className="row">
                            <div className="col-12">
                                <StockList stockList={stockPageState.result.list} />
                            </div>
                        </div>
                        <div className="row pt--30">
                            <div className="col-md-12">
                                <div className="pagination-block">
                                    <ReactPaginate 
                                        pageCount={Math.ceil(stockPageState.result.totalCount / 10)}
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
                    </>}
                    <StockSaveModal 
                        isOpen={saveModalIsOpen} 
                        onRequestClose={closeSaveModal}
                        onSaveStock={onSaveStock}
                    />
                </div>
            </main>
        </AdminLayout>
    )
};

export default ProductManagementDetailPage;