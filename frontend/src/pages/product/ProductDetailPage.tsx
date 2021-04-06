import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDetailTemplate from '../../components/product/ProductDetailTemplate';
import { FindPayload } from '../../models/common';
import { RootState } from '../../store';
import { CartSaveActionPayload, createSaveCartRequestAction } from '../../store/cart/action';
import { createFindProductAction } from '../../store/product/action';
import { createFindReviewPageAction, createSaveReviewRequestAction, ReviewSaveActionPayload } from '../../store/review/action';

function ProductDetailPage() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData);
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const reviewPageAsync = useSelector((state: RootState) => state.reviews.reviewPageAsync);

    useEffect(() => {
        dispatch(createFindProductAction(Number.parseInt(id)));
        dispatch(createFindReviewPageAction({
            searchCriteria: { column: "productId", keyword: id },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const saveCart = useCallback((payload: CartSaveActionPayload) => {
        dispatch(createSaveCartRequestAction(payload));
    }, [loginMember]);

    const saveReview = useCallback((payload: ReviewSaveActionPayload) => {
        dispatch(createSaveReviewRequestAction(payload));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(createFindReviewPageAction({
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