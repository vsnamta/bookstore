import React, { useCallback } from 'react';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import OrderDetailModal from './OrderDetailModal';
import OrderList from './OrderList';
import { ApiError } from '../../error/ApiError';
import useModal from '../../hooks/useModal';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { OrderUpdateActionPayload } from '../../store/order/action';
import { OrderAsync, OrderPageAsync } from '../../store/order/reducer';

interface MyOrderTemplateProps {
    orderPageAsync: OrderPageAsync;
    orderAsync: OrderAsync;
    selectOrder: (id: number) => void;
    updateOrder: (payload: OrderUpdateActionPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MyOrderTemplate({ orderPageAsync, orderAsync, selectOrder, updateOrder, onPageChange }: MyOrderTemplateProps) {
    const [updateModalIsOpen, openUpdateModal, closeUpdateModal] = useModal();

    const onSelectOrder = useCallback((id: number) => {
        selectOrder(id);
        openUpdateModal();
    }, []);

    return (
        <Layout>
            <MyPageLayout>
                <h3>주문내역</h3>
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
            </MyPageLayout>
        </Layout>
    )
};

export default MyOrderTemplate;