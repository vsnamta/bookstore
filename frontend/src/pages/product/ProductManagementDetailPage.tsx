import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductManagementDetailTemplate from '../../components/product/ProductManagementDetailTemplate';
import { ProductFindPayload } from '../../models/products';
import { StockFindPayload } from '../../models/stocks';
import { RootState } from '../../store';
import { createProductFindAction } from '../../store/product/action';
import { createStockPageFindAction, createStockSaveRequestAction, StockSaveRequestActionPayload } from '../../store/stock/action';

function ProductManagementDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const { productPageAsync, productAsync } = useSelector((state: RootState) => state.products);
    const stockPageAsync = useSelector((state: RootState) => state.stocks.stockPageAsync);

    useEffect(() => {
        dispatch(createProductFindAction(Number.parseInt(id)));
        dispatch(createStockPageFindAction({
            productId: Number.parseInt(id),
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveStock = useCallback((payload: StockSaveRequestActionPayload) => {
        dispatch(createStockSaveRequestAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createStockPageFindAction({
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