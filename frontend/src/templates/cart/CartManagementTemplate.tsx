import React from 'react';
import CartManagement from '../../components/cart/CartManagement';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import { ApiError } from '../../error/ApiError';
import { CartResult, CartUpdatePayload } from '../../models/carts';
import { OrderingProduct } from '../../models/orders';

interface CartManagementTemplateProps {
    cartListAsync?: {
        result?: CartResult[] | undefined;
        error?: ApiError | undefined;
    };
    onUpdateCart: (id: number, payload: CartUpdatePayload) => void;
    onRemoveCart: (ids: number[]) => void;
    onCheckAllCart: (checked: boolean) => void;
    onCheckCart: (id: number, checked: boolean) => void;
    onPurchase: (orderingProductList: OrderingProduct[]) => void;
}

function CartManagementTemplate({ cartListAsync, onUpdateCart, onRemoveCart, onCheckAllCart, onCheckCart, onPurchase }: CartManagementTemplateProps) {
    return (
        <Layout>
            <CartManagement 
                cartList={cartListAsync?.result} 
                onUpdateCart={onUpdateCart} 
                onRemoveCart={onRemoveCart}
                onCheckAllCart={onCheckAllCart}
                onCheckCart={onCheckCart}
                onPurchase={onPurchase}
            />
            {cartListAsync?.error && <ErrorDetail message={cartListAsync.error.message} />}
        </Layout>
    )
};

export default CartManagementTemplate;