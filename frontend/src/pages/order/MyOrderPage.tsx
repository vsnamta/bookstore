import React from 'react';
import Layout from '../../components/common/Layout';
import MyPageLayout from '../../components/common/MyPageLayout';
import MyOrderManagementContainer from '../../container/order/MyOrderManagementContainer';

function MyOrderPage() {
    return (
        <Layout>
            <MyPageLayout>
                <h3>주문내역</h3>
                <MyOrderManagementContainer />
            </MyPageLayout>
        </Layout>
    )
};

export default MyOrderPage;