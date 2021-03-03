import React, { useCallback } from 'react';
import ReactModal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import OrderDetail from '../../components/order/OrderDetail';
import OrderList from '../../components/order/OrderList';
import OrderManagementBar from '../../components/order/OrderManagementBar';
import useModal from '../../hooks/common/useModal';
import useOrderManagement from '../../hooks/order/useOrderManagement';
import { FindPayload } from '../../models/common';
import { RootState } from '../../store';

function OrderManagementPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
    const [orderManagementState, useOrderManagementMethods] = useOrderManagement({ column: "", keyword: "" });
    const {orderPageState, orderState} = orderManagementState;
    const {updateSearchCriteria, updatePageCriteria, selectOrder, updateOrder} = useOrderManagementMethods;
    
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        selectOrder(id);
        openUpdateModal();
    }, [selectOrder]);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(orderPageState.payload as FindPayload).pageCriteria,
            page: selectedItem.selected + 1
        });
    }, [updatePageCriteria, orderPageState.payload]);

    return (
        <AdminLayout>
            {orderPageState.error && <ErrorDetail message={"오류 발생"} />}
            {orderPageState.result &&
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>주문관리</h2>
                    </div>
                    <OrderManagementBar 
                        onUpdateSearchCriteria={updateSearchCriteria}
                    />
                    <div className="row">
                        <div className="col-12">
                            <OrderList 
                                orderList={orderPageState.result.list}
                                onSelectOrder={onSelectOrder}
                                onUpdateOrder={updateOrder} 
                            />
                        </div>
                    </div>
                    <div className="row pt--30">
                        <div className="col-md-12">
                            <div className="pagination-block">
                                <ReactPaginate 
                                    pageCount={Math.ceil(orderPageState.result.totalCount / 10)}
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
            {orderState.result && 
            <ReactModal
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
            >
                <button type="button" className="close modal-close-btn ml-auto" data-dismiss="modal"
                    aria-label="Close" onClick={closeUpdateModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <OrderDetail order={orderState.result}/>
            </ReactModal>}
        </AdminLayout>
    )
};

export default OrderManagementPage;