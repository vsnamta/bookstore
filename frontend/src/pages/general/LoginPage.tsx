import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LoginTemplate from '../../components/general/LoginTemplate';
import { LoginAsyncPayload } from '../../models/auth/store';
import { actions } from '../../store/auth';

function LoginPage() {
    const dispatch = useDispatch();

    const login = useCallback((payload: LoginAsyncPayload) => {
        dispatch(actions.loginAsync(payload));
    }, []);

    return (
        <LoginTemplate login={login} />
    )
};

export default LoginPage;