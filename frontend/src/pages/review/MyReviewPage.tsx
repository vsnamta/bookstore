import React from 'react';
import Layout from '../../components/common/Layout';
import MyPageLayout from '../../components/common/MyPageLayout';
import MyReviewManagementContainer from '../../container/review/MyReviewManagementContainer';

function MyReviewPage() {    
    return (
        <Layout>
            <MyPageLayout>
                <h3>리뷰내역</h3>
                <MyReviewManagementContainer />
            </MyPageLayout>                                                 
        </Layout>
    )
};

export default MyReviewPage;