import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import OrderForm from '../../components/order/OrderForm';
import { OrderingProduct, OrderSavePayload } from '../../models/orders';
import { RootState } from '../../store';
import { findMember } from '../../store/member/action';
import { saveOrder } from '../../store/order/action';

function OrderFormPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const history = useHistory();
    const location = useLocation<{orderingProductList: OrderingProduct[]}>();

    const orderingProductList = location.state ? location.state.orderingProductList : undefined;

    if(!orderingProductList) {
        return <Redirect to={{ pathname: "/" }}/>
    }

    const dispatch = useDispatch();

    const memberState = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(findMember(loginMember.id));
    }, []);

    const onSaveOrder = useCallback((payload: OrderSavePayload) => {
        dispatch(saveOrder({
            payload: payload,
            onSuccess: order => history.push(`/order/${order.id}`),
            onFailure: error => {}
        }));
    }, []);
    
    return (
        <Layout>
            {memberState.error && <ErrorDetail message={"오류 발생"} />}
            {memberState.result &&
            <OrderForm 
                member={memberState.result}
                orderingProductList={orderingProductList} 
                onSaveOrder={onSaveOrder} 
            />}
        </Layout>
    )
};

export default OrderFormPage;