import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import OrderDetailModal from '../../components/order/OrderDetailModal';
import OrderList from '../../components/order/OrderList';
import OrderManagementBar from '../../components/order/OrderManagementBar';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page, SearchCriteria } from '../../models/common';
import { OrderDetailResult, OrderResult, OrderUpdatePayload } from '../../models/orders';

interface OrderManagementTemplateProps {
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
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function OrderManagementTemplate({
    orderPageAsync, orderAsync, updateModalIsOpen,
    onSelectOrder, onUpdateOrder, closeUpdateModal, onUpdateSearchCriteria, onPageChange
}: OrderManagementTemplateProps) {
    return (
        <AdminLayout>
            <Title content={"주문 관리"} />
            <OrderManagementBar
                searchCriteria={orderPageAsync?.payload?.searchCriteria} 
                onUpdateSearchCriteria={onUpdateSearchCriteria}
            />
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
        </AdminLayout>
    )
};

export default OrderManagementTemplate;