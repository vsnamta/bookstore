import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LoginTemplate from '../../components/general/LoginTemplate';
import { createLoginAction, LoginActionPayload } from '../../store/auth/action';

function LoginPage() {
    const dispatch = useDispatch();

    const login = useCallback((payload: LoginActionPayload) => {
        dispatch(createLoginAction(payload));
    }, []);

    return (
        <LoginTemplate login={login} />
    )
};

export default LoginPage;