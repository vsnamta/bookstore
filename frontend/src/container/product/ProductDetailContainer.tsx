import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CartSaveAsyncPayload } from '../../models/cart/store';
import { rootActions, RootState } from '../../store';
import ErrorDetail from '../../components/general/ErrorDetail';
import ProductDetail from '../../components/product/ProductDetail';

function ProductDetailContainer() {
    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData);
    const asyncProduct = useSelector((state: RootState) => state.products.asyncProduct);

    useEffect(() => {
        dispatch(rootActions.fetchProduct(Number.parseInt(id)));
    }, []);

    const saveCart = useCallback((payload: CartSaveAsyncPayload) => {
        dispatch(rootActions.saveCartAsync(payload));
    }, [myData]);

    return (
        <>
            <ProductDetail 
                product={asyncProduct.result}
                myData={myData} 
                onSaveCart={saveCart} 
            />
            {asyncProduct.error && <ErrorDetail message={asyncProduct.error.message} />}
        </>
    )
};

export default ProductDetailContainer;