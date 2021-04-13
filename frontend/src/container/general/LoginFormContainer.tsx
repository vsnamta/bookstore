import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import LoginForm from '../../components/general/LoginForm';
import { LoginAsyncPayload } from '../../models/auth/store';
import { rootActions } from '../../store';

function LoginFormContainer() {
    const location = useLocation();

    // const { from } = location.state || { from: { pathname: "/" } };

    const dispatch = useDispatch();

    const login = useCallback((payload: LoginAsyncPayload) => {
        dispatch(rootActions.loginAsync(payload));
    }, []);

    return (
        <LoginForm onLogin={login} />
    )
};

export default LoginFormContainer;