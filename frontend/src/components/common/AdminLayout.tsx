import React from 'react';
import AdminHeader from '../general/AdminHearder';

interface AdminLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="site-wrapper" id="top">
            <AdminHeader />
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    )
};

export default React.memo(AdminLayout);