import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MemberDetailResult } from '../../models/members';
import { OrderingProduct, OrderSavePayload } from '../../models/orders';

const calcTotalPrice = (orderingProductList: OrderingProduct[]) : number => {
    return orderingProductList
        .map(orderingProduct => (orderingProduct.regularPrice * (1 -(orderingProduct.discountPercent / 100))) * orderingProduct.quantity)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
}

interface OrderFormProps {
    member?: MemberDetailResult;
    orderingProductList: OrderingProduct[];
    onSaveOrder: (payload: OrderSavePayload) => void;
}

function OrderForm({ member, orderingProductList, onSaveOrder }: OrderFormProps) {
    if(!member) {
        return null;
    }
    
    const { register, handleSubmit, errors } = useForm<OrderSavePayload>();

    const totalPrice = useMemo(() => calcTotalPrice(orderingProductList), [orderingProductList]);

    const [usedPoint, setUsedPoint] = useState<number>(0);
    const [isPointEditing, setIsPointEditing] = useState<boolean>(false);
    const pointInputRef = useRef<HTMLInputElement>(null);

    const onClickPointBtn = useCallback(() => {
        if(isPointEditing) {
            const usePoint = parseInt((pointInputRef.current as HTMLInputElement).value);

            if(isNaN(usePoint)) {
                alert("숫자만 입력해주세요.");
                (pointInputRef.current as HTMLInputElement).value = 0 + ""; 
                return;  
            }
            
            if (usePoint < 0) {
                alert("포인트를 0 이상 입력해주세요.");
                (pointInputRef.current as HTMLInputElement).value = 0 + ""; 
                return;
            }
            
            if (usePoint > member.point) {
                alert(`사용할 수 있는 최대 포인트는 ${member.point}입니다`);
                (pointInputRef.current as HTMLInputElement).value = member.point + "";
                return;
            }
            
            setUsedPoint(usePoint);
            alert("적용되었습니다.");
        }

        setIsPointEditing(isPointEditing => !isPointEditing);
    }, [isPointEditing, pointInputRef, member]);

    const validateUsedPoint = useCallback(() => {
        return isPointEditing !== true;
    }, [isPointEditing]);

    const onSubmit = useCallback((orderSavePayload: OrderSavePayload) => {
        orderSavePayload.orderProducts = orderingProductList.map(orderingProduct => ({
            cartId: orderingProduct.cartId, 
            productId: orderingProduct.productId, 
            quantity: orderingProduct.quantity}));

        onSaveOrder(orderSavePayload);
    }, [orderingProductList]);

    return (
        <main id="content" className="page-section inner-page-sec-padding-bottom space-db--20">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{/* <!-- Checkout Form s--> */}
						<div className="checkout-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row row-40">
                                    <div className="col-12">
                                        <h1 className="quick-title">주문서 작성</h1>
                                    </div>
                                    <div className="col-lg-7 mb--20">
                                        {/* <!-- Billing Address --> */}
                                        <div id="billing-form" className="mb-40">
                                            <div className="row">
                                                <div className="col-md-6 col-12 mb--20">
                                                    <label>포인트 사용 (보유 포인트: {member.point})</label>
                                                    <input type="text" 
                                                        defaultValue={0} 
                                                        disabled={!isPointEditing}
                                                        ref={pointInputRef} 
                                                    />
                                                    <input 
                                                        type="hidden" 
                                                        name="usedPoint"
                                                        value={usedPoint}
                                                        ref={register({ required: true, validate: validateUsedPoint })} 
                                                    />
                                                    {errors.usedPoint?.type === "required" && <span>포인트를 입력해주세요.</span>}
                                                    {errors.usedPoint?.type === "validate" && <span>포인트를 적용해주세요.</span>}
                                                </div>
                                                <div className="col-md-6 col-12 mb--20">
                                                    <button className="btn btn-outlined--primary" onClick={onClickPointBtn}>{!isPointEditing ? "변경" : "적용"}</button>
                                                </div>
                                                <div className="col-12 mb--20">
                                                    <label>수신인*</label>
                                                    <input 
                                                        type="text" 
                                                        name="receiverName"
                                                        defaultValue={member.name}
                                                        ref={register({ required: true })} 
                                                    />
                                                    {errors.receiverName && <span>수신인을 입력해주세요.</span>}
                                                </div>
                                                <div className="col-12 mb--20">
                                                    <label>수신인 전화번호</label>
                                                    <input 
                                                        type="text" 
                                                        name="receiverPhoneNumber"
                                                        defaultValue={member.phoneNumber}
                                                        ref={register({ required: true })} 
                                                    />
                                                    {errors.receiverPhoneNumber && <span>수신인 전화번호를 입력해주세요.</span>}
                                                </div>
                                                <div className="col-12 mb--20">
                                                    <label>수신인 우편번호</label>
                                                    <input 
                                                        type="text" 
                                                        name="deliveryZipCode"
                                                        defaultValue={member.zipCode}
                                                        ref={register({ required: true })} 
                                                    />
                                                    {errors.deliveryZipCode && <span>수신인 우편번호를 입력해주세요.</span>}
                                                </div>
                                                <div className="col-12 mb--20">
                                                    <label>수신인 주소*</label>
                                                    <input 
                                                        type="text" 
                                                        name="deliveryAddress1"
                                                        defaultValue={member.address1}
                                                        ref={register({ required: true })} 
                                                    />
                                                    <input 
                                                        type="text" 
                                                        name="deliveryAddress2"
                                                        defaultValue={member.address2}
                                                        ref={register({ required: true })} 
                                                    />
                                                    {errors.deliveryAddress1 && <span>기본주소를 입력해주세요.</span>}
                                                    {errors.deliveryAddress2 && <span>상세주소를 입력해주세요.</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-note-block mt--30">
                                            <label htmlFor="order-note">배송메시지</label>
                                            <textarea 
                                                name="deliveryMessage" 
                                                cols={30} rows={10} 
                                                className="order-note"
                                                ref={register({ required: true })} 
                                            >                                   
                                            </textarea>
                                            {errors.deliveryMessage && <span>배송메시지를 입력해주세요.</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="row">
                                            {/* <!-- Cart Total --> */}
                                            <div className="col-12">
                                                <div className="checkout-cart-total">
                                                    <h2 className="checkout-title">주문 정보</h2>
                                                    <h4>상품 <span>금액</span></h4>
                                                    <ul>
                                                        {orderingProductList.map(orderingProduct => (
                                                            <li key={orderingProduct.productId}>
                                                                <span className="left">{orderingProduct.productName} X {orderingProduct.quantity}</span> 
                                                                <span className="right">{(orderingProduct.regularPrice * (1 -(orderingProduct.discountPercent / 100))) * orderingProduct.quantity}원</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <p>Sub Total <span>{totalPrice}원</span></p>
                                                    <p>배송비 <span>0원</span></p>
                                                    <p>사용 포인트 <span>{usedPoint}원</span></p>
                                                    <h4>최종 금액 <span>{totalPrice - usedPoint}원</span></h4>				
                                                    <button type="submit" name="submit" className="place-order w-100">주문</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
						</div>
					</div>
				</div>
			</div>
		</main>
    )
};

export default React.memo(OrderForm);