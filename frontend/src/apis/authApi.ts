import { AxiosError } from 'axios';
import { LoginPayload, MyData } from '../models/auth';
import { ErrorResult } from '../models/common';
import apiErrorParser from '../utills/apiErrorParser';
import apiClient from './apiClient';

const authApi = {
    findMyData(): Promise<MyData | string> {
        return new Promise((resolve, reject) => {
            apiClient.get<MyData | string>('/api/members/me').then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    login(payload: LoginPayload): Promise<undefined> {
        return new Promise((resolve, reject) => {
            apiClient.post<undefined>('/api/login', payload).then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    logout(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            apiClient.post<undefined>("/api/logout").then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default authApi;