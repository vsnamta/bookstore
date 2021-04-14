import { storiesOf } from "@storybook/react";
import React from 'react';
import MyPageLayout from "../components/common/MyPageLayout";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import MyReviewManagement from "../components/reivew/MyReviewManagement";
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
                    <MyPageLayout>
                        <h3>리뷰내역</h3>
                        <MyReviewManagement 
                            asyncReviewPage={{ payload: findPayload, result: reviewPage, error: undefined }}
                            review={undefined}
                            selectReview={() => {}}
                            removeReview={() => {}}
                            updateReview={() => {}}
                            onPageChange={() => {}}
                        />
                    </MyPageLayout>
                </div>
            </main>
            <Footer />
        </div>
    ));