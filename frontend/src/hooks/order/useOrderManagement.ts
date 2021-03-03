import { useCallback } from "react";
import { Page, PageCriteria, SearchCriteria } from "../../models/common";
import { OrderDetailResult, OrderResult, OrderUpdatePayload } from "../../models/orders";
import orderApi from "../../apis/orderApi";
import useDetail, { DetailState } from "../common/useDetail";
import usePage, { PageState } from "../common/usePage";
import { ApiError } from "../../error/ApiError";

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
    ] = usePage<OrderResult>(initialSearchCriteria, orderApi.findAll);

    const [orderState, setOrder, selectOrder] = useDetail<OrderDetailResult>(undefined, orderApi.findOne);

    const updateOrder = useCallback((id: number, payload: OrderUpdatePayload) => {
        return orderApi.update(id, payload)
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
            })
            .catch((error: ApiError) => {
                
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