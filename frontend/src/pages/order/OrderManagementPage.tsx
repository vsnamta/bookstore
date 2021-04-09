import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderManagementTemplate from '../../components/order/OrderManagementTemplate';
import { FindPayload, SearchCriteria } from '../../models/common';
import { OrderUpdateAsyncPayload } from '../../models/order/store';
import { RootState, rootActions } from '../../store';

function OrderManagementPage() {
    const dispatch = useDispatch();
    const { asyncOrderPage, asyncOrder } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(rootActions.fetchOrderPage({
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const selectOrder = useCallback((id: number) => {
        dispatch(rootActions.fetchOrder(id));
    }, []);

    const updateOrder = useCallback((payload: OrderUpdateAsyncPayload) => {
        dispatch(rootActions.updateOrderAsync(payload));
    }, []);

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(rootActions.fetchOrderPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchOrderPage({
            ...asyncOrderPage.payload as FindPayload,
            pageCriteria: {
                ...(asyncOrderPage.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncOrderPage.payload]);

    return (
        <OrderManagementTemplate 
            asyncOrderPage={asyncOrderPage}
            asyncOrder={asyncOrder}
            selectOrder={selectOrder}
            updateOrder={updateOrder}
            onUpdateSearchCriteria={onUpdateSearchCriteria}
            onPageChange={onPageChange}
        />
    )
};

export default OrderManagementPage;