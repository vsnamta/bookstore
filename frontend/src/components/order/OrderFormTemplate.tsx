import React from 'react';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import OrderForm from './OrderForm';
import { OrderingProduct } from '../../models/order';
import { OrderSaveAsyncPayload } from '../../models/order/store';
import { AsyncMember } from '../../models/member/store';

interface OrderFormTemplateProps {
    asyncMember: AsyncMember;
    orderingProductList: OrderingProduct[];
    saveOrder: (payload: OrderSaveAsyncPayload) => void;
}

function OrderFormTemplate({ asyncMember, orderingProductList, saveOrder }: OrderFormTemplateProps) {
    return (
        <Layout>
            <OrderForm 
                member={asyncMember.result}
                orderingProductList={orderingProductList} 
                onSaveOrder={saveOrder} 
            />
            {asyncMember.error && <ErrorDetail message={asyncMember.error.message} />}
        </Layout>
    )
};

export default OrderFormTemplate;