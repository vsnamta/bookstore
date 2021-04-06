import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyOrderTemplate from '../../components/order/MyOrderTemplate';
import { MyData } from '../../models/auths';
import { FindPayload } from '../../models/common';
import { RootState } from '../../store';
import { createOrderFindAction, createOrderPageFindAction, createOrderUpdateRequestAction, OrderUpdateRequestActionPayload } from '../../store/order/action';

function MyOrderPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const { orderPageAsync, orderAsync } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(createOrderPageFindAction({
            searchCriteria: { 
                column: "memberId", 
                keyword: loginMember.id + ""
             },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectOrder = useCallback((id: number) => {
        dispatch(createOrderFindAction(id));
    }, []);

    const updateOrder = useCallback((payload: OrderUpdateRequestActionPayload) => {
        dispatch(createOrderUpdateRequestAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createOrderPageFindAction({
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