import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductManagementDetailTemplate from '../../components/product/ProductManagementDetailTemplate';
import { ProductFindPayload } from '../../models/product';
import { StockFindPayload } from '../../models/stock';
import { StockSaveAsyncPayload } from '../../models/stock/store';
import { RootState, rootActions } from '../../store';

function ProductManagementDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const { asyncProductPage, asyncProduct } = useSelector((state: RootState) => state.products);
    const asyncStockPage = useSelector((state: RootState) => state.stocks.asyncStockPage);

    useEffect(() => {
        dispatch(rootActions.fetchProduct(Number.parseInt(id)));
        dispatch(rootActions.fetchStockPage({
            productId: Number.parseInt(id),
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveStock = useCallback((payload: StockSaveAsyncPayload) => {
        dispatch(rootActions.saveStockAsync(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchStockPage({
            ...asyncStockPage.payload as StockFindPayload,
            pageCriteria: {
                ...(asyncStockPage.payload as StockFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncStockPage.payload]);
    
    return (
        <ProductManagementDetailTemplate 
            asyncProduct={asyncProduct}
            productFindPayload={asyncProductPage.payload as ProductFindPayload}
            asyncStockPage={asyncStockPage}
            saveStock={saveStock}
            onPageChange={onPageChange}
        />
    )
};

export default ProductManagementDetailPage;