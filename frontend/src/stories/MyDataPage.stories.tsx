import { storiesOf } from "@storybook/react";
import React from 'react';
import MyPageLayout from "../components/common/MyPageLayout";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import MemberUpdateForm from "../components/member/MemberUpdateForm";
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
                        <h3>나의 정보</h3>
                        <MemberUpdateForm 
                            member={member} 
                            onUpdateMember={() => {}} 
                        />
                        {/* {asyncMember.error && <ErrorDetail message={asyncMember.error.message} />} */}
                    </MyPageLayout>
                </div>
            </main>
            <Footer />
        </div>
    ));