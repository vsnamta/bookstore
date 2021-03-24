import React from 'react';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import OrderDetail from './OrderDetail';
import { OrderAsync } from '../../store/order/reducer';

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