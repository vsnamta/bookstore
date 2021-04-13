import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyData } from '../../models/auth';
import { MemberUpdateAsyncPayload } from '../../models/member/store';
import { rootActions, RootState } from '../../store';
import ErrorDetail from '../../components/general/ErrorDetail';
import MemberUpdateForm from '../../components/member/MemberUpdateForm';

function MemberUpdateFormContainer() {
    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData) as MyData;
    const asyncMember = useSelector((state: RootState) => state.members.asyncMember);

    useEffect(() => {
        dispatch(rootActions.fetchMember(myData.id));
    }, []);

    const updateMember = useCallback((payload: MemberUpdateAsyncPayload) => {
        dispatch(rootActions.updateMemberAsync(payload));
    }, []);

    return (
        <>
            <MemberUpdateForm 
                member={asyncMember.result} 
                onUpdateMember={updateMember} 
            />
            {asyncMember.error && <ErrorDetail message={asyncMember.error.message} />}
        </>
    )
};

export default MemberUpdateFormContainer;