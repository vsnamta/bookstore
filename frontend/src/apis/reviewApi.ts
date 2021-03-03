import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, FindPayload, Page } from '../models/common';
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from '../models/reviews';
import apiClient from './apiClient';
import apiErrorParser from '../utills/apiErrorParser';

const reviewApi = {
    save(payload: ReviewSavePayload): Promise<ReviewResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<ReviewResult>('/api/reviews', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    update(id: number, payload: ReviewUpdatePayload): Promise<ReviewResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<ReviewResult>(`/api/reviews/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    remove(id: number): Promise<undefined> {
        return new Promise((resolve, reject) => {
            apiClient.delete<undefined>(`/api/reviews/${id}`).then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findAll(payload: FindPayload): Promise<Page<ReviewResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
        
        return new Promise((resolve, reject) => {
            apiClient.get<Page<ReviewResult>>(`/api/reviews?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default reviewApi;