insert into member(member_id, password, name, phone_number, zip_code, address1, address2, point, role, created_date) values('test', '$2a$10$2/IINbiPRFG85LCRnhnwnewU3t02FDTXAqCDL73mpyC9MsilCe99i', '홍길동', '010-1234-5678', '123-456', '서울시 중구 명동 123번지', '456호', 0, 'ADMIN', '2020-01-01 00:00:00');

insert into discount_policy(discount_policy_id, name, discount_percent, deposit_percent) values(1, '기본', 10, 5);

insert into category(category_id, name, parent_id) values(1, '컴퓨터/IT', null);
insert into category(category_id, name, parent_id) values(2, 'IT 전문서', 1);

insert into product(product_id, discount_policy_id, category_id, name, author, publisher, published_date, total_page, isbn, regular_price, image_file_name, author_introduction, book_introduction, table_of_contents, stock_quantity, sales_quantity, total_rating, review_count, created_date) values(1, 1, 2, 'Clean Code', '로버트 C. 마틴', '인사이트', '2013-12-24', '584', '9788966260959', 33000, 'test.jpg', '저자 소개...', '책 소개...', '목차...', 9, 1, 4, 1, '2020-01-01 00:00:00');

insert into stock(stock_id, product_id, quantity, contents, status, created_date) values(1, 1, 100, '상품 구매로 인한 재고 증가', 'PURCHASE', '2020-01-01 00:00:00');
insert into stock(stock_id, product_id, quantity, contents, status, created_date) values(2, 1, 1, '상품 판매로 인한 재고 감소 (주문상품번호 : 1)', 'SALES', '2020-01-01 00:00:00');

insert into cart(cart_id, member_id, product_id, quantity) VALUES(1, 'test', 1, 1);

insert into orders(order_id, member_id, total_amounts, used_point, payment_amounts, deposit_point, receiver_name, receiver_phone_number, delivery_zip_code, delivery_address1, delivery_address2, delivery_message, status, status_updated_date) values(1, 'test', 29700, 0, 29700, 1650, '홍길동', '010-1234-5678', '123-456', '서울시 중구 명동 123번지', '456호', '문 앞에 놓아주세요.', 'COMPLETED', '2020-01-01 00:00:00');

insert into order_line(order_line_id, order_id, product_id, price, quantity, amounts, deposit_point) values(1, 1, 1, 29700, 1, 29700, 1650);

insert into order_status_history(order_status_history_id, order_id, status, created_date) values(1, 1, 'ORDERED', '2020-01-01 00:00:00');
insert into order_status_history(order_status_history_id, order_id, status, created_date) values(2, 1, 'COMPLETED', '2020-01-01 00:00:00');

insert into point_history(point_history_id, member_id, amounts, contents, status, created_date) values(1, 'test', 1650, '구매 확정으로 인한 적립금 증가 (주문번호 : 1)', 'BUYING_DEPOSIT', '2020-01-01 00:00:00');

insert into review(review_id, member_id, product_id, rating, contents, removed, created_date) values(1, 'test', 1, 4, '좋아요', 0, '2020-01-01 00:00:00');