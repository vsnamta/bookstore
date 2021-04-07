import { PointHistoryFindPayload, PointHistoryResult } from ".";
import { ApiError } from "../../error/ApiError";
import { Page } from "../common";

export interface PointHistoriesState {
    pointHistoryPageAsync: PointHistoryPageAsync;
}

export interface PointHistoryPageAsync {
    payload?: PointHistoryFindPayload;
    result?: Page<PointHistoryResult>;
    error?: ApiError; 
}