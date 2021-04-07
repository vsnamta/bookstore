import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSaveTemplate from '../../components/product/ProductSaveTemplate';
import { ProductSaveAsyncPayload } from '../../models/product/store';
import { RootState, rootActions } from '../../store';

function ProductSavePage() {
    const dispatch = useDispatch();
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(rootActions.fetchDiscountPolicyList());
        dispatch(rootActions.fetchCategoryList());
    }, []);

    const saveProduct = useCallback((payload: ProductSaveAsyncPayload) => {
        dispatch(rootActions.saveProductAsync(payload));
    }, []);

    return (
        <ProductSaveTemplate 
            discountPolicyListAsync={discountPolicyListAsync}
            categoryListAsync={categoryListAsync}
            saveProduct={saveProduct}
        />
    )
};

export default ProductSavePage;