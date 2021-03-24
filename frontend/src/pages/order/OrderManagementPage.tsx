import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindPayload, SearchCriteria } from '../../models/common';
import { RootState } from '../../store';
import { createFindOrderAction, createFindOrderPageAction, createUpdateOrderAction, OrderUpdateActionPayload } from '../../store/order/action';
import OrderManagementTemplate from '../../components/order/OrderManagementTemplate';

function OrderManagementPage() {
    const dispatch = useDispatch();
    const { orderPageAsync, orderAsync } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(createFindOrderPageAction({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectOrder = useCallback((id: number) => {
        dispatch(createFindOrderAction(id));
    }, []);

    const updateOrder = useCallback((payload: OrderUpdateActionPayload) => {
        dispatch(createUpdateOrderAction(payload));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(createFindOrderPageAction({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
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
        <OrderManagementTemplate 
            orderPageAsync={orderPageAsync}
            orderAsync={orderAsync}
            selectOrder={selectOrder}
            updateOrder={updateOrder}
            onUpdateSearchCriteria={onUpdateSearchCriteria}
            onPageChange={onPageChange}
        />
    )
};

export default OrderManagementPage;