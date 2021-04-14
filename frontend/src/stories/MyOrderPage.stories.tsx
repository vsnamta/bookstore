import { storiesOf } from "@storybook/react";
import React from 'react';
import MyPageLayout from "../components/common/MyPageLayout";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import MyOrderManagement from "../components/order/MyOrderManagement";
import { CategoryResult } from "../models/category";
import { FindPayload, Page } from "../models/common";
import { OrderResult } from "../models/order";

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
    searchCriteria: { column: "memberId", keyword: "test" },
    pageCriteria: { page: 1, size: 10 }
};

const orderPage: Page<OrderResult> = {
    list: [{
        id: 1,
        memberName: "홍길동",
        orderLineName: "Clean Code",
        totalAmounts: 29700,
        statusName: "주문 완료",
        orderDate: "2020-01-01 00:00:00"
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
                        <h3>주문 내역</h3>
                        <MyOrderManagement 
                            asyncOrderPage={{ payload: findPayload, result: orderPage, error: undefined }}
                            asyncOrder={{ payload: undefined, result: undefined, error: undefined }}
                            selectOrder={() => {}}
                            updateOrder={() => {}}
                            onPageChange={() => {}}
                        />
                    </MyPageLayout>
                </div>
            </main>
            <Footer />
        </div>
    ));