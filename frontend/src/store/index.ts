import { all } from "@redux-saga/core/effects";
import { combineReducers } from "redux";
import auths from "./auth";
import authsSaga from "./auth/saga";
import carts from "./cart";
import cartsSaga from "./cart/saga";
import categories from "./category";
import categoriesSaga from "./category/saga";
import discountPolcies from "./discountPolicy";
import discountPoliciesSaga from "./discountPolicy/saga";
import members from "./member";
import membersSaga from "./member/saga";
import orders from "./order";
import ordersSaga from "./order/saga";
import pointHistories from "./pointHistory";
import pointHistoriesSaga from "./pointHistory/saga";
import products from "./product";
import productsSaga from "./product/saga";
import reviews from "./review";
import reviewsSaga from "./review/saga";
import stocks from "./stock";
import stocksSaga from "./stock/saga";

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