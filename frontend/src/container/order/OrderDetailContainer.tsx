import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { rootActions, RootState } from '../../store';
import ErrorDetail from '../../components/general/ErrorDetail';
import OrderDetail from '../../components/order/OrderDetail';


function OrderDetailContainer() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const asyncOrder = useSelector((state: RootState) => state.orders.asyncOrder);

    useEffect(() => {
        dispatch(rootActions.fetchOrder(Number.parseInt(id)));
    }, []);

    return (
        <>
            <OrderDetail order={asyncOrder.result} />
            {asyncOrder.error && <ErrorDetail message={asyncOrder.error.message} />}
        </>
    )
};

export default OrderDetailContainer;