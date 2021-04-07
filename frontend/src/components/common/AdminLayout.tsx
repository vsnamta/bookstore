import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LogoutAsyncPayload } from '../../models/auth/store';
import { actions } from '../../store/auth';
import AdminHeader from '../general/AdminHearder';

interface AdminLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function AdminLayout({ children }: AdminLayoutProps) {
    const dispatch = useDispatch();

    const logout = useCallback((payload: LogoutAsyncPayload) => {
        dispatch(actions.logoutAsync(payload));
    }, []);

    return (
        <div className="site-wrapper" id="top">
            <AdminHeader onLogout={logout} />
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    )
};

export default React.memo(AdminLayout);