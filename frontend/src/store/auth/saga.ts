import { call, put, takeEvery } from 'redux-saga/effects';
import authApi from '../../apis/authApi';
import { MyData } from '../../models/auths';
import { createLoginAction, createLogoutAction, createMyDataReloadAction, createMyDataSetAction } from './action';
import { LOGIN, LOGOUT, RELOAD_MY_DATA } from './actionType';

function* reloadMyDataSaga(action: ReturnType<typeof createMyDataReloadAction>) {
    try {
        const tempMyData = localStorage.getItem("tempMyData");

        if (tempMyData !== null) {
            yield put(createMyDataSetAction(JSON.parse(tempMyData) as MyData));
        }

        const myData: MyData | string = yield call(authApi.findMyData);

        yield put(createMyDataSetAction(myData === "" ? undefined : myData as MyData));
    } catch (error) {
        
    }
};

function* loginSaga({ payload: loginActionPayload }: ReturnType<typeof createLoginAction>) {
    try {
        yield call(authApi.login, loginActionPayload.payload);

        const myData: MyData = yield call(authApi.findMyData);
        yield put(createMyDataSetAction(myData));
        localStorage.setItem("tempMyData", JSON.stringify(myData as MyData));

        loginActionPayload.onSuccess && loginActionPayload.onSuccess();
    } catch (error) {
        loginActionPayload.onFailure && loginActionPayload.onFailure(error);
    }
};

function* logoutSaga({ payload: logoutActionPayload }: ReturnType<typeof createLogoutAction>) {
    try {
        yield call(authApi.logout);

        yield put(createMyDataSetAction(undefined));
        localStorage.removeItem("tempMyData");

        logoutActionPayload.onSuccess && logoutActionPayload.onSuccess();
    } catch (error) {
        logoutActionPayload.onFailure && logoutActionPayload.onFailure(error);
    }
};

export default function* authsSaga() {
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
    yield takeEvery(RELOAD_MY_DATA, reloadMyDataSaga);
}