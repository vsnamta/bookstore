import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSaveTemplate from '../../components/product/ProductSaveTemplate';
import { ProductSaveAsyncPayload } from '../../models/product/store';
import { RootState, rootActions } from '../../store';

function ProductSavePage() {
    const dispatch = useDispatch();
    const asyncDiscountPolicyList = useSelector((state: RootState) => state.discountPolcies.asyncDiscountPolicyList);
    const asyncCategoryList = useSelector((state: RootState) => state.categories.asyncCategoryList);

    useEffect(() => {
        dispatch(rootActions.fetchDiscountPolicyList());
        dispatch(rootActions.fetchCategoryList());
    }, []);

    const saveProduct = useCallback((payload: ProductSaveAsyncPayload) => {
        dispatch(rootActions.saveProductAsync(payload));
    }, []);

    return (
        <ProductSaveTemplate 
            asyncDiscountPolicyList={asyncDiscountPolicyList}
            asyncCategoryList={asyncCategoryList}
            saveProduct={saveProduct}
        />
    )
};

export default ProductSavePage;