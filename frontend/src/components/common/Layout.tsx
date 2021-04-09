import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAsyncPayload } from '../../models/auth/store';
import { RootState } from '../../store';
import { rootActions } from '../../store';
import Footer from '../general/Footer';
import Header from '../general/Header';

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function Layout({ children }: LayoutProps) {
    // const { myData, categoryList } = useSelector(({ members, categories }: RootState) => ({
    //     myData: auths.myData,
    //     categoryList: categories.asyncCategoryList.result
    // }));
    const dispatch = useDispatch();

    const myData = useSelector((state: RootState) => state.auths.myData);
    const categoryList = useSelector((state: RootState) => state.categories.asyncCategoryList.result);

    const logout = useCallback((payload: LogoutAsyncPayload) => {
        dispatch(rootActions.logoutAsync(payload));
    }, []);

    return (
        <div className="site-wrapper" id="top">
            <Header 
                myData={myData} 
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