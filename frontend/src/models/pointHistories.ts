import { PageCriteria } from "./common";

export interface PointHistoryFindPayload {
    memberId: number;
    pageCriteria: PageCriteria;
}

export interface PointHistoryResult {
    id: number;
    amounts: number;
    contents: string;
    statusName: string;
    createdDate: string;
}