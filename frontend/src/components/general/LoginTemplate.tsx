import React from 'react';
import { LoginActionPayload } from '../../store/auth/action';
import Layout from '../common/Layout';
import LoginForm from './LoginForm';

interface RegisterTemplateProps {
    login: (payload: LoginActionPayload) => void;
}

function LoginTemplate({ login }: RegisterTemplateProps) {
    return (
        <Layout>
            <h3>로그인 페이지</h3>
            <br />
            <LoginForm onLogin={login}/>
        </Layout>
    )
};

export default LoginTemplate;