import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyOrderTemplate from '../../components/order/MyOrderTemplate';
import { MyData } from '../../models/auth';
import { FindPayload } from '../../models/common';
import { OrderUpdateAsyncPayload } from '../../models/order/store';
import { RootState } from '../../store';
import { actions } from '../../store/order';

function MyOrderPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const { orderPageAsync, orderAsync } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(actions.fetchOrderPage({
            searchCriteria: { column: "memberId", keyword: loginMember.id + "" },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectOrder = useCallback((id: number) => {
        dispatch(actions.fetchOrder(id));
    }, []);

    const updateOrder = useCallback((payload: OrderUpdateAsyncPayload) => {
        dispatch(actions.updateOrderAsync(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(actions.fetchOrderPage({
            ...orderPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(orderPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [orderPageAsync.payload]);

    return (
        <MyOrderTemplate 
            orderPageAsync={orderPageAsync}
            orderAsync={orderAsync}
            selectOrder={selectOrder}
            updateOrder={updateOrder}
            onPageChange={onPageChange}
        />
    )
};

export default MyOrderPage;