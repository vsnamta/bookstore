import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSaveTemplate from '../../components/product/ProductSaveTemplate';
import { RootState } from '../../store';
import { createCategoryListFindAction } from '../../store/category/action';
import { createDiscountPolicyListFindAction } from '../../store/discountPolicy/action';
import { createProductSaveRequestAction, ProductSaveRequestActionPayload } from '../../store/product/action';

function ProductSavePage() {
    const dispatch = useDispatch();
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(createDiscountPolicyListFindAction());
        dispatch(createCategoryListFindAction());
    }, []);

    const saveProduct = useCallback((payload: ProductSaveRequestActionPayload) => {
        dispatch(createProductSaveRequestAction(payload));
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