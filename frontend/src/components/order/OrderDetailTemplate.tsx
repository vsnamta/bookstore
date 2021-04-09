import React from 'react';
import { AsyncOrder } from '../../models/order/store';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import OrderDetail from './OrderDetail';

interface OrderDetailTemplateProps {
    asyncOrder: AsyncOrder;
}

function OrderDetailTemplate({ asyncOrder }: OrderDetailTemplateProps) {
    return (
        <Layout>
            <OrderDetail order={asyncOrder.result} />
            {asyncOrder.error && <ErrorDetail message={asyncOrder.error.message} />}
        </Layout>
    )
};

export default OrderDetailTemplate;