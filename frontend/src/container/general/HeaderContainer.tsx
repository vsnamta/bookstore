import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/general/Header";
import { LogoutAsyncPayload } from "../../models/auth/store";
import { rootActions, RootState } from "../../store";

function HeaderContainer() {
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
        <Header 
            myData={myData} 
            categoryList={categoryList} 
            onLogout={logout}
        />
    )
}

export default React.memo(HeaderContainer);