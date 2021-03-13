import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../components/general/Banner';
import ErrorDetail from '../../components/general/ErrorDetail';
import Title from '../../components/general/Title';
import Layout from '../../components/layout/Layout';
import BestProductList from '../../components/product/BestProductList';
import { RootState } from '../../store';
import { findProductPage } from '../../store/product/action';

function MainPage() {
    const dispatch = useDispatch();
    const productPageAsync = useSelector((state: RootState) => state.products.productPageAsync);

    useEffect(() => {
        dispatch(findProductPage({
            pageCriteria: {
                page: 1,
                size: 8,
                sortColumn: "salesQuantity",
                sortDirection: "desc"
            }
        }));
    }, []);
    
    return (
        <Layout>
            <Banner />
            <Title content={"베스트 셀러"} />
            <BestProductList productList={productPageAsync.result?.list}/>
            {productPageAsync.error && <ErrorDetail message={productPageAsync.error.message} />}
        </Layout>
    )
};

export default MainPage;