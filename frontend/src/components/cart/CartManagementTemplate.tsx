import React from 'react';
import CartManagement from './CartManagement';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import { CartRemoveRequestActionPayload, CartUpdateRequestActionPayload } from '../../store/cart/action';
import { CartListAsync } from '../../store/cart/reducer';

interface CartManagementTemplateProps {
    cartListAsync: CartListAsync;
    updateCart: (payload: CartUpdateRequestActionPayload) => void;
    removeCart: (payload: CartRemoveRequestActionPayload) => void;
    checkAllCart: (checked: boolean) => void;
    checkCart: (id: number, checked: boolean) => void;
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