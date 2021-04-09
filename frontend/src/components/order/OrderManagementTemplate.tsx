import React, { useCallback } from 'react';
import useModal from '../../hooks/useModal';
import { SearchCriteria } from '../../models/common';
import { AsyncOrder, AsyncOrderPage, OrderUpdateAsyncPayload } from '../../models/order/store';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import OrderDetailModal from './OrderDetailModal';
import OrderList from './OrderList';
import OrderManagementBar from './OrderManagementBar';

interface OrderManagementTemplateProps {
    asyncOrderPage: AsyncOrderPage;
    asyncOrder: AsyncOrder;
    selectOrder: (id: number) => void;
    updateOrder: (payload: OrderUpdateAsyncPayload) => void;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function OrderManagementTemplate({ 
    asyncOrderPage, asyncOrder, selectOrder, updateOrder, onUpdateSearchCriteria, onPageChange 
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
                searchCriteria={asyncOrderPage.payload?.searchCriteria} 
                onUpdateSearchCriteria={onUpdateSearchCriteria}
            />
            <OrderList 
                orderList={asyncOrderPage.result?.list}
                onSelectOrder={onSelectOrder}
                onUpdateOrder={updateOrder} 
            />
            <Pagination
                page={asyncOrderPage.payload?.pageCriteria.page} 
                totalCount={asyncOrderPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            {asyncOrderPage.error && <ErrorDetail message={asyncOrderPage.error.message} />}
            <OrderDetailModal 
                order={asyncOrder.result}
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
            />
        </AdminLayout>
    )
};

export default OrderManagementTemplate;