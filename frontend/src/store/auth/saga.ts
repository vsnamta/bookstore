import { call, put, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import authApi from '../../apis/authApi';
import { MyData } from '../../models/auth';

function* fetchMyDataSaga(action: ReturnType<typeof actions.fetchMyData>) {
    try {
        const tempMyData = localStorage.getItem("tempMyData");

        if (tempMyData !== null) {
            yield put(actions.setMyData(JSON.parse(tempMyData) as MyData));
        }

        const myData: MyData | string = yield call(authApi.findMyData);

        yield put(actions.setMyData(myData === "" ? undefined : myData as MyData));
    } catch (error) {
        
    }
};

function* loginAsyncSaga({ payload: loginAsyncPayload }: ReturnType<typeof actions.loginAsync>) {
    try {
        yield call(authApi.login, loginAsyncPayload.payload);

        const myData: MyData = yield call(authApi.findMyData);
        yield put(actions.setMyData(myData));
        localStorage.setItem("tempMyData", JSON.stringify(myData));

        loginAsyncPayload.onSuccess?.();
    } catch (error) {
        loginAsyncPayload.onFailure?.(error);
    }
};

function* logoutAsyncSaga({ payload: logoutAsyncPayload }: ReturnType<typeof actions.logoutAsync>) {
    try {
        yield call(authApi.logout);

        yield put(actions.setMyData(undefined));
        localStorage.removeItem("tempMyData");

        logoutAsyncPayload.onSuccess?.();
    } catch (error) {
        logoutAsyncPayload.onFailure?.(error);
    }
};

export default function* authsSaga() {
    yield takeEvery(types.FETCH_MY_DATA, fetchMyDataSaga);
    yield takeEvery(types.LOGIN_ASYNC, loginAsyncSaga);
    yield takeEvery(types.LOGOUT_ASYNC, logoutAsyncSaga);
}