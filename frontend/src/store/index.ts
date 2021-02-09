import { combineReducers } from "redux";
import loginMember from "./loginMember";
import menuCategoryList from "./menuCategoryList";
import orderingProductList from "./orderingProductList";
import product from "./product";
import productPage from "./productPage";

const rootReducer = combineReducers({
    loginMember,
    menuCategoryList,
    orderingProductList,
    product,
    productPage
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;