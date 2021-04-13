import React from 'react';
import Layout from '../../components/common/Layout';
import RegisterFormContainer from '../../container/member/RegisterFormContainer';

function RegisterPage() {
    return (
        <Layout>
            <h3>회원가입 페이지</h3>
            <br />
            <RegisterFormContainer />
        </Layout>
    )
};

export default RegisterPage;