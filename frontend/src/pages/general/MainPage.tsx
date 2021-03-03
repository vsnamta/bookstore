import React from 'react';
import Banner from '../../components/general/Banner';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import BestProductList from '../../components/product/BestProductList';
import useProductPage from '../../hooks/product/useProductPage';

function MainPage() {
    const [productPageState] = useProductPage(
        undefined,
        undefined,
        {
            page: 1,
            size: 8,
            sortColumn: "salesQuantity",
            sortDirection: "desc"
        }
    );
    
    return (
        <Layout>
            <Banner />
            {productPageState.error && <ErrorDetail message={"오류 발생"} />}

            {productPageState.result &&
            <main className="inner-page-sec-padding-bottom">
			    <div className="container">
                    <div className="section-title section-title--bordered">
                        <h2>베스트 셀러</h2>
                    </div>
                    <BestProductList productList={productPageState.result.list}/>
                </div>
            </main>}
        </Layout>
    )
};

export default MainPage;