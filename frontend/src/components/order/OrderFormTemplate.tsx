import React from 'react';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import OrderForm from './OrderForm';
import { OrderingProduct } from '../../models/orders';
import { MemberAsync } from '../../store/member/reducer';
import { OrderSaveRequestActionPayload } from '../../store/order/action';

interface OrderFormTemplateProps {
    memberAsync: MemberAsync;
    orderingProductList: OrderingProduct[];
    saveOrder: (payload: OrderSaveRequestActionPayload) => void;
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