import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyOrderTemplate from '../../components/order/MyOrderTemplate';
import { MyData } from '../../models/auths';
import { FindPayload } from '../../models/common';
import { RootState } from '../../store';
import { createFindOrderAction, createFindOrderPageAction, createUpdateOrderRequestAction, OrderUpdateActionPayload } from '../../store/order/action';

function MyOrderPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const { orderPageAsync, orderAsync } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(createFindOrderPageAction({
            searchCriteria: { 
                column: "memberId", 
                keyword: loginMember.id + ""
             },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectOrder = useCallback((id: number) => {
        dispatch(createFindOrderAction(id));
    }, []);

    const updateOrder = useCallback((payload: OrderUpdateActionPayload) => {
        dispatch(createUpdateOrderRequestAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createFindOrderPageAction({
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