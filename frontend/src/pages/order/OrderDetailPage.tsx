import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, rootActions } from '../../store';
import OrderDetailTemplate from '../../container/order/OrderDetailContainer';
import Layout from '../../components/common/Layout';
import OrderDetailContainer from '../../container/order/OrderDetailContainer';

function OrderDetailPage() {
    return (
        <Layout>
            <OrderDetailContainer />
        </Layout>
    )
};

export default OrderDetailPage;