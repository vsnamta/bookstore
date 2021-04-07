import React from 'react';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import ErrorDetail from '../general/ErrorDetail';
import MemberUpdateForm from './MemberUpdateForm';
import { MemberUpdateAsyncPayload } from '../../models/member/store';
import { MemberAsync } from '../../models/member/store';

interface MemberUpdateTemplateProps {
    memberAsync: MemberAsync;
    updateMember: (payload: MemberUpdateAsyncPayload) => void;
}

function MemberUpdateTemplate({ memberAsync, updateMember }: MemberUpdateTemplateProps) {
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                <MemberUpdateForm 
                    member={memberAsync.result} 
                    onUpdateMember={updateMember} 
                />
                {memberAsync.error && <ErrorDetail message={memberAsync.error.message} />}
            </MyPageLayout>
        </Layout>
    )
};

export default MemberUpdateTemplate;