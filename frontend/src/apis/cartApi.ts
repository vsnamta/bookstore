import { AxiosError } from 'axios';
import qs from 'qs';
import { CartFindPayload, CartResult, CartSavePayload, CartUpdatePayload } from '../models/cart';
import { ErrorResult } from '../models/common';
import apiClient from './apiClient';
import apiErrorParser from '../utills/apiErrorParser';

const cartApi = {
    save(payload: CartSavePayload): Promise<CartResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<CartResult>('/api/carts', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    update(id: number, payload: CartUpdatePayload): Promise<CartResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<CartResult>(`/api/carts/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    remove(ids: number[]): Promise<undefined> {
        const queryString = qs.stringify({ ids }, { indices: false });
    
        return new Promise((resolve, reject) => {
            apiClient.delete<undefined>(`/api/carts?${queryString}`).then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findAll(payload: CartFindPayload): Promise<CartResult[]> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<CartResult[]>(`/api/carts?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default cartApi;