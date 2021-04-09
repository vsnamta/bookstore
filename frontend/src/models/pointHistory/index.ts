import { PageCriteria } from "../common";

export interface PointHistoryResult {
    id: number;
    amounts: number;
    contents: string;
    statusName: string;
    createdDate: string;
}

export interface PointHistoryFindPayload {
    memberId: string;
    pageCriteria: PageCriteria;
}