import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import { LoginMember } from './models/members';
import rootReducer, { rootSaga } from './store';
import { setMyData } from './store/member/action';
import { findCategoryList, findCategoryListAsync } from './store/category/action';
import categoryApi from './apis/categoryApi';
import { ApiError } from './error/ApiError';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

function initalizeStore() {
    const loginMember = localStorage.getItem("loginMember");

    if (loginMember !== null) {
        store.dispatch(setMyData(JSON.parse(loginMember) as LoginMember));
    }

    store.dispatch(findCategoryList());
}

initalizeStore();    

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
	document.getElementById('root')
);

export default store;