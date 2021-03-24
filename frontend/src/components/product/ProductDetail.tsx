import React, { useCallback, useState } from 'react';
import { CartSavePayload } from '../../models/carts';
import { OrderingProduct } from '../../models/orders';
import { ProductDetailResult } from '../../models/products';
import { faChevronUp, faChevronDown, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useHistory } from 'react-router-dom';
import { LoginMember } from '../../models/members';
import { CartSaveActionPayload } from '../../store/cart/action';

interface ProductDetailProps {
    product?: ProductDetailResult;
	loginMember?: LoginMember;
    onSaveCart: (payload: CartSaveActionPayload) => void;
}

function ProductDetail({ product, loginMember, onSaveCart }: ProductDetailProps) {
	if(!product) {
        return null;
    }

	const history = useHistory();
	
    const [quantity, setQuantity] = useState<number>(1);

    const plusQuantity = useCallback(() => {
        if(quantity >= product.stockQuantity) {
            alert(`현재 재고는 ${product.stockQuantity} 개 입니다`);
            return;
        }

        setQuantity(quantity => quantity + 1);
    }, [quantity, product]);

    const minusQuantity = useCallback(() => {
        if(quantity <= 1) {
            alert("최소 구매수량은 1개입니다.");
            return;
        }

        setQuantity(quantity => quantity - 1);
	}, [quantity]);
	
	const onClickCartSaveBtn = useCallback(() => {
        if(!loginMember) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        onSaveCart({
            payload: { productId: product.id, quantity: quantity },
            onSuccess: cart => {
                if(confirm("저장되었습니다. 장바구니로 이동하시겠습니까?")) {
                    history.push("/cart");
                }
            },
            onFailure: error => alert(`오류발생 = ${error.message}`)
        });

    }, [loginMember, product, quantity, onSaveCart]);

    const onClickPurchaseBtn = useCallback(() => {
        if(!loginMember) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        history.push(
			"/order/form",
			[{
				cartId: undefined,
				productId: product.id,
				productName: product.name,
				imageFileName: product.imageFileName,
				regularPrice: product.regularPrice,
				discountPercent: product.discountPercent,
				depositPercent: product.depositPercent,
				quantity: quantity
			}]	
		);
    }, [loginMember, product, quantity]);
    
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
						<p className="tag-block">
							<Link to={`/product/list?categoryId=${product.superCategoryId}`}>{product.superCategoryName}</Link> 
							{" > "}
							<Link to={`/product/list?categoryId=${product.subCategoryId}`}>{product.subCategoryName}</Link>  
						</p>
						<h3 className="product-title">{product.name}</h3>
						<ul className="list-unstyled">
							<li>
								저자: 
								<Link to={`/product/list?searchCriteria.column=author&searchCriteria.keyword=${product.author}`} className="list-value font-weight-bold">
									{product.author}
								</Link>
							</li>
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
							<div className="rating-block">
								{new Array(5)
									.fill(0)
									.fill(1, 0, Math.round(product.rating))
									.map(value => (
										<span className={value === 1 ? "star_on" : ""}><FontAwesomeIcon icon={faStar} /></span>
									))
								}
							</div>
							<div className="review-widget">
								(평가 {product.reviewCount}명)
							</div>
						</div>
						<article className="product-details-article">
							<p>구매시 정가의 {product.discountPercent}% 할인, {product.depositPercent}% 적립 / 배송비 무료</p>
						</article>
						<div className="add-to-cart-row">
							<div className="count-input-block">
								<span className="widget-label">수량</span>
								<input type="number" className="form-control text-center" value={quantity} />
								<div className="count-input-btns">
									<button className="inc-ammount count-btn" onClick={plusQuantity}>
										<FontAwesomeIcon icon={faChevronUp} />
									</button>
									<button className="dec-ammount count-btn" onClick={minusQuantity}>
										<FontAwesomeIcon icon={faChevronDown} />
									</button>
								</div>
							</div>
							<div className="add-cart-btn">
								<a href="javascript:void(0)" className="btn btn-outlined--primary" onClick={onClickCartSaveBtn}>카트에 담기</a>
								<a href="javascript:void(0)" className="btn btn-outlined--primary" onClick={onClickPurchaseBtn}>바로 주문</a>
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
						<p>{product.bookIntroduction}</p>
					</article>
				</div>
				<hr/>
				<div className="blog-content mt--30">
					<header>
						<h3 className="blog-title">저자 소개</h3>
					</header>
					<article className="review-article">
						<p>{product.authorIntroduction}</p>
					</article>
				</div>
				<hr/>
				<div className="blog-content mt--30">
					<header>
						<h3 className="blog-title">목차</h3>
					</header>
					<article className="review-article">
						<p>{product.tableOfContents}</p>
					</article>
				</div>
			</div>
		</>
    )
};

export default React.memo(ProductDetail);