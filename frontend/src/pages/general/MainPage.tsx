import React from 'react';
import Layout from '../../components/common/Layout';
import Banner from '../../components/general/Banner';
import Title from '../../components/general/Title';
import BestProductListContainer from '../../container/product/BestProductListContainer';

function MainPage() {
    return (
        <Layout>
            <Banner />
            <Title content={"베스트 셀러"} />
            <BestProductListContainer />
        </Layout>
    )
};

export default MainPage;