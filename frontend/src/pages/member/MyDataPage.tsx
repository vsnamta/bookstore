import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberUpdateTemplate from '../../components/member/MemberUpdateTemplate';
import { MyData } from '../../models/auths';
import { RootState } from '../../store';
import { createFindMemberAction, createUpdateMemberRequestAction, MemberUpdateActionPayload } from '../../store/member/action';

function MyDataPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const memberAsync = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(createFindMemberAction(loginMember.id));
    }, []);

    const updateMember = useCallback((payload: MemberUpdateActionPayload) => {
        dispatch(createUpdateMemberRequestAction(payload));
    }, []);
    
    return (
        <MemberUpdateTemplate 
            memberAsync={memberAsync}
            updateMember={updateMember}
        />
    )
};

export default MyDataPage;