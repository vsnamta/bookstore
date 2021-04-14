import { storiesOf } from "@storybook/react";
import React from 'react';
import MyPageLayout from "../components/common/MyPageLayout";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import MyPointHistoryManagement from "../components/pointHistory/MyPointHistoryManagement";
import { CategoryResult } from "../models/category";
import { Page } from "../models/common";
import { PointHistoryFindPayload, PointHistoryResult } from "../models/pointHistory";

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

const pointHistoryFindPayload: PointHistoryFindPayload = {
    memberId: "test",
    pageCriteria: { page: 1, size: 10 }
};

const pointHistoryPage: Page<PointHistoryResult> = {
    list: [{
        id: 1,
        amounts: 1650,
        contents: "구매 확정으로 인한 적립금 증가 (주문번호 : 1)",
        statusName: "구매 확정으로 인한 적립금 증가",
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
                        <h3>포인트내역</h3>
                        <MyPointHistoryManagement 
                            asyncPointHistoryPage={{ payload: pointHistoryFindPayload, result: pointHistoryPage, error: undefined }}
                            onPageChange={() => {}}
                        />
                    </MyPageLayout>
                </div>
            </main>
            <Footer />
        </div>
    ));