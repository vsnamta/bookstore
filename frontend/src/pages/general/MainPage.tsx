import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { actions } from '../../store/product';
import MainTemplate from '../../components/general/MainTemplate';

function MainPage() {
    const dispatch = useDispatch();
    const productPageAsync = useSelector((state: RootState) => state.products.productPageAsync);

    useEffect(() => {
        dispatch(actions.fetchProductPage({
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