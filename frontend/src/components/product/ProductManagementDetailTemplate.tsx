import qs from 'qs';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import useModal from '../../hooks/useModal';
import { ProductFindPayload } from '../../models/products';
import { ProductAsync } from '../../store/product/reducer';
import { StockSaveActionPayload } from '../../store/stock/action';
import { StockPageAsync } from '../../store/stock/reducer';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import StockList from '../stock/StockList';
import StockManagementBar from '../stock/StockManagementBar';
import StockSaveModal from '../stock/StockSaveModal';
import AdminProductDetail from './AdminProductDetail';

interface ProductManagementDetailTemplateProps {
    productAsync: ProductAsync;
    productFindPayload: ProductFindPayload;
    stockPageAsync: StockPageAsync;
    saveStock: (payload: StockSaveActionPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductManagementDetailTemplate({ productAsync, productFindPayload, stockPageAsync, saveStock, onPageChange }: ProductManagementDetailTemplateProps) {
    const history = useHistory();
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onMoveList = useCallback(() => {
        const queryString = qs.stringify(productFindPayload, { allowDots: true });
        history.push(`/admin/product/list?${queryString}`);
    }, [productFindPayload]);

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
                onMoveList={onMoveList}
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
                product={productAsync.result} 
                isOpen={saveModalIsOpen}
                onSaveStock={onSaveStock}
                onRequestClose={closeSaveModal}
            />
        </AdminLayout>
    )
};

export default ProductManagementDetailTemplate;