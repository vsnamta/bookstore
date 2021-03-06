import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { ProductDetailResult } from '../../models/product';

interface AdminProductDetailProps {
    product?: ProductDetailResult;
	onMoveList: () => void;
}

function AdminProductDetail({ product, onMoveList }: AdminProductDetailProps) {
	if(!product) {
        return null;
    }

	console.log(product.tableOfContents.split("\n"));

	const history = useHistory();

    const onMoveUpdate = useCallback(() => {
        history.push(`/admin/product/update/${product.id}`);
    }, []);

    return (
		<>
			<div className="row mb--60">
				<div className="col-lg-5 mb--30">
					{/* <!-- Product Details Slider Big Image--> */}
					<div className="product-details-slider sb-slick-slider arrow-type-two">
						<div className="single-slide">
							<img src={`/api/files/${product.imageFileName}`} alt="" />
						</div>
					</div>
				</div>
				<div className="col-lg-7">
					<div className="product-details-info pl-lg--30">
						<p className="tag-block">{`${product.superCategoryName} > ${product.subCategoryName}`}</p>
						<h3 className="product-title">{product.name}</h3>
						<ul className="list-unstyled">
							<li>저자: <span className="list-value">{product.author}</span></li>
							<li>출판사: <span className="list-value">{product.publisher}</span></li>
							<li>출판일: <span className="list-value">{product.publishedDate}</span></li>
							<li>총 페이지: <span className="list-value">{product.totalPage}</span></li>
							<li>ISBN: <span className="list-value">{product.isbn}</span></li>
						</ul>
						<div className="price-block">
							<span className="price-new">{(product.regularPrice * (1 -(product.discountPercent / 100)))}원</span>
							<del className="price-old">{product.regularPrice}원</del>
						</div>
						<div className="rating-widget">
							<div className="review-widget">
								재고수량: {product.stockQuantity}개
							</div>
						</div>
						<article className="product-details-article">
							<p>구매시 정가의 {product.discountPercent}% 할인, {product.depositPercent}% 적립 / 배송비 무료</p>
						</article>
						<div className="add-to-cart-row">
							<div className="add-cart-btn">
								<a href="javascript:void(0)" className="btn btn-outlined--primary" onClick={onMoveUpdate}>수정</a>
								<a href="javascript:void(0)" className="btn btn-outlined--primary" onClick={onMoveList}>목록</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="blog-post post-details mb--50">
				<div className="blog-content mt--30">
					<header>
						<h3 className="blog-title">책 소개</h3>
					</header>
					<article className="review-article">
						<p>
							{product.bookIntroduction.split("\n").map(line => (
                            	<>{line}<br/></>
                        	))}
						</p>
					</article>
				</div>
				<hr/>
				<div className="blog-content mt--30">
					<header>
						<h3 className="blog-title">저자 소개</h3>
					</header>
					<article className="review-article">
						<p>
							{product.authorIntroduction.split("\n").map(line => (
                            	<>{line}<br/></>
                        	))}
						</p>
					</article>
				</div>
				<hr/>
				<div className="blog-content mt--30">
					<header>
						<h3 className="blog-title">목차</h3>
					</header>
					<article className="review-article">
						<p>
							{product.tableOfContents.split("\n").map(line => (
                            	<>{line}<br/></>
                        	))}
						</p>
					</article>
				</div>
			</div>
		</>
    )
};

export default React.memo(AdminProductDetail);