import { AxiosError } from 'axios';
import qs from 'qs';
import { ErrorResult, Page } from '../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult, ProductSaveOrUpdatePayload } from '../models/products';
import apiClient from '../utils/apiClient';
import errorParser from '../utils/errorParser';

const productService = {
    save(payload: ProductSaveOrUpdatePayload): Promise<ProductDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.post<ProductDetailResult>('/api/products', payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    update(id: number, payload: ProductSaveOrUpdatePayload): Promise<ProductDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.put<ProductDetailResult>(`/api/products/${id}`, payload).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findOne(id: number): Promise<ProductDetailResult> {
        return new Promise((resolve, reject) => {
            apiClient.get<ProductDetailResult>(`/api/products/${id}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    },
    findAll(payload: ProductFindPayload): Promise<Page<ProductResult>> {
        const queryString = qs.stringify(payload, { allowDots: true });
    
        return new Promise((resolve, reject) => {
            apiClient.get<Page<ProductResult>>(`/api/products?${queryString}`).then(({ data }) => {
                resolve(data);
            }).catch((error: AxiosError<ErrorResult>) => {
                reject(errorParser.parse(error));
            });
        });
    }
};

export default productService;