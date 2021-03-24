import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import OrderDetailModal from '../../components/order/OrderDetailModal';
import OrderList from '../../components/order/OrderList';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult, OrderUpdatePayload } from '../../models/orders';

interface MyOrderTemplateProps {
    orderPageAsync?: {
        payload?: FindPayload | undefined;
        result?: Page<OrderResult> | undefined;
        error?: ApiError | undefined;
    };
    orderAsync?: {
        payload?: number | undefined;
        result?: OrderDetailResult | undefined;
        error?: ApiError | undefined;
    };
    updateModalIsOpen: boolean;
    onSelectOrder: (id: number) => void;
    onUpdateOrder: (id: number, payload: OrderUpdatePayload) => void;
    closeUpdateModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function MyOrderTemplate({ 
    orderPageAsync, orderAsync, updateModalIsOpen,
    onSelectOrder, onUpdateOrder, closeUpdateModal, onPageChange
}: MyOrderTemplateProps) {
    return (
        <Layout>
            <MyPageLayout>
                <h3>주문내역</h3>
                <OrderList 
                    orderList={orderPageAsync?.result?.list}
                    onSelectOrder={onSelectOrder} 
                    onUpdateOrder={onUpdateOrder} 
                />
                <Pagination
                    page={orderPageAsync?.payload?.pageCriteria.page}  
                    totalCount={orderPageAsync?.result?.totalCount}
                    onPageChange={onPageChange}
                />
                {orderPageAsync?.error && <ErrorDetail message={orderPageAsync.error.message} />}
                <OrderDetailModal 
                    order={orderAsync?.result}
                    isOpen={updateModalIsOpen}
                    onRequestClose={closeUpdateModal}
                />
            </MyPageLayout>
        </Layout>
    )
};

export default MyOrderTemplate;