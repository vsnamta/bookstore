import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
import Title from '../../components/general/Title';
import Layout from '../../components/layout/Layout';
import ProductDetail from '../../components/product/ProductDetail';
import ReviewList from '../../components/reivew/ReviewList';
import ReviewManagementBar from '../../components/reivew/ReviewManagementBar';
import ReviewSaveModal from '../../components/reivew/ReviewSaveModal';
import useModal from '../../hooks/useModal';
import { CartSavePayload } from '../../models/carts';
import { FindPayload } from '../../models/common';
import { OrderingProduct } from '../../models/orders';
import { ReviewSavePayload } from '../../models/reviews';
import { RootState } from '../../store';
import { saveCart } from '../../store/cart/action';
import { findProduct } from '../../store/product/action';
import { findReviewPage, saveReview } from '../../store/review/action';

function ProductDetailPage() {
    const history = useHistory();
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember);
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const reviewPageAsync = useSelector((state: RootState) => state.reviews.reviewPageAsync);

    useEffect(() => {
        dispatch(findProduct(Number.parseInt(id)));
        dispatch(findReviewPage({
            searchCriteria: { column: "productId", keyword: id },
            pageCriteria: { page: 1, size: 10 }
        }));
    }, []);

    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onSaveCart = useCallback((payload: CartSavePayload) => {
        if(!loginMember) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        dispatch(saveCart({
            payload: payload,
            onSuccess: cart => {
                if(confirm("저장되었습니다. 장바구니로 이동하시겠습니까?")) {
                    history.push("/cart");
                }
            },
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, [loginMember]);

    const onPurchase = useCallback((orderingProductList: OrderingProduct[]) => {
        if(!loginMember) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        history.push("/order/form", { orderingProductList });
    }, [loginMember]);

    const onOpenSaveModal = useCallback(() => {
        if(!loginMember) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        openSaveModal();
    }, [loginMember]);

    const onSaveReview = useCallback((payload: ReviewSavePayload) => {
        dispatch(saveReview({
            payload: payload,
            onSuccess: review => {
                alert("저장되었습니다.");
                closeSaveModal();
            },
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findReviewPage({
            ...reviewPageAsync.payload as FindPayload,
            pageCriteria: {
                ...(reviewPageAsync.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [reviewPageAsync.payload]);

    return (
        <Layout>
            <ProductDetail 
                product={productAsync.result} 
                onSaveCart={onSaveCart} 
                onPurchase={onPurchase} 
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
                isOpen={saveModalIsOpen}
                onRequestClose={closeSaveModal}
                onSaveReview={onSaveReview}
            />
        </Layout>
    )
};

export default ProductDetailPage;