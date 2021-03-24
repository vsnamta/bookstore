import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import RestrictRoute from './components/common/RestrictRoute';
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
import { RootState } from './store';

function App() {
  const loginMember = useSelector((state: RootState) => state.members.loginMember);
  const hasUserRole = !!loginMember;
  const hasAdminRole = !!loginMember && loginMember.role === "ADMIN";

  return (
      <Switch>
        <RestrictRoute path="/" component={MainPage} exact={true} isAllow={true} />
        <RestrictRoute path="/login" component={LoginPage} isAllow={true} />
        <RestrictRoute path="/loginSuccess" component={LoginSuccessPage} isAllow={true} />
        <RestrictRoute path="/logoutSuccess" component={LogoutSuccessPage} isAllow={true} />
        <RestrictRoute path="/myData" component={MyDataPage} isAllow={hasUserRole} />
        <RestrictRoute path="/myPointHistory" component={MyPointHistoryPage} isAllow={hasUserRole} />
        <RestrictRoute path="/myOrder" component={MyOrderPage} isAllow={hasUserRole} />
        <RestrictRoute path="/myReview" component={MyReviewPage} isAllow={hasUserRole} />
        <RestrictRoute path="/cart" component={CartManagementPage} isAllow={hasUserRole} />
        <RestrictRoute path="/product/list" component={ProductListPage} isAllow={true} />
        <RestrictRoute path="/product/:id" component={ProductDetailPage} isAllow={true} />
        <RestrictRoute path="/order/form" component={OrderFormPage} isAllow={hasUserRole} />
        <RestrictRoute path="/order/:id" component={OrderDetailPage} isAllow={hasUserRole} />
        <RestrictRoute path="/admin/discountPolicy" component={DiscountPolicyManagementPage} isAllow={hasAdminRole} />
        <RestrictRoute path="/admin/category" component={CategoryManagementPage} isAllow={hasAdminRole} />
        <RestrictRoute path="/admin/product/save" component={ProductSavePage} isAllow={hasAdminRole} />
        <RestrictRoute path="/admin/product/update/:id" component={ProductUpdatePage} isAllow={hasAdminRole} />
        <RestrictRoute path="/admin/product/list" component={ProductManagementPage} isAllow={hasAdminRole} />
        <RestrictRoute path="/admin/product/:id" component={ProductManagementDetailPage} isAllow={hasAdminRole} />
        <RestrictRoute path="/admin/order" component={OrderManagementPage} isAllow={hasAdminRole} />
        <RestrictRoute path="/admin/member" component={MemberManagementPage} isAllow={hasAdminRole} />
        <RestrictRoute component={NotFoundPage} isAllow={hasAdminRole} />
      </Switch>
  );
}

export default App;