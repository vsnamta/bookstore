import React from 'react';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import ErrorDetail from '../general/ErrorDetail';
import MemberDetail from './MemberDetail';
import { MemberUpdateActionPayload } from '../../store/member/action';
import { MemberAsync } from '../../store/member/reducer';

interface MyDataTemplateProps {
    memberAsync: MemberAsync;
    updateMember: (payload: MemberUpdateActionPayload) => void;
}

function MyDataTemplate({ memberAsync, updateMember }: MyDataTemplateProps) {
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                <MemberDetail 
                    member={memberAsync.result} 
                    onUpdateMember={updateMember} 
                />
                {memberAsync.error && <ErrorDetail message={memberAsync.error.message} />}
            </MyPageLayout>
        </Layout>
    )
};

export default MyDataTemplate;