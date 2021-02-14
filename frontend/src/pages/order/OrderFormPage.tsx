import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import OrderForm from '../../components/order/OrderForm';
import useDetail from '../../hooks/common/useDetail';
import { MemberDetailResult } from '../../models/members';
import { OrderingProduct, OrderSavePayload } from '../../models/orders';
import memberService from '../../services/memberService';
import orderService from '../../services/orderService';
import { RootState } from '../../store';

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

    const [memberState] = useDetail<MemberDetailResult>(loginMember.id, memberService.findOne);

    const onSaveOrder = useCallback((payload: OrderSavePayload) => { 
        orderService.save(payload)
            .then(id => {
                history.push(`/order/${id}`);
            });
    }, []);
    
    return (
        <Layout>
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