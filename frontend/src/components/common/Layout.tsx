import React from 'react';
import HeaderContainer from '../../container/general/HeaderContainer';
import Footer from '../general/Footer';

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="site-wrapper" id="top">
            <HeaderContainer />
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
};

export default React.memo(Layout);