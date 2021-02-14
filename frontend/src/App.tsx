import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CartManagementPage from './pages/cart/CartManagementPage';
import CategoryManagementPage from './pages/category/CategoryManagementPage';
import DiscountPolicyManagementPage from './pages/discountPolicy/DiscountPolicyManagementPage';
import LoginPage from './pages/general/LoginPage';
import LoginSuccessPage from './pages/general/LoginSuccessPage';
import LogoutSuccessPage from './pages/general/LogoutSuccessPage';
import MainPage from './pages/general/MainPage';
import NotFoundPage from './pages/general/NotFoundPage';
import MemberManagementPage from './pages/member/MemberManagementPage';
import MyDataPage from './pages/member/MyDataPage';
import MyOrderPage from './pages/order/MyOrderPage';
import OrderDetailPage from './pages/order/OrderDetailPage';
import OrderFormPage from './pages/order/OrderFormPage';
import OrderManagementPage from './pages/order/OrderManagementPage';
import MyPointHistoryPage from './pages/point/MyPointHistoryPage';
import ProductDetailPage from './pages/product/ProductDetailPage';
import ProductListPage from './pages/product/ProductListPage';
import ProductManagementDetailPage from './pages/product/ProductManagementDetailPage';
import ProductManagementPage from './pages/product/ProductManagementPage';
import ProductSavePage from './pages/product/ProductSavePage';
import ProductUpdatePage from './pages/product/ProductUpdatePage';
import MyReviewPage from './pages/review/MyReviewPage';

function App() {
  return (
      <Switch>
        <Route path="/" component={MainPage} exact={true} />
        <Route path="/login" component={LoginPage} />
        <Route path="/loginSuccess" component={LoginSuccessPage} />
        <Route path="/logoutSuccess" component={LogoutSuccessPage} />
        <Route path="/myData" component={MyDataPage} />
        <Route path="/myPointHistory" component={MyPointHistoryPage} />
        <Route path="/myOrder" component={MyOrderPage} />
        <Route path="/myReview" component={MyReviewPage} />
        <Route path="/cart" component={CartManagementPage} />
        <Route path="/product/list" component={ProductListPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/order/form" component={OrderFormPage} />
        <Route path="/order/:id" component={OrderDetailPage} />
        <Route path="/admin/discountPolicy" component={DiscountPolicyManagementPage} />
        <Route path="/admin/category" component={CategoryManagementPage} />
        <Route path="/admin/product/save" component={ProductSavePage} />
        <Route path="/admin/product/update/:id" component={ProductUpdatePage} />
        <Route path="/admin/product/list" component={ProductManagementPage} />
        <Route path="/admin/product/:id" component={ProductManagementDetailPage} />
        <Route path="/admin/order" component={OrderManagementPage} />
        <Route path="/admin/member" component={MemberManagementPage} />
        <Route component={NotFoundPage} />
      </Switch>
  );
}

export default App;