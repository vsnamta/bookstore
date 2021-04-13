import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductListTemplate from '../../components/product/ProductListTemplate';
import { ProductFindPayload } from '../../models/product';
import { rootActions, RootState } from '../../store';

function ProductListTemplateContainer() {  
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

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchProductPage({
            ...asyncProductPage.payload as ProductFindPayload,
            pageCriteria: {
                ...(asyncProductPage.payload as ProductFindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncProductPage.payload]);

    const onSortChange = useCallback((sortCriteria: { sortColumn: string, sortDirection: string }) => {
        dispatch(rootActions.fetchProductPage({
            ...asyncProductPage.payload as ProductFindPayload,
            pageCriteria: {
                ...(asyncProductPage.payload as ProductFindPayload).pageCriteria, 
                sortColumn: sortCriteria.sortColumn,
                sortDirection: sortCriteria.sortDirection
            }
        }));
    }, [asyncProductPage.payload]);

    return (
        <ProductListTemplate 
            asyncProductPage={asyncProductPage}
            onPageChange={onPageChange}
            onSortChange={onSortChange}
        />
    )
};

export default ProductListTemplateContainer;