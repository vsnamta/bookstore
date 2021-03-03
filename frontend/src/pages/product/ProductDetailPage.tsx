import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ProductDetail from '../../components/product/ProductDetail';
import ReviewList from '../../components/reivew/ReviewList';
import ReviewManagementBar from '../../components/reivew/ReviewManagementBar';
import ReviewSaveModal from '../../components/reivew/ReviewSaveModal';
import useModal from '../../hooks/common/useModal';
import useProduct from '../../hooks/product/useProduct';
import useReviewManagement from '../../hooks/review/useReviewManagement';
import { CartSavePayload } from '../../models/carts';
import { FindPayload } from '../../models/common';
import { OrderingProduct } from '../../models/orders';
import { ReviewSavePayload } from '../../models/reviews';
import cartApi from '../../apis/cartApi';
import { RootState } from '../../store';
import { ApiError } from '../../error/ApiError';
import ErrorDetail from '../../components/general/ErrorDetail';

function ProductDetailPage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    const history = useHistory();

    const { id } = useParams<{id: string}>();
    const [productState] = useProduct(Number.parseInt(id));
    
    const [reviewManagementState, useReviewManagementMethods] = useReviewManagement({ column: "productId", keyword: id });
    const {reviewPageState} = reviewManagementState;
    const {
        updatePageCriteria,
        saveReview
    } = useReviewManagementMethods;
    
    const [saveModalIsOpen, openSaveModal, closeSaveModal] = useModal();

    const onSaveCart = useCallback((payload: CartSavePayload) => {
        if(!loginMember) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        cartApi.save(payload)
            .then(savedCart => {
                alert("장바구니에 저장되었습니다.");
                history.push("/cart");
            })
            .catch((error: ApiError) => {
                
            });
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
        saveReview(payload)
            .then(() => closeSaveModal());
    }, [saveReview]);

    const onPageChange = useCallback((selectedItem: { selected: number }) => {
        updatePageCriteria({
            ...(reviewPageState.payload as FindPayload).pageCriteria,
            page: selectedItem.selected + 1
        });
    }, [updatePageCriteria, reviewPageState.payload]);

    return (
        <Layout>
            <main className=" inner-page-sec-padding-bottom">
                <div className="container">
                    {productState.error && <ErrorDetail message={"오류 발생"} />}
                    {productState.result &&
                    <ProductDetail 
                        product={productState.result} 
                        onSaveCart={onSaveCart} 
                        onPurchase={onPurchase} 
                    />}
                    <div className="section-title section-title--bordered">
                        <h2>리뷰</h2>
                    </div>
                    {reviewPageState.result &&
                    <>
                        <ReviewManagementBar 
                            onOpenSaveModal={onOpenSaveModal}
                        /> 
                        <ReviewList 
                            reviewList={reviewPageState.result.list}
                        />
                        <div className="row pt--30">
                            <div className="col-md-12">
                                <div className="pagination-block">
                                    <ReactPaginate 
                                        pageCount={Math.ceil(reviewPageState.result.totalCount / 10)}
                                        pageRangeDisplayed={10}
                                        marginPagesDisplayed={0}
                                        onPageChange={onPageChange}
                                        containerClassName={"pagination-btns flex-center"}
                                        previousLinkClassName={"single-btn prev-btn"}
                                        previousLabel={"<"}
                                        activeClassName={"active"}
                                        pageLinkClassName={"single-btn"}
                                        nextLinkClassName={"single-btn next-btn"}
                                        nextLabel={">"}
                                    />
                                </div>
                            </div>
                        </div>
                    </>}
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