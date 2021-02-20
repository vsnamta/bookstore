import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MemberDetail from '../../components/member/MemberDetail';
import useDetail from '../../hooks/common/useDetail';
import { MemberDetailResult, MemberUpdatePayload } from '../../models/members';
import memberService from '../../services/memberService';
import { RootState } from '../../store';

function MyDataPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const [memberState, setMember] = useDetail<MemberDetailResult>(loginMember.id, memberService.findOne);

    const onUpdateMember = useCallback((id: number, payload: MemberUpdatePayload) => {
        memberService.update(id, payload)
            .then(updatedMember => {
                setMember(updatedMember);
            });   
    }, []);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                { memberState.result &&
                <MemberDetail 
                    member={memberState.result} 
                    onUpdateMember={onUpdateMember} 
                />}
            </MyPageLayout>
        </Layout>
    )
};

export default MyDataPage;