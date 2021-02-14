import React from 'react';
import AdminHeader from '../general/AdminHearder';

interface AdminLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="site-wrapper" id="top">
            <AdminHeader />
            {children}
        </div>
    )
};

export default React.memo(AdminLayout);