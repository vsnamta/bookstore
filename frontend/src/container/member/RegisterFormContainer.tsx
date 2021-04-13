import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../../components/member/RegisterForm';
import { MemberSaveAsyncPayload } from '../../models/member/store';
import { rootActions } from '../../store';

function RegisterFormContainer() {
    const dispatch = useDispatch();

    const saveMember = useCallback((payload: MemberSaveAsyncPayload) => {
        dispatch(rootActions.saveMemberAsync(payload));
    }, []);

    return (
        <RegisterForm onSaveMember={saveMember} />
    )
};

export default RegisterFormContainer;