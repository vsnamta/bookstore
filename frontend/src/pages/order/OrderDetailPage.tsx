import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import OrderDetail from '../../components/order/OrderDetail';
import useDetail from '../../hooks/common/useDetail';
import { OrderDetailResult } from '../../models/orders';
import orderApi from '../../apis/orderApi';
import ErrorDetail from '../../components/general/ErrorDetail';

function OrderDetailPage() {
    const { id } = useParams<{id: string}>();
    const [orderState] = useDetail<OrderDetailResult>(Number.parseInt(id), orderApi.findOne);
    
    return (
        <Layout>
            {orderState.error && <ErrorDetail message={"오류 발생"} />}
            {orderState.result && <OrderDetail order={orderState.result} />}
        </Layout>
    )
};

export default OrderDetailPage;