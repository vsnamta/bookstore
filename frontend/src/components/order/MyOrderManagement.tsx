import React, { useCallback } from 'react';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import OrderDetailModal from './OrderDetailModal';
import OrderList from './OrderList';
import useModal from '../../hooks/useModal';
import { OrderUpdateAsyncPayload } from '../../models/order/store';
import { AsyncOrder, AsyncOrderPage } from '../../models/order/store';

interface MyOrderManagementProps {
    asyncOrderPage: AsyncOrderPage;
    asyncOrder: AsyncOrder;
    selectOrder: (id: number) => void;
    updateOrder: (payload: OrderUpdateAsyncPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MyOrderManagement({ asyncOrderPage, asyncOrder, selectOrder, updateOrder, onPageChange }: MyOrderManagementProps) {
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        selectOrder(id);
        openUpdateModal();
    }, []);

    return (
        <>
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

export default React.memo(MyOrderManagement);