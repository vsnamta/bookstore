import { all } from "@redux-saga/core/effects";
import { combineReducers } from "redux";
import auths, { actions as authActions } from "./auth";
import authsSaga from "./auth/saga";
import carts, { actions as cartActions }  from "./cart";
import cartsSaga from "./cart/saga";
import categories, { actions as categoryActions } from "./category";
import categoriesSaga from "./category/saga";
import discountPolcies, { actions as discountPolicyActions } from "./discountPolicy";
import discountPoliciesSaga from "./discountPolicy/saga";
import members, { actions as memberActions } from "./member";
import membersSaga from "./member/saga";
import orders, { actions as orderActions } from "./order";
import ordersSaga from "./order/saga";
import pointHistories, { actions as pointHistoryActions } from "./pointHistory";
import pointHistoriesSaga from "./pointHistory/saga";
import products, { actions as productActions } from "./product";
import productsSaga from "./product/saga";
import reviews, { actions as reviewActions } from "./review";
import reviewsSaga from "./review/saga";
import stocks, { actions as stockActions } from "./stock";
import stocksSaga from "./stock/saga";

export const rootActions = {
    ...authActions,
    ...cartActions,
    ...categoryActions,
    ...discountPolicyActions,
    ...memberActions,
    ...orderActions,
    ...pointHistoryActions,
    ...productActions,
    ...reviewActions,
    ...stockActions
};

const rootReducer = combineReducers({
    auths,
    carts,
    categories,
    discountPolcies,
    members,
    orders,
    pointHistories,
    products,
    reviews,
    stocks
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([
        authsSaga(),
        cartsSaga(),
        categoriesSaga(), 
        discountPoliciesSaga(),
        membersSaga(),
        ordersSaga(),
        pointHistoriesSaga(),
        productsSaga(),
        reviewsSaga(),
        stocksSaga()
    ]);
}

export default rootReducer;