import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, FindPayload, Page } from '../models/common';
import { LoginMember, MemberDetailResult, MemberResult, MemberUpdatePayload } from '../models/members';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const memberService = {
    update(id: number, payload: MemberUpdatePayload): Promise<MemberDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<MemberDetailResult>(`/api/members/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findMyData(): Promise<LoginMember | string> {
        return new Promise((resolve, reject) => {
            apiClient.get<LoginMember | string>('/api/members/me').then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findOne(id: number): Promise<MemberDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.get<MemberDetailResult>(`/api/members/${id}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findAll(payload: FindPayload): Promise<Page<MemberResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<MemberResult>>(`/api/members?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default memberService;