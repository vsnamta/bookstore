import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import RegisterTemplate from '../../components/member/RegisterTemplate';
import { MemberSaveAsyncPayload } from '../../models/member/store';
import { rootActions } from '../../store';

function RegisterPage() {
    const dispatch = useDispatch();

    const saveMember = useCallback((payload: MemberSaveAsyncPayload) => {
        dispatch(rootActions.saveMemberAsync(payload));
    }, []);

    return (
        <RegisterTemplate saveMember={saveMember} />
    )
};

export default RegisterPage;