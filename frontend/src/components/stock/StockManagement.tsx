import React, { useCallback } from 'react';
import useModal from '../../hooks/useModal';
import { ProductDetailResult } from '../../models/product';
import { AsyncProduct } from '../../models/product/store';
import { AsyncStockPage, StockSaveAsyncPayload } from '../../models/stock/store';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import StockList from '../stock/StockList';
import StockManagementBar from '../stock/StockManagementBar';
import StockSaveModal from '../stock/StockSaveModal';

interface StockManagementProps {
    product?: ProductDetailResult;
    asyncStockPage: AsyncStockPage;
    saveStock: (payload: StockSaveAsyncPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function StockManagement({ product, asyncStockPage, saveStock, onPageChange }: StockManagementProps) {    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onSaveStock = useCallback((payload: StockSaveAsyncPayload) => {
        saveStock({
            payload: payload.payload,
            onSuccess: stock => {
                payload.onSuccess?.(stock);
                closeSaveModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <>
            <Title content={"재고"} />
            <StockManagementBar 
                onOpenSaveModal={openSaveModal}
            />
            <StockList stockList={asyncStockPage.result?.list} />
            <Pagination
                page={asyncStockPage.payload?.pageCriteria.page}  
                totalCount={asyncStockPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            <StockSaveModal 
                product={product} 
                isOpen={saveModalIsOpen}
                onSaveStock={onSaveStock}
                onRequestClose={closeSaveModal}
            />
        </>
    )
};

export default React.memo(StockManagement);