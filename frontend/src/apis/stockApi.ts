import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, Page } from '../models/common';
import { StockFindPayload, StockResult, StockSavePayload } from '../models/stocks';
import apiClient from './apiClient';
import apiErrorParser from '../utills/apiErrorParser';

const stockApi = {
    save(payload: StockSavePayload): Promise<StockResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<StockResult>('/api/stocks', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findAll(payload: StockFindPayload): Promise<Page<StockResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<StockResult>>(`/api/stocks?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default stockApi;