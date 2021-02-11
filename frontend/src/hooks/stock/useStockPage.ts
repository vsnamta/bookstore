import { useCallback, useEffect, useState } from "react";
import { Page, PageCriteria } from "../../models/common";
import { StockFindPayload, StockResult } from "../../models/stocks";
import stockService from "../../services/stockService";

export interface StockPageState {
    payload?: StockFindPayload;
    result?: Page<StockResult>;
    error?: Error;
}

function useStockPage(initialProductId: number) : [
    StockPageState, 
    (productId: number) => void,
    (pageCriteria: PageCriteria) => void
] {
    const [stockFindPayload, setStockFindPayload] = useState<StockFindPayload>({
        productId: initialProductId,
        pageCriteria: {page: 1, size: 10}
    });
    const [stockPage, setStockPage] = useState<Page<StockResult>>();
    const [error, setError] = useState<Error>();

    const selectStockPage = useCallback((stockFindPayload: StockFindPayload) => {
        setStockFindPayload(stockFindPayload);
        setError(undefined);

        stockService.findAll(stockFindPayload)
            .then(page => setStockPage(page))
            .catch((error) => {
                setStockPage(undefined);
                setError(error);
            });
    }, []);

    useEffect(() => {
        selectStockPage({
            productId: initialProductId,
            pageCriteria: {page: 1, size: 10}
        });
    }, []);

    const updateProductId = useCallback((productId: number) => {
        const nextStockFindPayload = {
            ...stockFindPayload,
            productId: productId,
            pageCriteria: {
                ...stockFindPayload.pageCriteria,
                page: 1
            }
        };

        selectStockPage(nextStockFindPayload);
    }, [stockFindPayload]);

    const updatePageCriteria = useCallback((pageCriteria: PageCriteria) => {
        const nextStockFindPayload = {
            ...stockFindPayload,
            pageCriteria : pageCriteria
        };

        selectStockPage(nextStockFindPayload);
    }, [stockFindPayload]);

    return [{
        payload : stockFindPayload,
        result: stockPage,
        error: error
    }, updateProductId, updatePageCriteria];
}

export default useStockPage;