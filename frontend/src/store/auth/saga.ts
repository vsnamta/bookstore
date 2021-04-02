import { call, put, takeEvery } from 'redux-saga/effects';
import authApi from '../../apis/authApi';
import { MyData } from '../../models/auths';
import { createLoginAction, createLogoutAction, createReloadMyDataAction, createSetMyDataAction } from './action';
import { LOGIN, LOGOUT, RELOAD_MY_DATA } from './actionType';

function* loginSaga(action: ReturnType<typeof createLoginAction>) {
    try {
        yield call(authApi.login, action.payload.payload);

        const myData: MyData = yield call(authApi.findMyData);
        yield put(createSetMyDataAction(myData));
        localStorage.setItem("tempMyData", JSON.stringify(myData as MyData));

        action.payload.onSuccess && action.payload.onSuccess();
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* logoutSaga(action: ReturnType<typeof createLogoutAction>) {
    try {
        yield call(authApi.logout);

        yield put(createSetMyDataAction(undefined));
        localStorage.removeItem("tempMyData");

        action.payload.onSuccess && action.payload.onSuccess();
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* reloadMyDataSaga(action: ReturnType<typeof createReloadMyDataAction>) {
    try {
        const tempMyData = localStorage.getItem("tempMyData");

        if (tempMyData !== null) {
            yield put(createSetMyDataAction(JSON.parse(tempMyData) as MyData));
        }

        const myData: MyData | string = yield call(authApi.findMyData);

        yield put(createSetMyDataAction(myData !== "" ? myData as MyData : undefined));
    } catch (error) {
        
    }
};

export default function* authsSaga() {
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
    yield takeEvery(RELOAD_MY_DATA, reloadMyDataSaga);
}