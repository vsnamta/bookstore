import qs from 'qs';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import useModal from '../../hooks/useModal';
import { ProductFindPayload } from '../../models/product';
import { AsyncProduct } from '../../models/product/store';
import { AsyncStockPage } from '../../models/stock/store';
import { StockSaveAsyncPayload } from '../../models/stock/store';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import StockList from '../stock/StockList';
import StockManagementBar from '../stock/StockManagementBar';
import StockSaveModal from '../stock/StockSaveModal';
import AdminProductDetail from './AdminProductDetail';

interface ProductManagementDetailTemplateProps {
    asyncProduct: AsyncProduct;
    productFindPayload?: ProductFindPayload;
    asyncStockPage: AsyncStockPage;
    saveStock: (payload: StockSaveAsyncPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductManagementDetailTemplate({ asyncProduct, productFindPayload, asyncStockPage, saveStock, onPageChange }: ProductManagementDetailTemplateProps) {
    const history = useHistory();
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onMoveList = useCallback(() => {
        const queryString = qs.stringify(productFindPayload, { allowDots: true });
        history.push(`/admin/product/list?${queryString}`);
    }, [productFindPayload]);

    const onSaveStock = useCallback((payload: StockSaveAsyncPayload) => {
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
                product={asyncProduct.result}
                onMoveList={onMoveList}
            />
            {asyncProduct.error && <ErrorDetail message={asyncProduct.error.message} />}
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
                product={asyncProduct.result} 
                isOpen={saveModalIsOpen}
                onSaveStock={onSaveStock}
                onRequestClose={closeSaveModal}
            />
        </AdminLayout>
    )
};

export default ProductManagementDetailTemplate;