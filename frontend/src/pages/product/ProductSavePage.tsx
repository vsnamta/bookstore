import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSaveTemplate from '../../components/product/ProductSaveTemplate';
import { RootState } from '../../store';
import { createFindCategoryListAction } from '../../store/category/action';
import { createFindDiscountPolicyListAction } from '../../store/discountPolicy/action';
import { createSaveProductRequestAction, ProductSaveActionPayload } from '../../store/product/action';

function ProductSavePage() {
    const dispatch = useDispatch();
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(createFindDiscountPolicyListAction());
        dispatch(createFindCategoryListAction());
    }, []);

    const saveProduct = useCallback((payload: ProductSaveActionPayload) => {
        dispatch(createSaveProductRequestAction(payload));
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