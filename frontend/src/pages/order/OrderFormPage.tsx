import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import OrderForm from '../../components/order/OrderForm';
import useDetail from '../../hooks/common/useDetail';
import { MemberDetailResult } from '../../models/members';
import { OrderingProduct, OrderSavePayload } from '../../models/orders';
import memberApi from '../../apis/memberApi';
import orderApi from '../../apis/orderApi';
import { RootState } from '../../store';
import { ApiError } from '../../error/ApiError';
import ErrorDetail from '../../components/general/ErrorDetail';

function OrderFormPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const history = useHistory();
    const location = useLocation<{orderingProductList: OrderingProduct[]}>();

    const orderingProductList = location.state ? location.state.orderingProductList : undefined;

    if(!orderingProductList) {
        return <Redirect to={{ pathname: "/" }}/>
    }

    const [memberState] = useDetail<MemberDetailResult>(loginMember.id, memberApi.findOne);

    const onSaveOrder = useCallback((payload: OrderSavePayload) => { 
        orderApi.save(payload)
            .then(savedOrder => {
                history.push(`/order/${savedOrder.id}`);
            })
            .catch((error: ApiError) => {
                
            });
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