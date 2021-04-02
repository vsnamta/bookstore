import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createLogoutAction, LogoutActionPayload } from '../../store/auth/action';
import Footer from '../general/Footer';
import Header from '../general/Header';

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function Layout({ children }: LayoutProps) {
    // const { loginMember, categoryList } = useSelector(({ members, categories }: RootState) => ({
    //     loginMember: auths.myData,
    //     categoryList: categories.categoryListAsync.result
    // }));
    const dispatch = useDispatch();

    const loginMember = useSelector((state: RootState) => state.auths.myData);
    const categoryList = useSelector((state: RootState) => state.categories.categoryListAsync.result);

    const logout = useCallback((payload: LogoutActionPayload) => {
        dispatch(createLogoutAction(payload));
    }, []);

    return (
        <div className="site-wrapper" id="top">
            <Header 
                loginMember={loginMember} 
                categoryList={categoryList} 
                onLogout={logout}
            />
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