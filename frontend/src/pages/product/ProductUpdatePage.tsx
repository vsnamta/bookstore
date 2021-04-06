import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductUpdateTemplate from '../../components/product/ProductUpdateTemplate';
import { RootState } from '../../store';
import { createCategoryListFindAction } from '../../store/category/action';
import { createDiscountPolicyListFindAction } from '../../store/discountPolicy/action';
import { createProductFindAction, createProductUpdateRequestAction, ProductUpdateRequestActionPayload } from '../../store/product/action';

function ProductUpdatePage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(createProductFindAction(Number.parseInt(id)));
        dispatch(createDiscountPolicyListFindAction());
        dispatch(createCategoryListFindAction());
    }, []);

    const updateProduct = useCallback((payload: ProductUpdateRequestActionPayload) => {
        dispatch(createProductUpdateRequestAction(payload));
    }, []);

    return (
        <ProductUpdateTemplate
            productAsync={productAsync} 
            discountPolicyListAsync={discountPolicyListAsync}
            categoryListAsync={categoryListAsync}
            updateProduct={updateProduct}
        />
    )
};

export default ProductUpdatePage;