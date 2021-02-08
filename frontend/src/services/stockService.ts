import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, Page } from '../models/common';
import { StockFindPayload, StockResult, StockSavePayload } from '../models/stocks';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const stockService = {
    save(payload: StockSavePayload): Promise<number> {
        return new Promise((resolve, reject) => {
            apiClient.post<number>('/api/stocks', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findAll(payload: StockFindPayload): Promise<Page<StockResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<StockResult>>(`/api/stocks?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default stockService;