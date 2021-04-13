import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorDetail from '../../components/general/ErrorDetail';
import BestProductList from '../../components/product/BestProductList';
import { rootActions, RootState } from '../../store';

function BestProductListContainer() {
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
        <>
            <BestProductList productList={asyncProductPage.result?.list} />
            {asyncProductPage.error && <ErrorDetail message={asyncProductPage.error.message} />}
        </>
    )
};

export default BestProductListContainer;