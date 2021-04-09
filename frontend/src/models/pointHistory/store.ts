import { PointHistoryFindPayload, PointHistoryResult } from ".";
import { ApiError } from "../../error/ApiError";
import { Page } from "../common";

export interface PointHistoriesState {
    asyncPointHistoryPage: AsyncPointHistoryPage;
}

export interface AsyncPointHistoryPage {
    payload?: PointHistoryFindPayload;
    result?: Page<PointHistoryResult>;
    error?: ApiError; 
}