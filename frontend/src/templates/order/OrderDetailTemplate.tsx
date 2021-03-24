import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import OrderDetail from '../../components/order/OrderDetail';
import { ApiError } from '../../error/ApiError';
import { OrderDetailResult } from '../../models/orders';

interface OrderDetailTemplateProps {
    orderAsync?: {
        payload?: number | undefined;
        result?: OrderDetailResult | undefined;
        error?: ApiError | undefined;
    };
}

function OrderDetailTemplate({ orderAsync }: OrderDetailTemplateProps) {
    return (
        <Layout>
            <OrderDetail order={orderAsync?.result} />
            {orderAsync?.error && <ErrorDetail message={orderAsync.error.message} />}
        </Layout>
    )
};

export default OrderDetailTemplate;