import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { OrderingProduct } from '../models/orders';

const SET_ORDERING_PRODUCT_LIST = 'order/SET_ORDERING_PRODUCT_LIST';

export const setOrderingProductList = createAction(SET_ORDERING_PRODUCT_LIST)<OrderingProduct[]>();

export const actions = { setOrderingProductList };

type OrderingProductListAction = ActionType<typeof actions>;

interface OrderingProductListState {
    orderingProductList: OrderingProduct[];
}

const initialState: OrderingProductListState = {
    orderingProductList : []
};

export default createReducer<OrderingProductListState, OrderingProductListAction>(initialState, {
    [SET_ORDERING_PRODUCT_LIST]: (state, action) => ({
        orderingProductList: action.payload
    })
});