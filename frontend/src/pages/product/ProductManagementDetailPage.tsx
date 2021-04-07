import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductManagementDetailTemplate from '../../components/product/ProductManagementDetailTemplate';
import { ProductFindPayload } from '../../models/product';
import { StockFindPayload } from '../../models/stock';
import { StockSaveAsyncPayload } from '../../models/stock/store';
import { RootState } from '../../store';
import { actions as productActions } from '../../store/product';
import { actions as stockActions } from '../../store/stock';

function ProductManagementDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const { productPageAsync, productAsync } = useSelector((state: RootState) => state.products);
    const stockPageAsync = useSelector((state: RootState) => state.stocks.stockPageAsync);

    useEffect(() => {
        dispatch(productActions.fetchProduct(Number.parseInt(id)));
        dispatch(stockActions.fetchStockPage({
            productId: Number.parseInt(id),
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveStock = useCallback((payload: StockSaveAsyncPayload) => {
        dispatch(stockActions.saveStockAsync(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(stockActions.fetchStockPage({
            ...stockPageAsync.payload as StockFindPayload,
            pageCriteria: {
                ...(stockPageAsync.payload as StockFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [stockPageAsync.payload]);
    
    return (
        <ProductManagementDetailTemplate 
            productAsync={productAsync}
            productFindPayload={productPageAsync.payload as ProductFindPayload}
            stockPageAsync={stockPageAsync}
            saveStock={saveStock}
            onPageChange={onPageChange}
        />
    )
};

export default ProductManagementDetailPage;