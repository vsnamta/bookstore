import { useCallback } from "react";
import { Page, PageCriteria, SearchCriteria } from "../../models/common";
import { OrderDetailResult, OrderResult, OrderUpdatePayload } from "../../models/orders";
import orderService from "../../services/orderService";
import useDetail, { DetailState } from "../common/useDetail";
import usePage, { PageState } from "../common/usePage";

interface OrderManagementState {
    orderPageState: PageState<OrderResult>;
    orderState: DetailState<OrderDetailResult>;
}

interface UseOrderManagementMethods {
    updateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    updatePageCriteria: (pageCriteria: PageCriteria) => void;
    selectOrder: (id: number) => void;
    updateOrder: (id: number, payload: OrderUpdatePayload) => Promise<void>;
}

function useOrderManagement(initialSearchCriteria: SearchCriteria): [ 
    OrderManagementState, 
    UseOrderManagementMethods 
] {
    const [
        orderPageState, 
        setOrderPage, 
        updateSearchCriteria, 
        updatePageCriteria
    ] = usePage<OrderResult>(initialSearchCriteria, orderService.findAll);

    const [orderState, setOrder, selectOrder] = useDetail<OrderDetailResult>(undefined, orderService.findOne);

    const updateOrder = useCallback((id: number, payload: OrderUpdatePayload) => {
        return orderService.update(id, payload)
            .then(updatedOrder => {        
                setOrderPage(orderPage => ({
                    ...orderPage as Page<OrderResult>,
                    list: (orderPage as Page<OrderResult>).list
                        .map(order => 
                            order.id === updatedOrder.id
                                ? { ...order, statusName: updatedOrder.statusName } 
                                : order
                        )
                }));
            });
    }, []);

    return [{
        orderPageState,
        orderState
    }, {
        updateSearchCriteria,
        updatePageCriteria,
        selectOrder,
        updateOrder
    }];
}

export default useOrderManagement;