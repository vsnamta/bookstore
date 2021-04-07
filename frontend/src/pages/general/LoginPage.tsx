import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LoginTemplate from '../../components/general/LoginTemplate';
import { LoginAsyncPayload } from '../../models/auth/store';
import { rootActions } from '../../store';

function LoginPage() {
    const dispatch = useDispatch();

    const login = useCallback((payload: LoginAsyncPayload) => {
        dispatch(rootActions.loginAsync(payload));
    }, []);

    return (
        <LoginTemplate login={login} />
    )
};

export default LoginPage;