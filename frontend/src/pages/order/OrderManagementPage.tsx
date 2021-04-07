import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderManagementTemplate from '../../components/order/OrderManagementTemplate';
import { FindPayload, SearchCriteria } from '../../models/common';
import { OrderUpdateAsyncPayload } from '../../models/order/store';
import { RootState } from '../../store';
import { actions } from '../../store/order';

function OrderManagementPage() {
    const dispatch = useDispatch();
    const { orderPageAsync, orderAsync } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(actions.fetchOrderPage({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectOrder = useCallback((id: number) => {
        dispatch(actions.fetchOrder(id));
    }, []);

    const updateOrder = useCallback((payload: OrderUpdateAsyncPayload) => {
        dispatch(actions.updateOrderAsync(payload));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(actions.fetchOrderPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
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