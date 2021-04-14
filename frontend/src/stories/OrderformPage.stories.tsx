import { storiesOf } from "@storybook/react";
import React from 'react';
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import OrderForm from "../components/order/OrderForm";
import { CategoryResult } from "../models/category";
import { OrderingProduct } from "../models/order";

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

const member = {
    id: "test",
    name: "홍길동",
    phoneNumber: "010-1234-5678",
    zipCode: "123-456",
    address1: "서울시 중구 명동 123번지",
    address2: "456호",
    point: 0,
    roleName: "USER",
    createdDate: "2020-01-01 00:00:00"
};

const orderingProductList: OrderingProduct[] = [{
    cartId: undefined,
    productId: 1,
    productName: "Clean Code",
    imageFileName: "test.jpg",
    regularPrice: 33000,
    discountPercent: 10,
    depositPercent: 5,
    quantity: 1
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
                    <OrderForm 
                        member={member}
                        orderingProductList={orderingProductList} 
                        onSaveOrder={() => {}} 
                    />
                    {/* {asyncMember.error && <ErrorDetail message={asyncMember.error.message} />} */}
                </div>
            </main>
            <Footer />
        </div>
    ));