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
import rootReducer, { rootSaga } from './store';
import { createFindCategoryListAction } from './store/category/action';
import { createReloadMyDataAction } from './store/auth/action';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

function initalizeStore() {
    store.dispatch(createReloadMyDataAction());
    store.dispatch(createFindCategoryListAction());
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