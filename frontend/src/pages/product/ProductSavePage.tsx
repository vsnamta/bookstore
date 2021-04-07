import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSaveTemplate from '../../components/product/ProductSaveTemplate';
import { ProductSaveAsyncPayload } from '../../models/product/store';
import { RootState } from '../../store';
import { actions as categoryActions } from '../../store/category';
import { actions as discountPolicyActions } from '../../store/discountPolicy';
import { actions as productActions } from '../../store/product';

function ProductSavePage() {
    const dispatch = useDispatch();
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(discountPolicyActions.fetchDiscountPolicyList());
        dispatch(categoryActions.fetchCategoryList());
    }, []);

    const saveProduct = useCallback((payload: ProductSaveAsyncPayload) => {
        dispatch(productActions.saveProductAsync(payload));
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