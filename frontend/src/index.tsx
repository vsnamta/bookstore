import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { LoginMember } from './models/members';
import categoryService from './services/categoryService';
import rootReducer from './store';
import { setMyData } from './store/loginMember';
import { setMenuCategoryList } from './store/menuCategoryList';

const store = createStore(rootReducer, composeWithDevTools());

function initalizeStore() {
    const loginMember = localStorage.getItem("loginMember"); 

    if (loginMember !== null) {
        store.dispatch(setMyData(JSON.parse(loginMember) as LoginMember));
    }

    categoryService.findAll()
        .then(categoryList => store.dispatch(setMenuCategoryList(categoryList)));
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