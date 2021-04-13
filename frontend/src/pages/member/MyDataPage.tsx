import React from 'react';
import Layout from '../../components/common/Layout';
import MyPageLayout from '../../components/common/MyPageLayout';
import MemberUpdateFormContainer from '../../container/member/MemberUpdateFormContainer';

function MyDataPage() {    
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                <MemberUpdateFormContainer />
            </MyPageLayout>
        </Layout>
    )
};

export default MyDataPage;