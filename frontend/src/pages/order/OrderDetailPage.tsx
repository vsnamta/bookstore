import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import OrderDetail from '../../components/order/OrderDetail';
import useDetail from '../../hooks/common/useDetail';
import { OrderDetailResult } from '../../models/orders';
import orderService from '../../services/orderService';

function OrderDetailPage() {
    const { id } = useParams<{id: string}>();
    const [orderState] = useDetail<OrderDetailResult>(Number.parseInt(id), orderService.findOne);
    
    return (
        <Layout>
            { orderState.result && <OrderDetail order={orderState.result} /> }
        </Layout>
    )
};

export default OrderDetailPage;