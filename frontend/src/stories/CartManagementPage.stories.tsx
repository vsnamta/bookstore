import { storiesOf } from "@storybook/react";
import React from 'react';
import CartManagement from "../components/cart/CartManagement";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import { CartResult } from "../models/cart";
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

const cartList: CartResult[] = [{
    id: 1,
    productId: 1,
    productName: "Clean Code",
    imageFileName: "test.jpg",
    regularPrice: 33000,
    stockQuantity: 100,
    discountPercent: 10,
    depositPercent: 5,
    quantity: 1,
    checked: true
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
                    <CartManagement 
                        cartList={cartList} 
                        onUpdateCart={() => {}} 
                        onRemoveCart={() => {}}
                        onCheckAllCart={() => {}}
                        onCheckCart={() => {}}
                    />
                    {/* {asyncProductPage.error && <ErrorDetail message={asyncProductPage.error.message} />} */}
                </div>
            </main>
            <Footer />
        </div>
    ));