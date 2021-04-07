import React from 'react';
import { Link } from 'react-router-dom';
import { OrderDetailResult } from '../../models/order';

interface OrderDetailProps {
    order?: OrderDetailResult;
}

function OrderDetail({ order }: OrderDetailProps) {
	if(!order) {
		return null;
	}

    return (
		<div className="row">
			<div className="col-12">
				<div className="order-complete-message text-center">
					<h1>주문내역</h1>
				</div>
				<ul className="order-details-list">
					<li>주문번호: <strong>{order.id}</strong></li>
					<li>주문일: <strong>{order.statusHistoryResults[0].createdDate}</strong></li>
					<li>주문금액: <strong>{order.totalAmounts}</strong></li>							
				</ul>
				<h3 className="order-table-title">주문 상세내역</h3>
				<div className="table-responsive">
					<table className="table order-details-table">
						<thead>
							<tr>
								<th>상품</th>
								<th>금액</th>
							</tr>
						</thead>                              
						<tbody>
							{order.orderLineResults.map((orderLine, idx) => (
								<tr key={idx}>
									<td><Link to={`/product/${orderLine.productId}`}>{orderLine.productName}</Link> <strong>× {orderLine.quantity}</strong></td>
									<td><span>{(orderLine.regularPrice * (1 -(orderLine.discountPercent / 100))) * orderLine.quantity}원</span></td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<th>배송비</th>
								<td><span>0원</span></td>
							</tr>
							<tr>
								<th>총 주문금액</th>
								<td><span>{order.totalAmounts}원</span></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
    )
};

export default React.memo(OrderDetail);