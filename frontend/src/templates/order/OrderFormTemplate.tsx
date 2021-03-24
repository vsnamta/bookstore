import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import OrderForm from '../../components/order/OrderForm';
import { ApiError } from '../../error/ApiError';
import { MemberDetailResult } from '../../models/members';
import { OrderingProduct, OrderSavePayload } from '../../models/orders';

interface OrderFormTemplateProps {
    memberAsync?: {
        payload?: number | undefined;
        result?: MemberDetailResult | undefined;
        error?: ApiError | undefined;
    };
    orderingProductList: OrderingProduct[];
    onSaveOrder: (payload: OrderSavePayload) => void;
}

function OrderFormTemplate({ memberAsync, orderingProductList, onSaveOrder }: OrderFormTemplateProps) {
    return (
        <Layout>
            <OrderForm 
                member={memberAsync?.result}
                orderingProductList={orderingProductList} 
                onSaveOrder={onSaveOrder} 
            />
            {memberAsync?.error && <ErrorDetail message={memberAsync.error.message} />}
        </Layout>
    )
};

export default OrderFormTemplate;