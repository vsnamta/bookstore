import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, rootActions } from '../../store';
import MainTemplate from '../../components/general/MainTemplate';

function MainPage() {
    const dispatch = useDispatch();
    const asyncProductPage = useSelector((state: RootState) => state.products.asyncProductPage);

    useEffect(() => {
        dispatch(rootActions.fetchProductPage({
            pageCriteria: {
                page: 1,
                size: 8,
                sortColumn: "salesQuantity",
                sortDirection: "desc"
            }
        }));
    }, []);
    
    return (
        <MainTemplate asyncProductPage={asyncProductPage} />
    )
};

export default MainPage;