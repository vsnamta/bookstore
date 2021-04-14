import { storiesOf } from "@storybook/react";
import React from 'react';
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import LoginForm from "../components/general/LoginForm";
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

storiesOf("LoginPage", module)
    .add("기본", () => (
        <div className="site-wrapper" id="top">
            <Header 
                myData={myData} 
                categoryList={categoryList} 
                onLogout={() => {}}
            />
            <main className="inner-page-sec-padding-bottom">
                <div className="container">
                    <h3>로그인 페이지</h3>
                    <br />
                    <LoginForm onLogin={() => {}} />
                </div>
            </main>
            <Footer />
        </div>
    ));