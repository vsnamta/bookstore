import { useCallback, useEffect, useState } from "react";

export interface DetailState<T> {
    payload?: number;
    result?: T;
    error?: Error;
}

function useDetail<T>(
    initialId: number | undefined,
    findFunc: (id: number) => Promise<T>)
: [
    DetailState<T>,
    React.Dispatch<React.SetStateAction<T | undefined>>,
    (id: number) => void
] {
    const [id, setId] = useState<number | undefined>(initialId);
    const [detail, setDetail] = useState<T>();
    const [error, setError] = useState<Error | undefined>(undefined);

    const selectDetail = useCallback((id: number) => {
        setId(id);
        setError(undefined);

        findFunc(id)
            .then(detail => setDetail(detail))
            .catch(error => {
                setDetail(undefined);
                setError(error);
            });
    }, []);

    useEffect(() => {
        if(typeof initialId === 'number') {
            selectDetail(initialId);
        }
    }, []);

    return [{
        payload : id,
        result: detail,
        error: error
    }, setDetail, selectDetail];
}

export default useDetail;