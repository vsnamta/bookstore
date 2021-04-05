import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StockFindPayload } from '../../models/stocks';
import { RootState } from '../../store';
import { createFindProductAction } from '../../store/product/action';
import { createFindStockPageAction, createSaveStockAction, StockSaveActionPayload } from '../../store/stock/action';
import ProductManagementDetailTemplate from '../../components/product/ProductManagementDetailTemplate';
import { ProductFindPayload } from '../../models/products';

function ProductManagementDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const { productPageAsync, productAsync } = useSelector((state: RootState) => state.products);
    const stockPageAsync = useSelector((state: RootState) => state.stocks.stockPageAsync);

    useEffect(() => {
        dispatch(createFindProductAction(Number.parseInt(id)));
        dispatch(createFindStockPageAction({
            productId: Number.parseInt(id),
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveStock = useCallback((payload: StockSaveActionPayload) => {
        dispatch(createSaveStockAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createFindStockPageAction({
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