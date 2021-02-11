import { useCallback } from 'react';
import { PageCriteria } from "../../models/common";
import { StockSavePayload } from "../../models/stocks";
import stockService from '../../services/stockService';
import useStockPage, { StockPageState } from "./useStockPage";

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
        return stockService.save(payload)
            .then(id => {
                updateProductId(initialProductId);
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