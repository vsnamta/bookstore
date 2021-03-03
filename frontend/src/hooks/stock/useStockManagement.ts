import { useCallback } from 'react';
import { PageCriteria } from "../../models/common";
import { StockSavePayload } from "../../models/stocks";
import stockApi from '../../apis/stockApi';
import useStockPage, { StockPageState } from "./useStockPage";
import { ApiError } from '../../error/ApiError';

interface StockManagementState {
    stockPageState: StockPageState;
}

interface UseStockManagementMethods {
    updatePageCriteria: (pageCriteria: PageCriteria) => void;
    saveStock: (payload: StockSavePayload) => Promise<void>;
}

function useStockManagement(initialProductId: number): [
    StockManagementState,
    UseStockManagementMethods
] {
    const [stockPageState, updateProductId, updatePageCriteria] = useStockPage(initialProductId);

    const saveStock = useCallback((payload: StockSavePayload) => {
        return stockApi.save(payload)
            .then(updatedStock => {
                updateProductId(initialProductId);
            })
            .catch((error: ApiError) => {
                
            });
    }, [updateProductId]);

    return [{
        stockPageState
    }, {
        updatePageCriteria,
        saveStock
    }];
}

export default useStockManagement;