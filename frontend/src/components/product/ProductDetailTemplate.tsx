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
import { MyData } from '../../models/auth';
import { CartSaveAsyncPayload } from '../../models/cart/store';
import { ReviewSaveAsyncPayload } from '../../models/review/store';
import { AsyncProduct } from '../../models/product/store';
import { AsyncReviewPage } from '../../models/review/store';

interface ProductDetailTemplateProps {
    asyncProduct: AsyncProduct;
    asyncReviewPage: AsyncReviewPage;
    myData?: MyData;
    saveCart: (payload: CartSaveAsyncPayload) => void;
    saveReview: (payload: ReviewSaveAsyncPayload) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductDetailTemplate({
    asyncProduct, asyncReviewPage, myData, saveCart, saveReview, onPageChange
}: ProductDetailTemplateProps) {
    const history = useHistory();
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onOpenSaveModal = useCallback(() => {
        if(!myData) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        openSaveModal();
    }, [myData]);

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
                product={asyncProduct.result}
                myData={myData} 
                onSaveCart={saveCart} 
            />
            {asyncProduct.error && <ErrorDetail message={asyncProduct.error.message} />}
            <Title content={"리뷰"} />
            <ReviewManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            /> 
            <ReviewList 
                reviewList={asyncReviewPage.result?.list}
            />
            <Pagination
                page={asyncReviewPage.payload?.pageCriteria.page}  
                totalCount={asyncReviewPage.result?.totalCount}
                onPageChange={onPageChange}
            />
            <ReviewSaveModal
                product={asyncProduct.result} 
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveReview={onSaveReview}
            />
        </Layout>
    )
};

export default ProductDetailTemplate;