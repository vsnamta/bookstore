import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MemberDetail from '../../components/member/MemberDetail';
import { ApiError } from '../../error/ApiError';
import { MemberDetailResult, MemberUpdatePayload } from '../../models/members';

interface MyDataTemplateProps {
    memberAsync?: {
        payload?: number | undefined;
        result?: MemberDetailResult | undefined;
        error?: ApiError | undefined;
    };
    onUpdateMember: (id: number, payload: MemberUpdatePayload) => void;
}

function MyDataTemplate({ memberAsync, onUpdateMember }: MyDataTemplateProps) {
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                <MemberDetail 
                    member={memberAsync?.result} 
                    onUpdateMember={onUpdateMember} 
                />
                {memberAsync?.error && <ErrorDetail message={memberAsync.error.message} />}
            </MyPageLayout>
        </Layout>
    )
};

export default MyDataTemplate;