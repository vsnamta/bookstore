import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductSaveAsyncPayload } from '../../models/product/store';
import { rootActions, RootState } from '../../store';
import ErrorDetail from '../../components/general/ErrorDetail';
import ProductSaveForm from '../../components/product/ProductSaveForm';

function ProductSaveFormContainer() {
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
        <>
            <ProductSaveForm
                discountPolicyList={asyncDiscountPolicyList.result}
                categoryList={asyncCategoryList.result}
                onSaveProduct={saveProduct} 
            />
            {(asyncDiscountPolicyList.error || asyncCategoryList.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </>
    )
};

export default ProductSaveFormContainer;