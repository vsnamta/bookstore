import { storiesOf } from "@storybook/react";
import React from 'react';
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import OrderDetail from "../components/order/OrderDetail";
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

const order = {
    id: 1,
    memberName: "홍길동",
    orderLineResults: [{
        productId: 1,
        productName: "Clean Code",
        imageFileName: "test.jpg",
        regularPrice: 33000,
        discountPercent: 100,
        depositPercent: 5,
        quantity: 1
    }],
    totalAmounts: 29700,
    usedPoint: 0,
    depositPoint: 1650,
    receiverName: "홍길동",
    receiverPhoneNumber: "010-1234-5678",
    deliveryZipCode: "123-456",
    deliveryAddress1: "서울시 중구 명동 123번지",
    deliveryAddress2: "456호",
    deliveryMessage: "문 앞에 놓아주세요.",
    statusName: "주문 완료",
    statusUpdatedDate: "2020-01-01 00:00:00",
    statusHistoryResults: [{
        statusName: "주문 완료",
        createdDate: "2020-01-01 00:00:00"
    }]
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
                    <OrderDetail order={order} />
                    {/* {asyncOrder.error && <ErrorDetail message={asyncOrder.error.message} />} */}
                </div>
            </main>
            <Footer />
        </div>
    ));