import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import OrderDetailModal from '../../components/order/OrderDetailModal';
import OrderList from '../../components/order/OrderList';
import OrderManagementBar from '../../components/order/OrderManagementBar';
import useModal from '../../hooks/useModal';
import { FindPayload, SearchCriteria } from '../../models/common';
import { OrderUpdatePayload } from '../../models/orders';
import { RootState } from '../../store';
import { findOrder, findOrderPage, updateOrder } from '../../store/order/action';

function OrderManagementPage() {
    const dispatch = useDispatch();
    const { orderPageAsync, orderAsync } = useSelector((state: RootState) => ({
        orderPageAsync: state.orders.orderPageAsync,
        orderAsync: state.orders.orderAsync
    }));

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
            onFailure: error => alert(`오류발생 = ${error.message}`)
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
            ...orderPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(orderPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [orderPageAsync.payload]);

    return (
        <AdminLayout>
            <Title content={"주문 관리"} />
            <OrderManagementBar
                searchCriteria={orderPageAsync.payload?.searchCriteria} 
                onUpdateSearchCriteria={onUpdateSearchCriteria}
            />
            <OrderList 
                orderList={orderPageAsync.result?.list}
                onSelectOrder={onSelectOrder}
                onUpdateOrder={onUpdateOrder} 
            />
            <Pagination
                page={orderPageAsync.payload?.pageCriteria.page} 
                totalCount={orderPageAsync.result?.totalCount}
                onPageChange={onPageChange}
            />
            {orderPageAsync.error && <ErrorDetail message={orderPageAsync.error.message} />}
            <OrderDetailModal 
                order={orderAsync.result}
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default OrderManagementPage;