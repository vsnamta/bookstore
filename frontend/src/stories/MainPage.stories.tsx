import { storiesOf } from '@storybook/react';
import React from 'react';
import Banner from '../components/general/Banner';
import Footer from '../components/general/Footer';
import Header from '../components/general/Header';
import Title from '../components/general/Title';
import BestProductList from '../components/product/BestProductList';

const categoryList = [{
  id: 1,
  name: "컴퓨터/IT",
  parentId: NaN,
  parentName: "",
  children: [{
      id: 2,
      name: "IT",
      parentId: 1,
      parentName: "컴퓨터/IT",
      children: []
  }]
}];

const myData = {
  id: "test",
  name: "홍길동",
  role: "USER"
}

const productList = [{
  id: 1,
  name: 'Clean Code',
  author: '로버트 C. 마틴',
  publisher: '인사이트',
  publishedDate: '2013-12-24',
  regularPrice: 33000,
  imageFileName: 'test.jpg',
  stockQuantity: 9,
  salesQuantity: 1,
  rating: 4,
  reviewCount: 1,
  discountPercent: 10,
  depositPercent: 5
}];

storiesOf('MainPage', module)
  .add('기본', () => (
    <div className="site-wrapper" id="top">
        <Header categoryList={categoryList} myData={myData} onLogout={()=> console.log("로그아웃 성공")} />
        <main className="inner-page-sec-padding-bottom">
            <div className="container">
              <Banner />
              <Title content={"베스트 셀러"} />
              <BestProductList productList={productList} />
              {/* {asyncProductPage.error && <ErrorDetail message={asyncProductPage.error.message} />} */}
            </div>
        </main>
        <Footer />
    </div>
  ));
  //.addWithJSX('기본 설정', () => <MainTemplate asyncProductPage={asyncProductPage} />);