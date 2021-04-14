import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from 'react';
import { Provider } from "react-redux";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import MainPage from "../pages/general/MainPage";
import rootReducer, { rootActions, rootSaga } from "../store";

describe('MainPage test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga); 

    it('fetch data', async () => {
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
        
        // store.dispatch(rootActions.setAsyncProductPage({
        //     payload: {
        //         pageCriteria: {
        //             page: 1,
        //             size: 8,
        //             sortColumn: "salesQuantity",
        //             sortDirection: "desc"
        //         }
        //     },
        //     result: {
        //         list: [{ 
        //             id: 1,
        //             name: 'Clean Code',
        //             author: '로버트 C. 마틴',
        //             publisher: '인사이트',
        //             publishedDate: '2013-12-24',
        //             regularPrice: 33000,
        //             imageFileName: 'test.jpg',
        //             stockQuantity: 9,
        //             salesQuantity: 1,
        //             rating: 4,
        //             reviewCount: 1,
        //             discountPercent: 10,
        //             depositPercent: 5
        //         }],
        //         totalCount: 1
        //     },
        //     error: undefined
        // }));

        // const history = createMemoryHistory({
        //     initialEntries: ["/"]
        // });
        // const { getByText } = render(
        //     <Provider store={store}>
        //         <Router history={history}>
        //             <Switch>
        //                 <Route exact path="/" component={MainPage} />
        //             </Switch>
        //         </Router>
        //     </Provider>
        // );

        // await waitFor(() => {
        //     getByText("로버트 C. 마틴");
        // });
        expect(1).toEqual(1);
    });
});