import { useCallback, useEffect, useState } from "react";
import { Page, PageCriteria } from "../../models/common";
import { PointHistoryFindPayload, PointHistoryResult } from "../../models/pointHistories";
import pointHistoryApi from '../../apis/pointHistoryApi';
import { ApiError } from "../../error/ApiError";

interface PointHistoryListState {
    payload?: PointHistoryFindPayload;
    result?: Page<PointHistoryResult>;
    error?: ApiError;
}

function usePointHistoryPage(initialMemberId: number): [
    PointHistoryListState,
    (memberId: number) => void,
    (pageCriteria: PageCriteria) => void
] {
    const [pointHistoryFindPayload, setPointHistoryFindPayload] = useState<PointHistoryFindPayload>({
        memberId: initialMemberId,
        pageCriteria: { page: 1, size: 10 }
    });
    const [pointHistoryPage, setPointHistoryPage] = useState<Page<PointHistoryResult>>();
    const [error, setError] = useState<ApiError>();

    const selectPointHistoryPage = useCallback((pointHistoryFindPayload: PointHistoryFindPayload) => {
        setPointHistoryFindPayload(pointHistoryFindPayload);
        setError(undefined);

        pointHistoryApi.findAll(pointHistoryFindPayload)
            .then(page => setPointHistoryPage(page))
            .catch((error: ApiError) => {
                setPointHistoryPage(undefined);
                setError(error);
            });
    }, []);

    useEffect(() => {
        selectPointHistoryPage(pointHistoryFindPayload);
    }, []);

    const updateMemberId = useCallback((memberId: number) => {
        const nextPointHistoryFindPayload = {
            ...pointHistoryFindPayload,
            memberId: memberId,
            pageCriteria: {
                ...pointHistoryFindPayload.pageCriteria,
                page: 1
            }
        };

        selectPointHistoryPage(nextPointHistoryFindPayload);
    }, [pointHistoryFindPayload]);

    const updatePageCriteria = useCallback((pageCriteria: PageCriteria) => {
        const nextPointHistoryFindPayload = {
            ...pointHistoryFindPayload,
            pageCriteria : pageCriteria
        }

        selectPointHistoryPage(nextPointHistoryFindPayload);
    }, [pointHistoryFindPayload]);

    return [{
        payload : pointHistoryFindPayload,
        result: pointHistoryPage,
        error: error
    }, updateMemberId, updatePageCriteria];
}

export default usePointHistoryPage;