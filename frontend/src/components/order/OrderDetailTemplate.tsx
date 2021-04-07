import React from 'react';
import { OrderAsync } from '../../models/order/store';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import OrderDetail from './OrderDetail';

interface OrderDetailTemplateProps {
    orderAsync: OrderAsync;
}

function OrderDetailTemplate({ orderAsync }: OrderDetailTemplateProps) {
    return (
        <Layout>
            <OrderDetail order={orderAsync.result} />
            {orderAsync.error && <ErrorDetail message={orderAsync.error.message} />}
        </Layout>
    )
};

export default OrderDetailTemplate;