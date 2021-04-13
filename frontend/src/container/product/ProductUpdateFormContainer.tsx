import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductUpdateAsyncPayload } from '../../models/product/store';
import { rootActions, RootState } from '../../store';
import ErrorDetail from '../../components/general/ErrorDetail';
import ProductUpdateForm from '../../components/product/ProductUpdateForm';

function ProductUpdateFormContainer() {
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
        <>
            <ProductUpdateForm
                product={asyncProduct.result}
                discountPolicyList={asyncDiscountPolicyList.result}
                categoryList={asyncCategoryList.result}
                onUpdateProduct={updateProduct} 
            />
            {(asyncProduct.error || asyncDiscountPolicyList.error || asyncCategoryList.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </>
    )
};

export default ProductUpdateFormContainer;