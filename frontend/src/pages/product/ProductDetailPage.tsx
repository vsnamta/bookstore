import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDetailTemplate from '../../components/product/ProductDetailTemplate';
import { FindPayload } from '../../models/common';
import { RootState } from '../../store';
import { CartSaveRequestActionPayload, createCartSaveRequestAction } from '../../store/cart/action';
import { createProductFindAction } from '../../store/product/action';
import { createReviewPageFindAction, createReviewSaveRequestAction, ReviewSaveRequestActionPayload } from '../../store/review/action';

function ProductDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData);
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const reviewPageAsync = useSelector((state: RootState) => state.reviews.reviewPageAsync);

    useEffect(() => {
        dispatch(createProductFindAction(Number.parseInt(id)));
        dispatch(createReviewPageFindAction({
            searchCriteria: { column: "productId", keyword: id },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveCart = useCallback((payload: CartSaveRequestActionPayload) => {
        dispatch(createCartSaveRequestAction(payload));
    }, [loginMember]);

    const saveReview = useCallback((payload: ReviewSaveRequestActionPayload) => {
        dispatch(createReviewSaveRequestAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createReviewPageFindAction({
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