import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import CartManagement from '../../components/cart/CartManagement';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import useCartManagement from '../../hooks/cart/useCartManagement';
import { OrderingProduct } from '../../models/orders';
import { RootState } from '../../store';

function CartManagementPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const history = useHistory();

    const [cartManagementState, useCartManagementMethods] = useCartManagement(loginMember.id);
    const {cartListState} = cartManagementState;
    const {updateCart, removeCart} = useCartManagementMethods;

    const onPurchase = useCallback((orderingProductList: OrderingProduct[]) => {
        history.push("/order/form", { orderingProductList });
    }, []);
    
    return (
        <Layout>
            {cartListState.error && <ErrorDetail message={"오류 발생"} />}
            
            {cartListState.result && 
            <CartManagement 
                cartList={cartListState.result} 
                onUpdateCart={updateCart} 
                onRemoveCart={removeCart}
                onPurchase={onPurchase}
            />}
        </Layout>
    )
};

export default CartManagementPage;