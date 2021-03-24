import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SearchCriteria } from '../../models/common';
import { ProductFindPayload } from '../../models/products';
import { RootState } from '../../store';
import { createFindProductPageAction } from '../../store/product/action';
import ProductManagementTemplate from '../../components/product/ProductManagementTemplate';

function ProductManagementPage() {
    const location = useLocation();
    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const dispatch = useDispatch();
    const productPageAsync = useSelector((state: RootState) => state.products.productPageAsync);

    useEffect(() => {
        dispatch(createFindProductPageAction({
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

    const onUpdateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        dispatch(createFindProductPageAction({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createFindProductPageAction({
            ...productPageAsync.payload as ProductFindPayload,
            pageCriteria: {
                ...(productPageAsync.payload as ProductFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [productPageAsync.payload]);
    
    return (
        <ProductManagementTemplate 
            productPageAsync={productPageAsync}
            onUpdateSearchCriteria={onUpdateSearchCriteria}
            onPageChange={onPageChange}
        />
    )
};

export default ProductManagementPage;