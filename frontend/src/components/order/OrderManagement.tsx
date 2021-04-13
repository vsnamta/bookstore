import React, { useCallback } from 'react';
import useModal from '../../hooks/useModal';
import { SearchCriteria } from '../../models/common';
import { AsyncOrder, AsyncOrderPage, OrderUpdateAsyncPayload } from '../../models/order/store';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import OrderDetailModal from './OrderDetailModal';
import OrderList from './OrderList';
import OrderManagementBar from './OrderManagementBar';

interface OrderManagementProps {
    asyncOrderPage: AsyncOrderPage;
    asyncOrder: AsyncOrder;
    selectOrder: (id: number) => void;
    updateOrder: (payload: OrderUpdateAsyncPayload) => void;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function OrderManagement({ 
    asyncOrderPage, asyncOrder, selectOrder, updateOrder, onUpdateSearchCriteria, onPageChange 
}: OrderManagementProps) {
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        selectOrder(id);
        openUpdateModal();
    }, []);

    return (
        <>
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
        </>
    )
};

export default React.memo(OrderManagement);