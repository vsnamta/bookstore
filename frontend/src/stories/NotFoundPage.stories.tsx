import { storiesOf } from "@storybook/react";
import React from 'react';
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import NotFound from "../components/general/NotFound";
import { CategoryResult } from "../models/category";

const myData = {
    id: "test",
    name: "홍길동",
    role: "USER"
};

const categoryList: CategoryResult[] = [{
    id: 1,
    name: "컴퓨터/IT",
    parentId: NaN,
    parentName: "",
    children: [{
        id: 2,
        name: "IT 전문서",
        parentId: 1,
        parentName: "컴퓨터/IT",
        children: []
    }]
}];

const productList = [{
    id: 1,
    name: "Clean Code",
    author: "로버트 C. 마틴",
    publisher: "인사이트",
    publishedDate: "2013-12-24",
    regularPrice: 33000,
    imageFileName: "test.jpg",
    stockQuantity: 100,
    salesQuantity: 0,
    rating: 4,
    reviewCount: 1,
    discountPercent: 10,
    depositPercent: 5
}];

storiesOf("MainPage", module)
    .add("기본", () => (
        <div className="site-wrapper" id="top">
            <Header 
                myData={myData} 
                categoryList={categoryList} 
                onLogout={() => {}}
            />
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <NotFound />
                </div>
            </main>
            <Footer />
        </div>
    ));