import React from 'react';
import Layout from '../common/Layout';
import Banner from './Banner';
import ErrorDetail from './ErrorDetail';
import Title from './Title';
import BestProductList from '../product/BestProductList';
import { AsyncProductPage } from '../../models/product/store';

interface MainTemplateProps {
    asyncProductPage: AsyncProductPage;
}

function MainTemplate({ asyncProductPage }: MainTemplateProps) {    
    return (
        <Layout>
            <Banner />
            <Title content={"베스트 셀러"} />
            <BestProductList productList={asyncProductPage.result?.list}/>
            {asyncProductPage.error && <ErrorDetail message={asyncProductPage.error.message} />}
        </Layout>
    )
};

export default MainTemplate;