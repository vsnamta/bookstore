import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import OrderDetail from '../../components/order/OrderDetail';
import { RootState } from '../../store';
import { findOrder } from '../../store/order/action';

function OrderDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const orderState = useSelector((state: RootState) => state.orders.orderAsync);

    useEffect(() => {
        dispatch(findOrder(Number.parseInt(id)));
    }, []);

    return (
        <Layout>
            <OrderDetail order={orderState.result} />
            {orderState.error && <ErrorDetail message={"오류 발생"} />}
        </Layout>
    )
};

export default OrderDetailPage;