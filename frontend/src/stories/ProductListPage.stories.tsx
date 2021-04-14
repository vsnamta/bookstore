import { storiesOf } from "@storybook/react";
import React from 'react';
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import ProductListTemplate from "../components/product/ProductListTemplate";
import { CategoryResult } from "../models/category";
import { Page } from "../models/common";
import { ProductFindPayload, ProductResult } from "../models/product";

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

const productFindPayload: ProductFindPayload = {
    pageCriteria: { page: 1, size: 10 }
};

const productPage: Page<ProductResult> = {
    list: [{
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
    }],
    totalCount: 1
};

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
                    <ProductListTemplate 
                        asyncProductPage={{ payload: productFindPayload, result: productPage, error: undefined }}
                        onPageChange={() => {}}
                        onSortChange={() => {}}
                    />
                </div>
            </main>
            <Footer />
        </div>
    ));