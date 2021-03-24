import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { LoginMember } from '../../models/members';
import { OrderingProduct } from '../../models/orders';
import { RootState } from '../../store';
import { createFindMemberAction } from '../../store/member/action';
import { createSaveOrderAction, OrderSaveActionPayload } from '../../store/order/action';
import OrderFormTemplate from '../../components/order/OrderFormTemplate';

function OrderFormPage() {
    const location = useLocation<{orderingProductList: OrderingProduct[]}>();
    const orderingProductList = location.state ? location.state.orderingProductList : undefined;

    if(!orderingProductList) {
        return <Redirect to={{ pathname: "/" }}/>
    }

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
    const memberAsync = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(createFindMemberAction(loginMember.id));
    }, []);

    const saveOrder = useCallback((payload: OrderSaveActionPayload) => {
        dispatch(createSaveOrderAction(payload));
    }, []);
    
    return (
        <OrderFormTemplate 
            memberAsync={memberAsync}
            orderingProductList={orderingProductList}
            saveOrder={saveOrder}
        />
    )
};

export default OrderFormPage;