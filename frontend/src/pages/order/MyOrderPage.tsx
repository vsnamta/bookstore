import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindPayload } from '../../models/common';
import { LoginMember } from '../../models/members';
import { RootState } from '../../store';
import { createFindOrderAction, createFindOrderPageAction, createUpdateOrderAction, OrderUpdateActionPayload } from '../../store/order/action';
import MyOrderTemplate from '../../components/order/MyOrderTemplate';

function MyOrderPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
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
        dispatch(createUpdateOrderAction(payload));
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