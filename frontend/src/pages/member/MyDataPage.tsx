import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberUpdateTemplate from '../../components/member/MemberUpdateTemplate';
import { MyData } from '../../models/auth';
import { MemberUpdateAsyncPayload } from '../../models/member/store';
import { RootState } from '../../store';
import { actions } from '../../store/member';

function MyDataPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const memberAsync = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(actions.fetchMember(loginMember.id));
    }, []);

    const updateMember = useCallback((payload: MemberUpdateAsyncPayload) => {
        dispatch(actions.updateMemberAsync(payload));
    }, []);
    
    return (
        <MemberUpdateTemplate 
            memberAsync={memberAsync}
            updateMember={updateMember}
        />
    )
};

export default MyDataPage;