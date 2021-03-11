import { AxiosError } from 'axios';
import { ErrorResult } from '../models/common';
import apiErrorParser from '../utills/apiErrorParser';
import apiClient from './apiClient';

const fileApi = {
    save(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);

        return new Promise((resolve, reject) => {
            apiClient.post<string>('/api/files', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    remove(fileName: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            apiClient.delete<undefined>(`/api/files/${fileName}`).then(() => {
                resolve(undefined);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    },
    find(fileName: string): Promise<File> {
        return new Promise((resolve, reject) => {
            apiClient.get<File>(`/api/files/${fileName}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(apiErrorParser.parse(error));
            });
        });
    }
};

export default fileApi;