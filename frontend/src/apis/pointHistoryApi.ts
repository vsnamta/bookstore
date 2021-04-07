import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, Page } from '../models/common';
import { PointHistoryFindPayload, PointHistoryResult } from '../models/pointHistory';
import apiClient from './apiClient';
import apiErrorParser from '../utills/apiErrorParser';

const pointHistoryApi = {
    findAll(payload: PointHistoryFindPayload): Promise<Page<PointHistoryResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<PointHistoryResult>>(`/api/pointHistories?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default pointHistoryApi;