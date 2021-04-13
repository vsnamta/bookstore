import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductManagement from '../../components/product/ProductManagement';
import { SearchCriteria } from '../../models/common';
import { ProductFindPayload } from '../../models/product';
import { rootActions, RootState } from '../../store';

function ProductManagementContainer() {
    const location = useLocation();
    const {categoryId, searchCriteria, pageCriteria} = qs.parse(location.search, { 
        ignoreQueryPrefix: true, 
        allowDots: true 
    });

    const dispatch = useDispatch();
    const asyncProductPage = useSelector((state: RootState) => state.products.asyncProductPage);

    useEffect(() => {
        dispatch(rootActions.fetchProductPage({
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
        dispatch(rootActions.fetchProductPage({
            searchCriteria: searchCriteria,
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchProductPage({
            ...asyncProductPage.payload as ProductFindPayload,
            pageCriteria: {
                ...(asyncProductPage.payload as ProductFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncProductPage.payload]);
    
    return (
        <ProductManagement 
            asyncProductPage={asyncProductPage}
            onUpdateSearchCriteria={onUpdateSearchCriteria}
            onPageChange={onPageChange}
        />
    )
};

export default ProductManagementContainer;