import { AxiosError, AxiosResponse } from 'axios';
import { CategoryResult, CategorySaveOrUpdatePayload } from '../models/categories';
import { ErrorResult } from '../models/common';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const categoryService = {
    save(payload: CategorySaveOrUpdatePayload): Promise<number> {
        return new Promise((resolve, reject) => {
            apiClient.post<number>('/api/categories', payload).then(({ data }: AxiosResponse) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    update(id: number, payload: CategorySaveOrUpdatePayload): Promise<number> {
        return new Promise((resolve, reject) => {
            apiClient.put<number>(`/api/categories/${id}`, payload).then(({ data }: AxiosResponse) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    remove(id: number): Promise<undefined> {
        return new Promise((resolve, reject) => {
            apiClient.delete<undefined>(`/api/categories/${id}`).then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findAll(): Promise<CategoryResult[]> {
        return new Promise((resolve, reject) => {
            apiClient.get<CategoryResult[]>('/api/categories').then(({ data }: AxiosResponse) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default categoryService;