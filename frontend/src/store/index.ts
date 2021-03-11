import { all } from "@redux-saga/core/effects";
import { combineReducers } from "redux";
import carts from "./cart/reducer";
import cartsSaga from "./cart/saga";
import categories from "./category/reducer";
import categoriesSaga from "./category/saga";
import discountPolcies from "./discountPolicy/reducer";
import discountPoliciesSaga from "./discountPolicy/saga";
import members from "./member/reducer";
import membersSaga from "./member/saga";
import orders from "./order/reducer";
import ordersSaga from "./order/saga";
import pointHistories from "./pointHistory/reducer";
import pointHistoriesSaga from "./pointHistory/saga";
import products from "./product/reducer";
import productsSaga from "./product/saga";
import reviews from "./review/reducer";
import reviewsSaga from "./review/saga";
import stocks from "./stock/reducer";
import stocksSaga from "./stock/saga";

const rootReducer = combineReducers({
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