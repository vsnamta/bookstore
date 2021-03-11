import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../components/general/Banner';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import BestProductList from '../../components/product/BestProductList';
import { RootState } from '../../store';
import { findProductPage } from '../../store/product/action';
import { ProductsState } from '../../store/product/reducer';

function MainPage() {
    const productsState: ProductsState = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findProductPage({
            categoryId: undefined,
            searchCriteria: undefined,
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
            {productsState.productPageAsync.error && <ErrorDetail message={"오류 발생"} />}

            {productsState.productPageAsync.result &&
            <main className="inner-page-sec-padding-bottom">
			    <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>베스트 셀러</h2>
                    </div>
                    <BestProductList productList={productsState.productPageAsync.result.list}/>
                </div>
            </main>}
        </Layout>
    )
};

export default MainPage;