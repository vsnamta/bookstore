import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginMember } from '../../models/members';
import { RootState } from '../../store';
import { createFindMemberAction, createUpdateMemberAction, MemberUpdateActionPayload } from '../../store/member/action';
import MemberUpdateTemplate from '../../components/member/MemberUpdateTemplate';
import { MyData } from '../../models/auths';

function MyDataPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const memberAsync = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(createFindMemberAction(loginMember.id));
    }, []);

    const updateMember = useCallback((payload: MemberUpdateActionPayload) => {
        dispatch(createUpdateMemberAction(payload));
    }, []);
    
    return (
        <MemberUpdateTemplate 
            memberAsync={memberAsync}
            updateMember={updateMember}
        />
    )
};

export default MyDataPage;