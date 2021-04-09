import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductUpdateTemplate from '../../components/product/ProductUpdateTemplate';
import { ProductUpdateAsyncPayload } from '../../models/product/store';
import { RootState, rootActions } from '../../store';

function ProductUpdatePage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const asyncProduct = useSelector((state: RootState) => state.products.asyncProduct);
    const asyncDiscountPolicyList = useSelector((state: RootState) => state.discountPolcies.asyncDiscountPolicyList);
    const asyncCategoryList = useSelector((state: RootState) => state.categories.asyncCategoryList);

    useEffect(() => {
        dispatch(rootActions.fetchProduct(Number.parseInt(id)));
        dispatch(rootActions.fetchDiscountPolicyList());
        dispatch(rootActions.fetchCategoryList());
    }, []);

    const updateProduct = useCallback((payload: ProductUpdateAsyncPayload) => {
        dispatch(rootActions.updateProductAsync(payload));
    }, []);

    return (
        <ProductUpdateTemplate
            asyncProduct={asyncProduct} 
            asyncDiscountPolicyList={asyncDiscountPolicyList}
            asyncCategoryList={asyncCategoryList}
            updateProduct={updateProduct}
        />
    )
};

export default ProductUpdatePage;