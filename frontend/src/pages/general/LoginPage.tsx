import React from 'react';
import Login from '../../components/general/Login';
import Layout from '../../components/layout/Layout';
import LoginTemplate from '../../templates/general/LoginTemplate';

function LoginPage() {
    return (
        <LoginTemplate />
        // <Layout>
        //     <h3>로그인 페이지</h3>
        //     <br />
        //     <Login />
        // </Layout>
    )
};

export default LoginPage;