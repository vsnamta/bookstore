import { storiesOf } from "@storybook/react";
import React from 'react';
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import Title from "../components/general/Title";
import MemberManagement from "../components/member/MemberManagement";
import { CategoryResult } from "../models/category";
import { FindPayload, Page } from "../models/common";
import { MemberResult } from "../models/member";

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
    pageCriteria: { page: 1, size: 10 }
};

const memberPage: Page<MemberResult> = {
    list: [{
        id: "test",
        name: "홍길동",
        phoneNumber: "010-1234-5678",
        roleName: "USER",
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
                    <Title content={"회원관리"} />
                    <MemberManagement 
                        asyncMemberPage={{ payload: findPayload, result: memberPage, error: undefined }}
                        onUpdateSearchCriteria={() => {}}
                        onPageChange={() => {}}
                    />
                </div>
            </main>
            <Footer />
        </div>
    ));