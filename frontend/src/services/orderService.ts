import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, FindPayload, Page } from '../models/common';
import { OrderDetailResult, OrderResult, OrderSavePayload, OrderUpdatePayload } from '../models/orders';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const orderService = {
    save(payload: OrderSavePayload): Promise<OrderDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<OrderDetailResult>('/api/orders', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    update(id: number, payload: OrderUpdatePayload): Promise<OrderDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<OrderDetailResult>(`/api/orders/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findOne(id: number): Promise<OrderDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.get<OrderDetailResult>(`/api/orders/${id}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findAll(payload: FindPayload): Promise<Page<OrderResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<OrderResult>>(`/api/orders?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default orderService;