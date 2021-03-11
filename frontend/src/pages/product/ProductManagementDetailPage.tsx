import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductDetail from '../../components/product/AdminProductDetail';
import StockList from '../../components/stock/StockList';
import StockManagementBar from '../../components/stock/StockManagementBar';
import StockSaveModal from '../../components/stock/StockSaveModal';
import useModal from '../../hooks/useModal';
import { StockFindPayload, StockSavePayload } from '../../models/stocks';
import { RootState } from '../../store';
import { findProduct } from '../../store/product/action';
import { findStockPage, saveStock } from '../../store/stock/action';

function ProductManagementDetailPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
    const history = useHistory();
    
    const { id } = useParams<{id: string}>();

    const productsState = useSelector((state: RootState) => state.products);
    const stockPageState = useSelector((state: RootState) => state.stocks.stockPageAsync);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findProduct(Number.parseInt(id)));
        dispatch(findStockPage({
            productId: Number.parseInt(id),
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onMoveUpdate = useCallback(() => {
        history.push(`/admin/product/update/${id}`);
    }, []);

    const onMoveList = useCallback(() => {
        const queryString = qs.stringify(productsState.productPageAsync.payload, { allowDots: true });
        history.push(`/admin/product/list?${queryString}`);
    }, [productsState.productPageAsync.payload]);

    const onSaveStock = useCallback((payload: StockSavePayload) => {
        dispatch(saveStock({
            payload: payload,
            onSuccess: stock => {
                alert("저장되었습니다.");
                closeSaveModal()
            },
            onFailure: error => {}
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findStockPage({
            ...stockPageState.payload as StockFindPayload,
            pageCriteria: {
                ...(stockPageState.payload as StockFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [stockPageState.payload]);
    
    return (
        <AdminLayout>
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    {productsState.productAsync.error && <ErrorDetail message={"오류 발생"} />}
                    {productsState.productAsync.result &&
                    <AdminProductDetail 
                        product={productsState.productAsync.result}
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