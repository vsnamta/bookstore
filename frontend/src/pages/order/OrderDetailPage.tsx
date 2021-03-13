import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import OrderDetail from '../../components/order/OrderDetail';
import { RootState } from '../../store';
import { findOrder } from '../../store/order/action';

function OrderDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const orderAsync = useSelector((state: RootState) => state.orders.orderAsync);

    useEffect(() => {
        dispatch(findOrder(Number.parseInt(id)));
    }, []);

    return (
        <Layout>
            <OrderDetail order={orderAsync.result} />
            {orderAsync.error && <ErrorDetail message={orderAsync.error.message} />}
        </Layout>
    )
};

export default OrderDetailPage;