import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MemberDetail from '../../components/member/MemberDetail';
import useDetail from '../../hooks/common/useDetail';
import { MemberDetailResult, MemberUpdatePayload } from '../../models/members';
import memberApi from '../../apis/memberApi';
import { RootState } from '../../store';
import { ApiError } from '../../error/ApiError';
import ErrorDetail from '../../components/general/ErrorDetail';

function MyDataPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const [memberState, setMember] = useDetail<MemberDetailResult>(loginMember.id, memberApi.findOne);

    const onUpdateMember = useCallback((id: number, payload: MemberUpdatePayload) => {
        memberApi.update(id, payload)
            .then(updatedMember => {
                setMember(updatedMember);
            })
            .catch((error: ApiError) => {
                
            });  
    }, []);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                {memberState.error && <ErrorDetail message={"오류 발생"} />}
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