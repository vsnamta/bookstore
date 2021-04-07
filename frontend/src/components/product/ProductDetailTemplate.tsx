import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import Layout from '../common/Layout';
import ErrorDetail from '../general/ErrorDetail';
import Pagination from '../general/Pagination';
import Title from '../general/Title';
import ProductDetail from './ProductDetail';
import ReviewList from '../reivew/ReviewList';
import ReviewManagementBar from '../reivew/ReviewManagementBar';
import ReviewSaveModal from '../reivew/ReviewSaveModal';
import useModal from '../../hooks/useModal';
import { LoginMember } from '../../models/member';
import { CartSaveAsyncPayload } from '../../models/cart/store';
import { ReviewSaveAsyncPayload } from '../../models/review/store';
import { ProductAsync } from '../../models/product/store';
import { ReviewPageAsync } from '../../models/review/store';

interface ProductDetailTemplateProps {
    productAsync: ProductAsync;
    reviewPageAsync: ReviewPageAsync;
    loginMember?: LoginMember;
    saveCart: (payload: CartSaveAsyncPayload) => void;
    saveReview: (payload: ReviewSaveAsyncPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductDetailTemplate({
    productAsync, reviewPageAsync, loginMember, saveCart, saveReview, onPageChange
}: ProductDetailTemplateProps) {
    const history = useHistory();
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onOpenSaveModal = useCallback(() => {
        if(!loginMember) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        openSaveModal();
    }, [loginMember]);

    const onSaveReview = useCallback((payload: ReviewSaveAsyncPayload) => {
        saveReview({
            payload: payload.payload,
            onSuccess: review => {
                payload.onSuccess && payload.onSuccess(review);
                closeSaveModal();
            },
            onFailure: payload.onFailure
        });
    }, []);

    return (
        <Layout>
            <ProductDetail 
                product={productAsync.result}
                loginMember={loginMember} 
                onSaveCart={saveCart} 
            />
            {productAsync.error && <ErrorDetail message={productAsync.error.message} />}
            <Title content={"리뷰"} />
            <ReviewManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            /> 
            <ReviewList 
                reviewList={reviewPageAsync.result?.list}
            />
            <Pagination
                page={reviewPageAsync.payload?.pageCriteria.page}  
                totalCount={reviewPageAsync.result?.totalCount}
                onPageChange={onPageChange}
            />
            <ReviewSaveModal
                product={productAsync.result} 
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveReview={onSaveReview}
            />
        </Layout>
    )
};

export default ProductDetailTemplate;