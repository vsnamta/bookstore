import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartResult, CartUpdatePayload } from '../../models/carts';
import { OrderingProduct } from '../../models/orders';

const selectCartsAndcalcTotalPrice = (
    cartList: CartResult[], selectedMap: Map<number, boolean>
) : [
    CartResult[], number
] => {
    const selectedCartList = cartList.filter(cart => selectedMap.get(cart.id));

    const totalPrice = 
        selectedCartList.length === 0 
            ? 0
            : selectedCartList
                .map(cart => (cart.regularPrice * (1 -(cart.discountPercent / 100))) * cart.quantity)
                .reduce((accumulator, currentValue) => accumulator + currentValue);

    return [selectedCartList, totalPrice];
}

interface CartManagementProps {
    cartList: CartResult[];
    onUpdateCart: (id: number, payload: CartUpdatePayload) => void;
    onRemoveCart: (ids: number[], onSuccess: () => void) => void;
    onPurchase: (orderingProductList: OrderingProduct[]) => void;
}

function CartManagement({cartList, onUpdateCart, onRemoveCart, onPurchase}: CartManagementProps) {
    const [allSelected, setAllSelected] = useState<boolean>(true);
    const [selectedMap, setSelectedMap] = useState<Map<number, boolean>>(
        new Map<number, boolean>(cartList.map(cart => ([cart.id, true])))
    );

    const [selectedCartList, totalPrice] = useMemo(
        () => selectCartsAndcalcTotalPrice(cartList, selectedMap), 
        [cartList, selectedMap]
    );

    const onPlusQuantity = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const cart = cartList
            .find(cart => cart.id === parseInt(event.currentTarget.value)) as CartResult;

        if(cart.quantity > cart.stockQuantity) {
            alert(`현재 재고는 ${cart.stockQuantity} 개 입니다`);
            return;
        }

        onUpdateCart(cart.id, {quantity: cart.quantity + 1});
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
        setAllSelected(event.currentTarget.checked);
        setSelectedMap(
            new Map<number, boolean>(cartList.map(cart => ([cart.id, event.currentTarget.checked])))
        );
    }, [cartList]);

    const onChangeCheck = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedMap = new Map<number, boolean>(selectedMap.entries());
        newSelectedMap.set(parseInt(event.currentTarget.value), event.currentTarget.checked);

        setSelectedMap(newSelectedMap);
        setAllSelected(
            Array.from(newSelectedMap.values()).every(value => value === true)
        );
    }, [selectedMap]);

    const onRemove = useCallback(() => {
        if(selectedCartList.length === 0) {
            alert("상품을 선택해주세요.");
            return;
        }

        onRemoveCart(
            selectedCartList.map(cart => cart.id),
            () => {
                const newSelectedMap = new Map<number, boolean>(selectedMap.entries());
                selectedCartList.forEach(cart => newSelectedMap.delete(cart.id));
    
                setSelectedMap(newSelectedMap);
                setAllSelected(false);
            }
        );

        // onRemoveCart(selectedCartList.map(cart => cart.id))
        //     .then(() => {
        //         const newSelectedMap = new Map<number, boolean>(selectedMap.entries());
        //         selectedCartList.forEach(cart => newSelectedMap.delete(cart.id));

        //         setSelectedMap(newSelectedMap);
        //         setAllSelected(false);
        //     });
    }, [selectedCartList]);

    const onSaveOrder = useCallback(() => {
        if(selectedCartList.length === 0) {
            alert("상품을 선택해주세요.");
            return;
        }

        onPurchase(
            selectedCartList.map(cart => ({
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
    }, [selectedCartList]);

    return (
        <main className="cart-page-main-block inner-page-sec-padding-bottom">
            <div className="cart_area cart-area-padding  ">
                <div className="container">
                    <div className="page-section-title">
                        <h1>Shopping Cart</h1>
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
                                                <th><input type="checkbox" checked={allSelected} onChange={onChangeAllCheck}/></th>
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
                                                    <td><input type="checkbox" value={cart.id} checked={selectedMap.get(cart.id)} onChange={onChangeCheck}/></td>
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
        </main>
    )
};

export default React.memo(CartManagement);