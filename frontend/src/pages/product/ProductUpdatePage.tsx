import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductUpdateTemplate from '../../components/product/ProductUpdateTemplate';
import { ProductUpdateAsyncPayload } from '../../models/product/store';
import { RootState } from '../../store';
import { actions as categoryActions } from '../../store/category';
import { actions as discountPolicyActions } from '../../store/discountPolicy';
import { actions as productActions } from '../../store/product';

function ProductUpdatePage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(productActions.fetchProduct(Number.parseInt(id)));
        dispatch(discountPolicyActions.fetchDiscountPolicyList());
        dispatch(categoryActions.fetchCategoryList());
    }, []);

    const updateProduct = useCallback((payload: ProductUpdateAsyncPayload) => {
        dispatch(productActions.updateProductAsync(payload));
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