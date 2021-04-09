import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDetailTemplate from '../../components/product/ProductDetailTemplate';
import { CartSaveAsyncPayload } from '../../models/cart/store';
import { FindPayload } from '../../models/common';
import { ReviewSaveAsyncPayload } from '../../models/review/store';
import { RootState, rootActions } from '../../store';

function ProductDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData);
    const asyncProduct = useSelector((state: RootState) => state.products.asyncProduct);
    const asyncReviewPage = useSelector((state: RootState) => state.reviews.asyncReviewPage);

    useEffect(() => {
        dispatch(rootActions.fetchProduct(Number.parseInt(id)));
        dispatch(rootActions.fetchReviewPage({
            searchCriteria: { column: "productId", keyword: id },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveCart = useCallback((payload: CartSaveAsyncPayload) => {
        dispatch(rootActions.saveCartAsync(payload));
    }, [myData]);

    const saveReview = useCallback((payload: ReviewSaveAsyncPayload) => {
        dispatch(rootActions.saveReviewAsync(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(rootActions.fetchReviewPage({
            ...asyncReviewPage.payload as FindPayload,
            pageCriteria: {
                ...(asyncReviewPage.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [asyncReviewPage.payload]);

    return (
        <ProductDetailTemplate 
            asyncProduct={asyncProduct}
            asyncReviewPage={asyncReviewPage}
            myData={myData}
            saveCart={saveCart}
            saveReview={saveReview}
            onPageChange={onPageChange}
        />
    )
};

export default ProductDetailPage;