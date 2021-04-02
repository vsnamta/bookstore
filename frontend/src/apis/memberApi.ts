import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, FindPayload, Page } from '../models/common';
import { LoginMember, MemberDetailResult, MemberResult, MemberSavePayload, MemberUpdatePayload } from '../models/members';
import apiClient from './apiClient';
import apiErrorParser from '../utills/apiErrorParser';

const memberApi = {
    save(payload: MemberSavePayload): Promise<MemberDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<MemberDetailResult>('/api/members', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    update(id: number, payload: MemberUpdatePayload): Promise<MemberDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<MemberDetailResult>(`/api/members/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findMyData(): Promise<LoginMember | string> {
        return new Promise((resolve, reject) => {
            apiClient.get<LoginMember | string>('/api/members/me').then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findOne(id: number): Promise<MemberDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.get<MemberDetailResult>(`/api/members/${id}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    findAll(payload: FindPayload): Promise<Page<MemberResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<MemberResult>>(`/api/members?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default memberApi;