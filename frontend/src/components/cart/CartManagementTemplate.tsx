import React from 'react';
import { CartCheckPayload, AsyncCartList, CartRemoveAsyncPayload, CartUpdateAsyncPayload } from '../../models/cart/store';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import CartManagement from './CartManagement';

interface CartManagementTemplateProps {
    asyncCartList: AsyncCartList;
    updateCart: (payload: CartUpdateAsyncPayload) => void;
    removeCart: (payload: CartRemoveAsyncPayload) => void;
    checkAllCart: (checked: boolean) => void;
    checkCart: (payload: CartCheckPayload) => void;
}

function CartManagementTemplate({ asyncCartList, updateCart, removeCart, checkAllCart, checkCart }: CartManagementTemplateProps) {
    return (
        <Layout>
            <CartManagement 
                cartList={asyncCartList.result} 
                onUpdateCart={updateCart} 
                onRemoveCart={removeCart}
                onCheckAllCart={checkAllCart}
                onCheckCart={checkCart}
            />
            {asyncCartList.error && <ErrorDetail message={asyncCartList.error.message} />}
        </Layout>
    )
};

export default CartManagementTemplate;