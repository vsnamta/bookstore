import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, rootActions } from '../../store';
import OrderDetailTemplate from '../../components/order/OrderDetailTemplate';

function OrderDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const asyncOrder = useSelector((state: RootState) => state.orders.asyncOrder);

    useEffect(() => {
        dispatch(rootActions.fetchOrder(Number.parseInt(id)));
    }, []);

    return (
        <OrderDetailTemplate 
            asyncOrder={asyncOrder}
        />
    )
};

export default OrderDetailPage;