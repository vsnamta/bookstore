import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberUpdateTemplate from '../../components/member/MemberUpdateTemplate';
import { MyData } from '../../models/auth';
import { MemberUpdateAsyncPayload } from '../../models/member/store';
import { RootState, rootActions } from '../../store';

function MyDataPage() {
    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData) as MyData;
    const memberAsync = useSelector((state: RootState) => state.members.memberAsync);

    useEffect(() => {
        dispatch(rootActions.fetchMember(myData.id));
    }, []);

    const updateMember = useCallback((payload: MemberUpdateAsyncPayload) => {
        dispatch(rootActions.updateMemberAsync(payload));
    }, []);
    
    return (
        <MemberUpdateTemplate 
            memberAsync={memberAsync}
            updateMember={updateMember}
        />
    )
};

export default MyDataPage;