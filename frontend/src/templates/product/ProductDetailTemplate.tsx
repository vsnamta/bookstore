import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import Layout from '../../components/layout/Layout';
import ProductDetail from '../../components/product/ProductDetail';
import ReviewList from '../../components/reivew/ReviewList';
import ReviewManagementBar from '../../components/reivew/ReviewManagementBar';
import ReviewSaveModal from '../../components/reivew/ReviewSaveModal';
import { ApiError } from '../../error/ApiError';
import { CartSavePayload } from '../../models/carts';
import { FindPayload, Page } from '../../models/common';
import { OrderingProduct } from '../../models/orders';
import { ProductDetailResult } from '../../models/products';
import { ReviewResult, ReviewSavePayload } from '../../models/reviews';

interface ProductDetailTemplateProps {
    productAsync?: {
        payload?: number | undefined;
        result?: ProductDetailResult | undefined;
        error?: ApiError | undefined;
    };
    reviewPageAsync?: {
        payload?: FindPayload | undefined;
        result?: Page<ReviewResult> | undefined;
        error?: ApiError | undefined;
    };
    saveModalIsOpen: boolean;
    onSaveCart: (payload: CartSavePayload) => void;
    onPurchase: (orderingProductList: OrderingProduct[]) => void;
    onSaveReview: (payload: ReviewSavePayload) => void;
    onOpenSaveModal: () => void;
    closeSaveModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
    onPageChange: (selectedItem: {
        selected: number;
    }) => void;
}

function ProductDetailTemplate({
    productAsync, reviewPageAsync, saveModalIsOpen,
    onSaveCart, onPurchase, onSaveReview, onOpenSaveModal, closeSaveModal, onPageChange
}: ProductDetailTemplateProps) {
    return (
        <Layout>
            <ProductDetail 
                product={productAsync?.result} 
                onSaveCart={onSaveCart} 
                onPurchase={onPurchase} 
            />
            {productAsync?.error && <ErrorDetail message={productAsync.error.message} />}
            <Title content={"리뷰"} />
            <ReviewManagementBar 
                onOpenSaveModal={onOpenSaveModal}
            /> 
            <ReviewList 
                reviewList={reviewPageAsync?.result?.list}
            />
            <Pagination
                page={reviewPageAsync?.payload?.pageCriteria.page}  
                totalCount={reviewPageAsync?.result?.totalCount}
                onPageChange={onPageChange}
            />
            <ReviewSaveModal 
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveReview={onSaveReview}
            />
        </Layout>
    )
};

export default ProductDetailTemplate;