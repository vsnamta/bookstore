import React from 'react';
import Login from './Login';
import Layout from '../common/Layout';

function LoginTemplate() {
    return (
        <Layout>
            <h3>로그인 페이지</h3>
            <br />
            <Login />
        </Layout>
    )
};

export default LoginTemplate;