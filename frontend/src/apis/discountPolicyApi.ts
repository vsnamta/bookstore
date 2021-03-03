import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResult } from '../models/common';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../models/discountPolicies';
import apiClient from './apiClient';
import apiErrorParser from '../utills/apiErrorParser';

const discountPolicyApi = {
    save(payload: DiscountPolicySaveOrUpdatePayload): Promise<DiscountPolicyResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<DiscountPolicyResult>('/api/discountPolicies', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    update(id: number, payload: DiscountPolicySaveOrUpdatePayload): Promise<DiscountPolicyResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<DiscountPolicyResult>(`/api/discountPolicies/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findAll(): Promise<DiscountPolicyResult[]> {
        return new Promise((resolve, reject) => {
            apiClient.get<DiscountPolicyResult[]>('/api/discountPolicies').then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default discountPolicyApi;