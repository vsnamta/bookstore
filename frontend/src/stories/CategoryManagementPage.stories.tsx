import { storiesOf } from "@storybook/react";
import React from 'react';
import CategoryManagement from "../components/category/CategoryManagement";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import Title from "../components/general/Title";
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
                    <Title content={"카테고리 관리"} />
                    <CategoryManagement 
                        asyncCategoryList={{ result: categoryList, error: undefined }}
                        category={undefined}
                        selectCategory={() => {}}
                        removeCategory={() => {}}
                        updateCategory={() => {}}
                        saveCategory={() => {}}
                    />
                </div>
            </main>
            <Footer />
        </div>
    ));