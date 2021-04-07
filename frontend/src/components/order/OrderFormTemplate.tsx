import React from 'react';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import OrderForm from './OrderForm';
import { OrderingProduct } from '../../models/order';
import { OrderSaveAsyncPayload } from '../../models/order/store';
import { MemberAsync } from '../../models/member/store';

interface OrderFormTemplateProps {
    memberAsync: MemberAsync;
    orderingProductList: OrderingProduct[];
    saveOrder: (payload: OrderSaveAsyncPayload) => void;
}

function OrderFormTemplate({ memberAsync, orderingProductList, saveOrder }: OrderFormTemplateProps) {
    return (
        <Layout>
            <OrderForm 
                member={memberAsync.result}
                orderingProductList={orderingProductList} 
                onSaveOrder={saveOrder} 
            />
            {memberAsync.error && <ErrorDetail message={memberAsync.error.message} />}
        </Layout>
    )
};

export default OrderFormTemplate;