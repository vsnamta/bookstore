import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import RegisterTemplate from '../../components/member/RegisterTemplate';
import { createMemberSaveRequestAction, MemberSaveRequestActionPayload } from '../../store/member/action';

function RegisterPage() {
    const dispatch = useDispatch();

    const saveMember = useCallback((payload: MemberSaveRequestActionPayload) => {
        dispatch(createMemberSaveRequestAction(payload));
    }, []);

    return (
        <RegisterTemplate saveMember={saveMember} />
    )
};

export default RegisterPage;