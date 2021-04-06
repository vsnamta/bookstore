import React, { useCallback } from 'react';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import AdminLayout from '../common/AdminLayout';
import OrderDetailModal from './OrderDetailModal';
import OrderList from './OrderList';
import OrderManagementBar from './OrderManagementBar';
import { ApiError } from '../../error/ApiError';
import useModal from '../../hooks/useModal';
import { FindPayload, Page, SearchCriteria } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { OrderUpdateRequestActionPayload } from '../../store/order/action';
import { OrderAsync, OrderPageAsync } from '../../store/order/reducer';

interface OrderManagementTemplateProps {
    orderPageAsync: OrderPageAsync;
    orderAsync: OrderAsync;
    selectOrder: (id: number) => void;
    updateOrder: (payload: OrderUpdateRequestActionPayload) => void;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function OrderManagementTemplate({ 
    orderPageAsync, orderAsync, selectOrder, updateOrder, onUpdateSearchCriteria, onPageChange 
}: OrderManagementTemplateProps) {
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        selectOrder(id);
        openUpdateModal();
    }, []);

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
                onUpdateOrder={updateOrder} 
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

export default OrderManagementTemplate;