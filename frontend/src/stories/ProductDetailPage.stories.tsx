import { storiesOf } from "@storybook/react";
import React from 'react';
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import ProductDetail from "../components/product/ProductDetail";
import ReviewManagement from "../components/reivew/ReviewManagement";
import { CategoryResult } from "../models/category";
import { FindPayload, Page } from "../models/common";
import { ReviewResult } from "../models/review";

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

const product = {
    id: 1,
    superCategoryId: 1,
    superCategoryName: "컴퓨터/IT",
    subCategoryId: 2,
    subCategoryName: "IT 전문서",
    name: "Clean Code",
    author: "로버트 C. 마틴",
    publisher: "인사이트",
    publishedDate: "2013-12-24",
    totalPage: "584",
    isbn: "9788966260959",
    regularPrice: 33000,
    imageFileName: "test.jpg",
    authorIntroduction: "저자 소개...",
    bookIntroduction: "책 소개...",
    tableOfContents: "목차...",
    stockQuantity: 100,
    salesQuantity: 0,
    rating: 4,
    reviewCount: 1,
    discountPolicyId: 1,
    discountPolicyName: "기본",
    discountPercent: 10,
    depositPercent: 5
};

const findPayload: FindPayload = {
    searchCriteria: { column: "productId", keyword: "1" },
    pageCriteria: { page: 1, size: 10 }
};

const reviewPage: Page<ReviewResult> = {
    list: [{
        id: 1,
        memberId: "test",
        memberName: "홍길동",
        productId: 1,
        productName: "Clean Code",
        imageFileName: "test.jpg",
        rating: 4,
        contents: "좋아요.",
        createdDate: "2020-01-01 00:00:00"
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
                    <ProductDetail 
                        product={product}
                        myData={myData} 
                        onSaveCart={() => {}} 
                    />
                    {/* {asyncProduct.error && <ErrorDetail message={asyncProduct.error.message} />} */}
                    <ReviewManagement
                        product={product}
                        asyncReviewPage={{ payload: findPayload, result: reviewPage, error: undefined }}
                        myData={myData}
                        saveReview={() => {}}
                        onPageChange={() => {}}
                    />
                </div>
            </main>
            <Footer />
        </div>
    ));