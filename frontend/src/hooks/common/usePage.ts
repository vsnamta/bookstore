import { useCallback, useEffect, useState } from "react";
import { FindPayload, Page, PageCriteria, SearchCriteria } from "../../models/common";

export interface PageState<T> {
    payload?: FindPayload;
    result?: Page<T>;
    error?: Error;
}

function usePage<T>(
    initialSearchCriteria: SearchCriteria,
    findFunc: (findPayload: FindPayload) => Promise<Page<T>>)
: [
    PageState<T>, 
    React.Dispatch<React.SetStateAction<Page<T> | undefined>>,
    (searchCriteria: SearchCriteria) => void,
    (pageCriteria: PageCriteria) => void
] {
    const [payload, setPayload] = useState<FindPayload>({
        searchCriteria: initialSearchCriteria, 
        pageCriteria: {page: 1, size: 10}
    });
    const [page, setPage] = useState<Page<T>>();
    const [error, setError] = useState<Error>();

    const selectPage = useCallback((findPayload: FindPayload) => {
        setPayload(findPayload);
        setError(undefined);

        findFunc(findPayload)
            .then(page => setPage(page))
            .catch(error => {
                setPage(undefined);
                setError(error);
            });
    }, []);

    useEffect(() => {
        selectPage(payload);
    }, []);

    const updateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        const nextFindPayload = {
            ...payload,
            searchCriteria: searchCriteria,
            pageCriteria: {
                ...payload.pageCriteria,
                page: 1
            }
        };

        selectPage(nextFindPayload);
    }, [payload]);

    const updatePageCriteria = useCallback((pageCriteria: PageCriteria) => {
        const nextFindPayload = {
            ...payload,
            pageCriteria : pageCriteria
        };

        selectPage(nextFindPayload);
    }, [payload]);

    return [{
        payload : payload,
        result: page,
        error: error
    }, setPage, updateSearchCriteria, updatePageCriteria];
}

export default usePage;