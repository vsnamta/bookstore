import React from 'react';
import Layout from '../common/Layout';
import MyPageLayout from '../common/MyPageLayout';
import ErrorDetail from '../general/ErrorDetail';
import MemberUpdateForm from './MemberUpdateForm';
import { MemberUpdateAsyncPayload } from '../../models/member/store';
import { AsyncMember } from '../../models/member/store';

interface MemberUpdateTemplateProps {
    asyncMember: AsyncMember;
    updateMember: (payload: MemberUpdateAsyncPayload) => void;
}

function MemberUpdateTemplate({ asyncMember, updateMember }: MemberUpdateTemplateProps) {
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                <MemberUpdateForm 
                    member={asyncMember.result} 
                    onUpdateMember={updateMember} 
                />
                {asyncMember.error && <ErrorDetail message={asyncMember.error.message} />}
            </MyPageLayout>
        </Layout>
    )
};

export default MemberUpdateTemplate;