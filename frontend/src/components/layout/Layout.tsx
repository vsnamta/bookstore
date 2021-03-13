import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Footer from '../general/Footer';
import Header from '../general/Header';

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function Layout({ children }: LayoutProps) {
    const { loginMember, categoryList } = useSelector(({ members, categories }: RootState) => ({
        loginMember: members.loginMember,
        categoryList: categories.categoryListAsync.result
    }));

    return (
        <div className="site-wrapper" id="top">
            <Header loginMember={loginMember} categoryList={categoryList} />
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