import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProductDetail from '../../components/product/AdminProductDetail';
import StockList from '../../components/stock/StockList';
import StockManagementBar from '../../components/stock/StockManagementBar';
import StockSaveModal from '../../components/stock/StockSaveModal';
import useModal from '../../hooks/useModal';
import { StockFindPayload, StockSavePayload } from '../../models/stocks';
import { RootState } from '../../store';
import { findProduct } from '../../store/product/action';
import { findStockPage, saveStock } from '../../store/stock/action';

function ProductManagementDetailPage() {
    const history = useHistory();
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const { productPageAsync, productAsync } = useSelector((state: RootState) => state.products);
    const stockPageAsync = useSelector((state: RootState) => state.stocks.stockPageAsync);

    useEffect(() => {
        dispatch(findProduct(Number.parseInt(id)));
        dispatch(findStockPage({
            productId: Number.parseInt(id),
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onMoveUpdate = useCallback(() => {
        history.push(`/admin/product/update/${id}`);
    }, []);

    const onMoveList = useCallback(() => {
        const queryString = qs.stringify(productPageAsync.payload, { allowDots: true });
        history.push(`/admin/product/list?${queryString}`);
    }, [productPageAsync.payload]);

    const onSaveStock = useCallback((payload: StockSavePayload) => {
        dispatch(saveStock({
            payload: payload,
            onSuccess: stock => {
                alert("저장되었습니다.");
                closeSaveModal()
            },
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findStockPage({
            ...stockPageAsync.payload as StockFindPayload,
            pageCriteria: {
                ...(stockPageAsync.payload as StockFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [stockPageAsync.payload]);
    
    return (
        <AdminLayout>
            <AdminProductDetail 
                product={productAsync.result}
                onMoveUpdate={onMoveUpdate}
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
                isOpen={saveModalIsOpen} 
                onSaveStock={onSaveStock}
                onRequestClose={closeSaveModal}
            />
        </AdminLayout>
    )
};

export default ProductManagementDetailPage;