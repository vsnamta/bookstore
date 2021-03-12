import React, { useCallback, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import Pagination from '../../components/general/Pagination';
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
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    const history = useHistory();

    const { id } = useParams<{id: string}>();
    
    const productsState = useSelector((state: RootState) => state.products);
    const reviewPageState = useSelector((state: RootState) => state.reviews.reviewPageAsync);
    const dispatch = useDispatch();

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
            onFailure: error => {}
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
            onFailure: error => {}
        }));
    }, []);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        dispatch(findReviewPage({
            ...reviewPageState.payload as FindPayload,
            pageCriteria: {
                ...(reviewPageState.payload as FindPayload).pageCriteria, 
                page:selectedItem.selected + 1
            }
        }));
    }, [reviewPageState.payload]);

    return (
        <Layout>
            <main className=" inner-page-sec-padding-bottom">
                <div className="container">
                    <ProductDetail 
                        product={productsState.productAsync.result} 
                        onSaveCart={onSaveCart} 
                        onPurchase={onPurchase} 
                    />
                    {productsState.productAsync.error && <ErrorDetail message={"오류 발생"} />}
                    <div className="section-title section-title--bordered">
                        <h2>리뷰</h2>
                    </div>
                    <ReviewManagementBar 
                        onOpenSaveModal={onOpenSaveModal}
                    /> 
                    <ReviewList 
                        reviewList={reviewPageState.result?.list}
                    />
                    <Pagination
                        page={reviewPageState.payload?.pageCriteria.page}  
                        totalCount={reviewPageState.result?.totalCount}
                        onPageChange={onPageChange}
                    />
                    <ReviewSaveModal 
                        isOpen={saveModalIsOpen}
                        onRequestClose={closeSaveModal}
                        onSaveReview={onSaveReview}
                    />
                </div>
            </main>
        </Layout>
    )
};

export default ProductDetailPage;