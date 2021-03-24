import React, { useCallback } from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import AdminProductDetail from './AdminProductDetail';
import StockList from '../stock/StockList';
import StockManagementBar from '../stock/StockManagementBar';
import StockSaveModal from '../stock/StockSaveModal';
import useModal from '../../hooks/useModal';
import { ProductAsync } from '../../store/product/reducer';
import { StockSaveActionPayload } from '../../store/stock/action';
import { StockPageAsync } from '../../store/stock/reducer';

interface ProductManagementDetailTemplateProps {
    productAsync: ProductAsync;
    stockPageAsync: StockPageAsync;
    saveStock: (payload: StockSaveActionPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductManagementDetailTemplate({ productAsync, stockPageAsync, saveStock, onPageChange }: ProductManagementDetailTemplateProps) {
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    // const onMoveList = useCallback(() => {
    //     const queryString = qs.stringify(productPageAsync.payload, { allowDots: true });
    //     history.push(`/admin/product/list?${queryString}`);
    // }, [productPageAsync.payload]);

    const onSaveStock = useCallback((payload: StockSaveActionPayload) => {
        saveStock({
            payload: payload.payload,
            onSuccess: stock => {
                payload.onSuccess && payload.onSuccess(stock);
                closeSaveModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <AdminLayout>
            <AdminProductDetail 
                product={productAsync.result}
                //onMoveList={onMoveList}
            />
            {productAsync.error && <ErrorDetail message={productAsync.error.message} />}
            <Title content={"재고"} />
            <StockManagementBar 
                onOpenSaveModal={openSaveModal}
            />
            <StockList stockList={stockPageAsync.result?.list} />
            <Pagination
                page={stockPageAsync.payload?.pageCriteria.page}  
                totalCount={stockPageAsync.result?.totalCount}
                onPageChange={onPageChange}
            />
            <StockSaveModal 
                isOpen={saveModalIsOpen} 
                onSaveStock={onSaveStock}
                onRequestClose={closeSaveModal}
            />
        </AdminLayout>
    )
};

export default ProductManagementDetailTemplate;