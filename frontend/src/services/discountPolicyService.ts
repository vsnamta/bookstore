import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResult } from '../models/common';
import { DiscountPolicyResult, DiscountPolicySaveOrUpdatePayload } from '../models/discountPolicies';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const discountPolicyService = {
    save(payload: DiscountPolicySaveOrUpdatePayload): Promise<number> {
        return new Promise((resolve, reject) => {
            apiClient.post('/api/discountPolicies', payload).then(({ data }: AxiosResponse) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    update(id: number, payload: DiscountPolicySaveOrUpdatePayload): Promise<number> {
        return new Promise((resolve, reject) => {
            apiClient.put(`/api/discountPolicies/${id}`, payload).then(({ data }: AxiosResponse) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findAll(): Promise<DiscountPolicyResult[]> {
        return new Promise((resolve, reject) => {
            apiClient.get('/api/discountPolicies').then(({ data }: AxiosResponse) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default discountPolicyService;