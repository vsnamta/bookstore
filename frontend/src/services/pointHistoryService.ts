import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, Page } from '../models/common';
import { PointHistoryFindPayload, PointHistoryResult } from '../models/pointHistories';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const pointHistoryService = {
    findAll(payload: PointHistoryFindPayload): Promise<Page<PointHistoryResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<PointHistoryResult>>(`/api/pointHistories?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default pointHistoryService;