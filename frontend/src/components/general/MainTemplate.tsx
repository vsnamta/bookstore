import React from 'react';
import Layout from '../common/Layout';
import Banner from './Banner';
import ErrorDetail from './ErrorDetail';
import Title from './Title';
import BestProductList from '../product/BestProductList';
import { ProductPageAsync } from '../../store/product/reducer';

interface MainTemplateProps {
    productPageAsync: ProductPageAsync;
}

function MainTemplate({ productPageAsync }: MainTemplateProps) {    
    return (
        <Layout>
            <Banner />
            <Title content={"베스트 셀러"} />
            <BestProductList productList={productPageAsync.result?.list}/>
            {productPageAsync.error && <ErrorDetail message={productPageAsync.error.message} />}
        </Layout>
    )
};

export default MainTemplate;