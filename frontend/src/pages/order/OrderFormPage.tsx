import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import OrderFormTemplate from '../../components/order/OrderFormTemplate';
import { MyData } from '../../models/auth';
import { OrderingProduct } from '../../models/order';
import { OrderSaveAsyncPayload } from '../../models/order/store';
import { RootState } from '../../store';
import { actions as memberActions } from '../../store/member';
import { actions as orderActions } from '../../store/order';

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
        dispatch(memberActions.fetchMember(loginMember.id));
    }, []);

    const saveOrder = useCallback((payload: OrderSaveAsyncPayload) => {
        dispatch(orderActions.saveOrderAsync(payload));
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