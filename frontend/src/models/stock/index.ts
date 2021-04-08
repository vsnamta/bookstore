import { PageCriteria } from "../common";

export interface StockResult {
    id: number;
    quantity: number;
    contents: string;
    statusName: string;
    createdDate: string;
}

export interface StockFindPayload {
    productId: number;
    pageCriteria: PageCriteria;
}

export interface StockSavePayload {
    productId: number;
    quantity: number;
    contents: string;
    status: string;
}