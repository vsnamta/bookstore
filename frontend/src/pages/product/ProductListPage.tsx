import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ProductFindPayload } from '../../models/product';
import { RootState } from '../../store';
import { actions } from '../../store/product';
import ProductListTemplate from '../../components/product/ProductListTemplate';

function ProductListPage() {  
    const location = useLocation();
    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const dispatch = useDispatch();
    const productPageAsync = useSelector((state: RootState) => state.products.productPageAsync);

    useEffect(() => {
        dispatch(actions.fetchProductPage({
            categoryId: categoryId? Number.parseInt(categoryId as string): undefined,
            searchCriteria: searchCriteria
                ? {
                    column: (searchCriteria as qs.ParsedQs).column as string, 
                    keyword: (searchCriteria as qs.ParsedQs).keyword as string
                }
                : undefined,
            pageCriteria: {
                page: pageCriteria? Number.parseInt((pageCriteria as qs.ParsedQs).page as string): 1, 
                size: 10
            }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(actions.fetchProductPage({
            ...productPageAsync.payload as ProductFindPayload,
            pageCriteria: {
                ...(productPageAsync.payload as ProductFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [productPageAsync.payload]);

    const onSortChange = useCallback((sortCriteria: { sortColumn: string, sortDirection: string }) => {
        dispatch(actions.fetchProductPage({
            ...productPageAsync.payload as ProductFindPayload,
            pageCriteria: {
                ...(productPageAsync.payload as ProductFindPayload).pageCriteria, 
                sortColumn: sortCriteria.sortColumn,
                sortDirection: sortCriteria.sortDirection
            }
        }));
    }, [productPageAsync.payload]);

    return (
        <ProductListTemplate 
            productPageAsync={productPageAsync}
            onPageChange={onPageChange}
            onSortChange={onSortChange}
        />
    )
};

export default ProductListPage;