import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDetailTemplate from '../../components/product/ProductDetailTemplate';
import { CartSaveAsyncPayload } from '../../models/cart/store';
import { FindPayload } from '../../models/common';
import { ReviewSaveAsyncPayload } from '../../models/review/store';
import { RootState } from '../../store';
import { actions as cartActions } from '../../store/cart';
import { actions as productActions } from '../../store/product';
import { actions as reviewActions } from '../../store/review';

function ProductDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData);
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const reviewPageAsync = useSelector((state: RootState) => state.reviews.reviewPageAsync);

    useEffect(() => {
        dispatch(productActions.fetchProduct(Number.parseInt(id)));
        dispatch(reviewActions.fetchReviewPage({
            searchCriteria: { column: "productId", keyword: id },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveCart = useCallback((payload: CartSaveAsyncPayload) => {
        dispatch(cartActions.saveCartAsync(payload));
    }, [loginMember]);

    const saveReview = useCallback((payload: ReviewSaveAsyncPayload) => {
        dispatch(reviewActions.saveReviewAsync(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(reviewActions.fetchReviewPage({
            ...reviewPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(reviewPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [reviewPageAsync.payload]);

    return (
        <ProductDetailTemplate 
            productAsync={productAsync}
            reviewPageAsync={reviewPageAsync}
            loginMember={loginMember}
            saveCart={saveCart}
            saveReview={saveReview}
            onPageChange={onPageChange}
        />
    )
};

export default ProductDetailPage;