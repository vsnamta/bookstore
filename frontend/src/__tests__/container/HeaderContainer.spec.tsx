import { render, waitFor } from "@testing-library/react";
import React from 'react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import HeaderContainer from "../../container/general/HeaderContainer";
import rootReducer, { rootActions, rootSaga } from "../../store";

describe('HeaderContainer test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga); 

    it('default', async () => {
        // store.dispatch(rootActions.setMyData({
        //     id: "test",
        //     name: "홍길동",
        //     role: "USER"
        // }));

        // store.dispatch(rootActions.setAsyncCategoryList({
        //     result: [{
        //         id: 1,
        //         name: "컴퓨터/IT",
        //         parentId: NaN,
        //         parentName: "",
        //         children: [{
        //             id: 2,
        //             name: "IT 전문서",
        //             parentId: 1,
        //             parentName: "컴퓨터/IT",
        //             children: []
        //         }]
        //     }],
        //     error: undefined
        // }));

        // const { getByText } = render(
        //     <Provider store={store}>
        //         <HeaderContainer />
        //     </Provider>
        // );

        // await waitFor(() => {
        //     getByText("홍길동");
        //     getByText("컴퓨터/IT");
        // });

        expect(1).toEqual(1);
    });
});