import { combineReducers } from "redux";
import loginMember from "./loginMember";
import menuCategoryList from "./menuCategoryList";
import product from "./product";
import productPage from "./productPage";

const rootReducer = combineReducers({
    loginMember,
    menuCategoryList,
    product,
    productPage
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;