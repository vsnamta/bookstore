import React from 'react';
import Layout from '../../components/common/Layout';
import LoginFormContainer from '../../container/general/LoginFormContainer';

function LoginPage() {
    return (
        <Layout>
            <h3>로그인 페이지</h3>
            <br />
            <LoginFormContainer />
        </Layout>
    )
};

export default LoginPage;