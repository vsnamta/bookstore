import React from 'react';
import RegisterForm from './RegisterForm';
import Layout from '../common/Layout';
import { MemberSaveActionPayload } from '../../store/member/action';

interface RegisterTemplateProps {
    saveMember: (payload: MemberSaveActionPayload) => void;
}

function RegisterTemplate({ saveMember }: RegisterTemplateProps) {
    return (
        <Layout>
            <h3>회원가입 페이지</h3>
            <br />
            <RegisterForm onSaveMember={saveMember}/>
        </Layout>
    )
};

export default RegisterTemplate;