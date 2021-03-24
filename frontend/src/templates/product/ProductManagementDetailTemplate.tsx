import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductDetail from '../../components/product/AdminProductDetail';
import StockList from '../../components/stock/StockList';
import StockManagementBar from '../../components/stock/StockManagementBar';
import StockSaveModal from '../../components/stock/StockSaveModal';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductDetailResult } from '../../models/products';
import { StockFindPayload, StockResult, StockSavePayload } from '../../models/stocks';

interface ProductManagementDetailTemplateProps {
    productAsync?: {
        payload?: number | undefined;
        result?: ProductDetailResult | undefined;
        error?: ApiError | undefined;
    };
    stockPageAsync?: {
        payload?: StockFindPayload | undefined;
        result?: Page<StockResult> | undefined;
        error?: ApiError | undefined;
    };
    saveModalIsOpen: boolean;
    onMoveUpdate: () => void;
    onMoveList: () => void;
    onSaveStock: (payload: StockSavePayload) => void;
    onOpenSaveModal: () => void;
    closeSaveModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductManagementDetailTemplate({
    productAsync, stockPageAsync, saveModalIsOpen,
    onMoveUpdate, onMoveList, onSaveStock, onOpenSaveModal, closeSaveModal, onPageChange
}: ProductManagementDetailTemplateProps) {
    return (
        <AdminLayout>
            <AdminProductDetail 
                product={productAsync?.result}
                onMoveUpdate={onMoveUpdate}
                onMoveList={onMoveList}
            />
            {productAsync?.error && <ErrorDetail message={productAsync.error.message} />}
            <Title content={"재고"} />
            <StockManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            />
            <StockList stockList={stockPageAsync?.result?.list} />
            <Pagination
                page={stockPageAsync?.payload?.pageCriteria.page}  
                totalCount={stockPageAsync?.result?.totalCount}
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