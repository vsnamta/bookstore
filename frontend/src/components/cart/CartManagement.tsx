import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CartResult, CartUpdatePayload } from '../../models/carts';
import { OrderingProduct } from '../../models/orders';

const calcTotalPriceAndAllChecked = (cartList: CartResult[]) : [ number, boolean ] => {
    const checkedCartList = cartList.filter(cart => cart.checked === true);
    
    const totalPrice = 
        checkedCartList.length === 0 
            ? 0
            : checkedCartList
                .map(cart => (cart.regularPrice * (1 -(cart.discountPercent / 100))) * cart.quantity)
                .reduce((accumulator, currentValue) => accumulator + currentValue);
    
    const allChecked = cartList.every(cart => cart.checked === true);

    return [totalPrice, allChecked];
}

interface CartManagementProps {
    cartList?: CartResult[];
    onUpdateCart: (id: number, payload: CartUpdatePayload) => void;
    onRemoveCart: (ids: number[]) => void;
    onCheckAllCart: (checked: boolean) => void;
    onCheckCart: (id: number, checked: boolean) => void;
    onPurchase: (orderingProductList: OrderingProduct[]) => void;
}

function CartManagement({ cartList, onUpdateCart, onRemoveCart, onCheckAllCart, onCheckCart, onPurchase }: CartManagementProps) {    
    if(!cartList) {
        return null;
    }
    
    const [totalPrice, allChecked] = useMemo(
        () => calcTotalPriceAndAllChecked(cartList), 
        [cartList]
    );

    const onPlusQuantity = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const cart = cartList
            .find(cart => cart.id === parseInt(event.currentTarget.value)) as CartResult;

        if(cart.quantity >= cart.stockQuantity) {
            alert(`최대 구매수량은 ${cart.stockQuantity} 개 입니다`);
            return;
        }

        onUpdateCart(cart.id, { quantity: cart.quantity + 1 });
    }, [cartList]);

    const onMinusQuantity = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const cart = cartList
            .find(cart => cart.id === parseInt(event.currentTarget.value)) as CartResult;

        if(cart.quantity <= 1) {
            alert("최소 구매수량은 1개입니다.");
            return;
        }

        onUpdateCart(cart.id, {quantity: cart.quantity - 1});
    }, [cartList]);

    const onChangeAllCheck = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onCheckAllCart(event.currentTarget.checked);
    }, []);

    const onChangeCheck = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onCheckCart(parseInt(event.currentTarget.value), event.currentTarget.checked);
    }, []);

    const onRemove = useCallback(() => {
        const checkedIds = cartList
            .filter(cart => cart.checked === true)
            .map(cart => cart.id);

        if(checkedIds.length === 0) {
            alert("상품을 선택해주세요.");
            return;
        }
        
        onRemoveCart(checkedIds);
    }, [cartList]);

    const onSaveOrder = useCallback(() => {
        const checkedCartList = cartList.filter(cart => cart.checked === true);

        if(checkedCartList.length === 0) {
            alert("상품을 선택해주세요.");
            return;
        }
        
        const stockShortageCartList = checkedCartList.filter(cart => cart.quantity > cart.stockQuantity);

        // if(stockShortageCartList.length >= 1) {
        //     alert("재고가 부족한 상품이 있습니다.");
        //     return;
        // }

        onPurchase(
            checkedCartList.map(cart => ({
                cartId: cart.id,
                productId: cart.productId,
                productName: cart.productName,
                imageFileName: cart.imageFileName,
                regularPrice: cart.regularPrice,
                discountPercent: cart.discountPercent,
                depositPercent: cart.depositPercent,
                quantity: cart.quantity
            })) 
        );
    }, [cartList]);

    return (
        <>
            <div className="cart_area cart-area-padding">
                <div className="container">
                    <div className="page-section-title">
                        <h1>장바구니</h1>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <form action="#" className="">
                                {/* <!-- Cart Table --> */}
                                <div className="cart-table table-responsive mb--40">
                                    <table className="table">
                                        {/* <!-- Head Row --> */}
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" checked={allChecked} onChange={onChangeAllCheck}/></th>
                                                <th className="pro-thumbnail">이미지</th>
                                                <th className="pro-title">상품</th>
                                                <th className="pro-price">가격</th>
                                                <th className="pro-quantity">수량</th>
                                                <th className="pro-subtotal">총 금액</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <!-- Product Row --> */}
                                            {cartList.map(cart => (
                                                <tr key={cart.id}>
                                                    <td><input type="checkbox" value={cart.id} checked={cart.checked} onChange={onChangeCheck}/></td>
                                                    <td className="pro-thumbnail">
                                                        <Link to={`/product/${cart.productId}`}>
                                                            <img src={`/api/files/${cart.imageFileName}`} alt="" />
                                                        </Link>
                                                    </td>
                                                    <td className="pro-title">
                                                        <Link to={`/product/${cart.productId}`}>{cart.productName}</Link>
                                                    </td>
                                                    <td className="pro-price"><span>{cart.regularPrice * (1 -(cart.discountPercent / 100))}</span></td>
                                                    <td className="pro-quantity">
                                                        <div className="pro-qty">
                                                            <div className="count-input-block">
                                                                <input type="number" className="form-control text-center" value={cart.quantity} readOnly={true} />
                                                                <div className="count-input-btns">
                                                                    <button className="inc-ammount count-btn" value={cart.id} onClick={onPlusQuantity}>
                                                                        <FontAwesomeIcon icon={faChevronUp} />
                                                                        </button>
                                                                    <button className="dec-ammount count-btn" value={cart.id} onClick={onMinusQuantity}>
                                                                        <FontAwesomeIcon icon={faChevronDown} />
                                                                        </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="pro-subtotal"><span>{(cart.regularPrice * (1 -(cart.discountPercent / 100))) * cart.quantity}</span></td>
                                                </tr>
                                            ))}                                                                           
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>   
                </div>
            </div>
            <div className="cart-section-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 mb--30 mb-lg--0">
                            <a href="javascript:void(0)" className="btn btn-outlined--primary" onClick={onRemove}>선택 삭제</a>
                            <a href="javascript:void(0)" className="btn btn-outlined--primary" onClick={onSaveOrder}>선택 주문</a>
                        </div>
                        {/* <!-- Cart Summary --> */}
                        <div className="col-lg-6 col-12 d-flex">
                            <div className="cart-summary">
                                <div className="cart-summary-wrap">
                                    <p>상품 금액 <span className="text-primary">{totalPrice}</span></p>
                                    <p>배송비 <span className="text-primary">0</span></p>
                                    <h2>합계 <span className="text-primary">{totalPrice}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default React.memo(CartManagement);