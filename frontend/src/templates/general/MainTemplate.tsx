import React from 'react';
import Banner from '../../components/general/Banner';
import ErrorDetail from '../../components/general/ErrorDetail';
import Title from '../../components/general/Title';
import Layout from '../../components/layout/Layout';
import BestProductList from '../../components/product/BestProductList';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductFindPayload, ProductResult } from '../../models/products';

interface MainTemplateProps {
    productPageAsync?: {
        payload?: ProductFindPayload | undefined;
        result?: Page<ProductResult> | undefined;
        error?: ApiError | undefined;
    };
}

function MainTemplate({ productPageAsync }: MainTemplateProps) {    
    return (
        <Layout>
            <Banner />
            <Title content={"베스트 셀러"} />
            <BestProductList productList={productPageAsync?.result?.list}/>
            {productPageAsync?.error && <ErrorDetail message={productPageAsync.error.message} />}
        </Layout>
    )
};

export default MainTemplate;