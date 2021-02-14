import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Footer from '../general/Footer';
import Header from '../general/Header';

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function Layout({ children }: LayoutProps) {
    const {loginMember, menuCategoryList} = useSelector(({ loginMember, menuCategoryList }: RootState) => ({
        loginMember: loginMember.loginMember,
        menuCategoryList: menuCategoryList.menuCategoryList
    }));

    return (
        <div className="site-wrapper" id="top">
            <Header loginMember={loginMember} categoryList={menuCategoryList} />
            {children}
            <Footer />
        </div>
    )
};

export default React.memo(Layout);