import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductUpdateTemplate from '../../components/product/ProductUpdateTemplate';
import { ProductUpdateAsyncPayload } from '../../models/product/store';
import { RootState, rootActions } from '../../store';

function ProductUpdatePage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

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
            productAsync={productAsync} 
            discountPolicyListAsync={discountPolicyListAsync}
            categoryListAsync={categoryListAsync}
            updateProduct={updateProduct}
        />
    )
};

export default ProductUpdatePage;