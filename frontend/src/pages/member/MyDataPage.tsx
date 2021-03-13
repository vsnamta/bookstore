import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MemberDetail from '../../components/member/MemberDetail';
import { LoginMember, MemberUpdatePayload } from '../../models/members';
import { RootState } from '../../store';
import { findMember, updateMember } from '../../store/member/action';

function MyDataPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
    const memberAsync = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(findMember(loginMember.id));
    }, []);

    const onUpdateMember = useCallback((id: number, payload: MemberUpdatePayload) => {
        dispatch(updateMember({
            id: id,
            payload: payload,
            onSuccess: member => alert("변경되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);
    
    return (
        <Layout>
            <MyPageLayout>
                <h3>나의 정보</h3>
                <MemberDetail 
                    member={memberAsync.result} 
                    onUpdateMember={onUpdateMember} 
                />
                {memberAsync.error && <ErrorDetail message={memberAsync.error.message} />}
            </MyPageLayout>
        </Layout>
    )
};

export default MyDataPage;