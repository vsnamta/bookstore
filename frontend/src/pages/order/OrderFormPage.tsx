import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import OrderFormTemplate from '../../components/order/OrderFormTemplate';
import { MyData } from '../../models/auths';
import { OrderingProduct } from '../../models/orders';
import { RootState } from '../../store';
import { createMemberFindAction } from '../../store/member/action';
import { createOrderSaveRequestAction, OrderSaveRequestActionPayload } from '../../store/order/action';

function OrderFormPage() {
    const location = useLocation<{orderingProductList: OrderingProduct[]}>();

    const orderingProductList = location.state ? location.state.orderingProductList : undefined;

    if(!orderingProductList) {
        return <Redirect to={{ pathname: "/" }}/>
    }

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const memberAsync = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(createMemberFindAction(loginMember.id));
    }, []);

    const saveOrder = useCallback((payload: OrderSaveRequestActionPayload) => {
        dispatch(createOrderSaveRequestAction(payload));
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