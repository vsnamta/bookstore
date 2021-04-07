import React from 'react';
import { CartCheckPayload, CartListAsync, CartRemoveAsyncPayload, CartUpdateAsyncPayload } from '../../models/cart/store';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import CartManagement from './CartManagement';

interface CartManagementTemplateProps {
    cartListAsync: CartListAsync;
    updateCart: (payload: CartUpdateAsyncPayload) => void;
    removeCart: (payload: CartRemoveAsyncPayload) => void;
    checkAllCart: (checked: boolean) => void;
    checkCart: (payload: CartCheckPayload) => void;
}

function CartManagementTemplate({ cartListAsync, updateCart, removeCart, checkAllCart, checkCart }: CartManagementTemplateProps) {
    return (
        <Layout>
            <CartManagement 
                cartList={cartListAsync.result} 
                onUpdateCart={updateCart} 
                onRemoveCart={removeCart}
                onCheckAllCart={checkAllCart}
                onCheckCart={checkCart}
            />
            {cartListAsync.error && <ErrorDetail message={cartListAsync.error.message} />}
        </Layout>
    )
};

export default CartManagementTemplate;