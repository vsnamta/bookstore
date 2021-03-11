import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import MyPageLayout from '../../components/layout/MyPageLayout';
import MemberDetail from '../../components/member/MemberDetail';
import { MemberUpdatePayload } from '../../models/members';
import { RootState } from '../../store';
import { findMember, updateMember } from '../../store/member/action';

function MyDataPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const dispatch = useDispatch();
    const memberState = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(findMember(loginMember.id));
    }, []);

    const onUpdateMember = useCallback((id: number, payload: MemberUpdatePayload) => {
        dispatch(updateMember({
            id: id,
            payload: payload,
            onSuccess: member => alert("변경되었습니다."),
            onFailure: error => {}
        }));
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