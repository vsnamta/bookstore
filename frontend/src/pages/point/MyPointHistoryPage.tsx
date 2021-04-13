import React from 'react';
import Layout from '../../components/common/Layout';
import MyPageLayout from '../../components/common/MyPageLayout';
import MyPointHistoryManagementContainer from '../../container/pointHistory/MyPointHistoryManagementContainer';

function MyPointHistoryPage() {
    return (
        <Layout>
            <MyPageLayout>
                <h3>포인트내역</h3>
                <MyPointHistoryManagementContainer />
            </MyPageLayout>                       
        </Layout>
    )
};

export default MyPointHistoryPage;