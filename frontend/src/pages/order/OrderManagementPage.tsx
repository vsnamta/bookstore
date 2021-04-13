import React from 'react';
import AdminLayout from '../../components/common/AdminLayout';
import Title from '../../components/general/Title';
import OrderManagementContainer from '../../container/order/OrderManagementContainer';

function OrderManagementPage() {
    return (
        <AdminLayout>
            <Title content={"주문 관리"} />
            <OrderManagementContainer />
        </AdminLayout>
    )
};

export default OrderManagementPage;