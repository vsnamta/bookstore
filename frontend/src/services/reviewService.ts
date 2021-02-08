import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, FindPayload, Page } from '../models/common';
import { ReviewResult, ReviewSavePayload, ReviewUpdatePayload } from '../models/reviews';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const reviewService = {
    save(payload: ReviewSavePayload): Promise<number> {
        return new Promise((resolve, reject) => {
            apiClient.post<number>('/api/reviews', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    update(id: number, payload: ReviewUpdatePayload): Promise<number> {
        return new Promise((resolve, reject) => {
            apiClient.put<number>(`/api/reviews/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    remove(id: number): Promise<undefined> {
        return new Promise((resolve, reject) => {
            apiClient.delete<undefined>(`/api/reviews/${id}`).then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findAll(payload: FindPayload): Promise<Page<ReviewResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
        
        return new Promise((resolve, reject) => {
            apiClient.get<Page<ReviewResult>>(`/api/reviews?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default reviewService;