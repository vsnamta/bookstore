import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import RegisterTemplate from '../../components/member/RegisterTemplate';
import { createSaveMemberRequestAction, MemberSaveActionPayload } from '../../store/member/action';

function RegisterPage() {
    const dispatch = useDispatch();

    const saveMember = useCallback((payload: MemberSaveActionPayload) => {
        dispatch(createSaveMemberRequestAction(payload));
    }, []);

    return (
        <RegisterTemplate saveMember={saveMember} />
    )
};

export default RegisterPage;