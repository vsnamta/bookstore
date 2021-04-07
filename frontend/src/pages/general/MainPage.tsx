import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, rootActions } from '../../store';
import MainTemplate from '../../components/general/MainTemplate';

function MainPage() {
    const dispatch = useDispatch();
    const productPageAsync = useSelector((state: RootState) => state.products.productPageAsync);

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
        <MainTemplate productPageAsync={productPageAsync} />
    )
};

export default MainPage;