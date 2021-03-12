import React, { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import AdminLayout from '../../components/layout/AdminLayout';
import OrderDetail from '../../components/order/OrderDetail';
import OrderList from '../../components/order/OrderList';
import OrderManagementBar from '../../components/order/OrderManagementBar';
import useModal from '../../hooks/useModal';
import { FindPayload, SearchCriteria } from '../../models/common';
import { OrderUpdatePayload } from '../../models/orders';
import { RootState } from '../../store';
import { findOrder, findOrderPage, updateOrder } from '../../store/order/action';

function OrderManagementPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 

    const { orderPageState, orderState } = useSelector((state: RootState) => ({
        orderPageState: state.orders.orderPageAsync,
        orderState: state.orders.orderAsync
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findOrderPage({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        dispatch(findOrder(id));
        openUpdateModal();
    }, []);

    const onUpdateOrder = useCallback((id: number, payload: OrderUpdatePayload) => {
        dispatch(updateOrder({
            id: id,
            payload: payload,
            onSuccess: order => alert("변경되었습니다."),
            onFailure: error => {}
        }));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(findOrderPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findOrderPage({
            ...orderPageState.payload as FindPayload,
            pageCriteria: {
                ...(orderPageState.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [orderPageState.payload]);

    return (
        <AdminLayout>
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>주문관리</h2>
                    </div>
                    <OrderManagementBar
                        searchCriteria={orderPageState.payload?.searchCriteria} 
                        onUpdateSearchCriteria={onUpdateSearchCriteria}
                    />
                    <div className="row">
                        <div className="col-12">
                            <OrderList 
                                orderList={orderPageState.result?.list}
                                onSelectOrder={onSelectOrder}
                                onUpdateOrder={onUpdateOrder} 
                            />
                        </div>
                    </div>
                    <Pagination
                        page={orderPageState.payload?.pageCriteria.page} 
                        totalCount={orderPageState.result?.totalCount}
                        onPageChange={onPageChange}
                    />
                    {orderPageState.error && <ErrorDetail message={"오류 발생"} />}
                </div>
            </main>
            <ReactModal
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
            >
                <button type="button" className="close modal-close-btn ml-auto" data-dismiss="modal"
                    aria-label="Close" onClick={closeUpdateModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <OrderDetail order={orderState.result}/>
            </ReactModal>
        </AdminLayout>
    )
};

export default OrderManagementPage;