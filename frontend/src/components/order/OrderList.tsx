import React, { useCallback } from 'react';
import { OrderResult, OrderUpdatePayload } from '../../models/orders';

interface OrderListProps {
    orderList: OrderResult[];
    onSelectOrder: (id: number) => void;
    onUpdateOrder: (id: number, payload: OrderUpdatePayload) => void;
}

function OrderList({orderList, onSelectOrder, onUpdateOrder}: OrderListProps) {    
    const onClickSelectBtn = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onSelectOrder(parseInt(event.currentTarget.dataset.orderId as string));
    }, [onSelectOrder]);

    const onClickUpdateBtn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(confirm("변경하시겠습니까?")) {
            onUpdateOrder(
                parseInt(event.currentTarget.dataset.orderId as string), 
                {status: event.currentTarget.dataset.status as string}
            );
        }
    }, []);

    return (
        <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>주문번호</th>
                        <th>주문회원</th>
                        <th>주문상품</th>
                        <th>주문금액</th>                          
                        <th>주문일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map(order => (
                        <tr key={order.id}>
                            <td>
                                <a href="javascript:void(0)" data-order-id={order.id} onClick={onClickSelectBtn}>{order.id}</a>
                            </td>                                         
                            <td>{order.memberName}</td>
                            <td>{order.orderLineName}</td>
                            <td>{order.totalAmounts}</td>
                            <td>{order.orderDate}</td>
                            <td>
                                {order.statusName}
                                {order.statusName === "주문 완료" && 
                                <div className="add-cart-btn">
                                    <button className="btn btn-outlined--primary" data-order-id={order.id} data-status="COMPLETED" onClick={onClickUpdateBtn}>주문 확정</button>
                                    <button className="btn btn-outlined--primary" data-order-id={order.id} data-status="CANCELED" onClick={onClickUpdateBtn}>주문 취소</button> 
                                </div>}                                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 	
    )
};

export default React.memo(OrderList);