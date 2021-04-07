import { AxiosError, AxiosResponse } from 'axios';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../models/category';
import { ErrorResult } from '../models/common';
import apiClient from './apiClient';
import apiErrorParser from '../utills/apiErrorParser';

const categoryApi = {
    save(payload: CategorySaveOrUpdatePayload): Promise<CategoryResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<CategoryResult>('/api/categories', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    update(id: number, payload: CategorySaveOrUpdatePayload): Promise<CategoryResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<CategoryResult>(`/api/categories/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    remove(id: number): Promise<undefined> {
        return new Promise((resolve, reject) => {
            apiClient.delete<undefined>(`/api/categories/${id}`).then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findAll(): Promise<CategoryResult[]> {
        return new Promise((resolve, reject) => {
            apiClient.get<CategoryResult[]>('/api/categories').then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default categoryApi;