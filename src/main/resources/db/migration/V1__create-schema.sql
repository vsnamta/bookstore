create sequence cart_seq start with 1 increment by 1;
create sequence category_seq start with 1 increment by 1;
create sequence discount_policy_seq start with 1 increment by 1;
create sequence order_line_seq start with 1 increment by 1;
create sequence order_seq start with 1 increment by 1;
create sequence order_status_history_seq start with 1 increment by 1;
create sequence point_history_seq start with 1 increment by 1;
create sequence product_seq start with 1 increment by 1;
create sequence review_seq start with 1 increment by 1;
create sequence stock_seq start with 1 increment by 1;

create table cart (
    cart_id bigint not null,
    quantity integer not null,
    member_id varchar(255),
    product_id bigint,
    primary key (cart_id)
) engine=InnoDB;

create table category (
    category_id bigint not null,
    name varchar(255),
    parent_id bigint,
    primary key (category_id)
) engine=InnoDB;

create table discount_policy (
    discount_policy_id bigint not null,
    deposit_percent integer not null,
    discount_percent integer not null,
    name varchar(255),
    primary key (discount_policy_id)
) engine=InnoDB;

create table member (
    member_id varchar(255) not null,
    address1 varchar(255),
    address2 varchar(255),
    zip_code varchar(255),
    created_date datetime(6),
    name varchar(255),
    password varchar(255),
    phone_number varchar(255),
    point integer not null,
    role varchar(255),
    primary key (member_id)
) engine=InnoDB;

create table order_line (
    order_line_id bigint not null,
    amounts integer not null,
    deposit_point integer not null,
    price integer not null,
    quantity integer not null,
    product_id bigint,
    order_id bigint,
    primary key (order_line_id)
) engine=InnoDB;

create table orders (
    order_id bigint not null,
    delivery_address1 varchar(255),
    delivery_address2 varchar(255),
    delivery_zip_code varchar(255),
    delivery_message varchar(255),
    receiver_name varchar(255),
    receiver_phone_number varchar(255),
    deposit_point integer not null,
    payment_amounts integer not null,
    total_amounts integer not null,
    used_point integer not null,
    status varchar(255),
    status_updated_date datetime(6),
    member_id varchar(255),
    primary key (order_id)
) engine=InnoDB;

create table order_status_history (
    order_status_history_id bigint not null,
    created_date datetime(6),
    status varchar(255),
    order_id bigint,
    primary key (order_status_history_id)
) engine=InnoDB;

create table point_history (
    point_history_id bigint not null,
    amounts integer not null,
    contents varchar(255),
    created_date datetime(6),
    status varchar(255),
    member_id varchar(255),
    primary key (point_history_id)
) engine=InnoDB;

create table product (
    product_id bigint not null,
    author varchar(255),
    author_introduction varchar(255),
    book_introduction varchar(255),
    created_date datetime(6),
    image_file_name varchar(255),
    isbn varchar(255),
    name varchar(255),
    published_date date,
    publisher varchar(255),
    regular_price integer not null,
    review_count integer not null,
    total_rating integer not null,
    sales_quantity integer not null,
    stock_quantity integer not null,
    table_of_contents varchar(255),
    total_page varchar(255),
    category_id bigint,
    discount_policy_id bigint,
    primary key (product_id)
) engine=InnoDB;

create table review (
    review_id bigint not null,
    contents varchar(255),
    created_date datetime(6),
    rating integer not null,
    removed bit not null,
    member_id varchar(255),
    product_id bigint,
    primary key (review_id)
) engine=InnoDB;

create table stock (
    stock_id bigint not null,
    contents varchar(255),
    created_date datetime(6),
    quantity integer not null,
    status varchar(255),
    product_id bigint,
    primary key (stock_id)
) engine=InnoDB;

alter table cart 
    add constraint FKix170nytunweovf2v9137mx2o 
    foreign key (member_id) 
    references member (member_id);

alter table cart 
    add constraint FK3d704slv66tw6x5hmbm6p2x3u 
    foreign key (product_id) 
    references product (product_id);

alter table category 
    add constraint FK2y94svpmqttx80mshyny85wqr 
    foreign key (parent_id) 
    references category (category_id);

alter table order_line 
    add constraint FKpf904tci8garypkvm32cqupye 
    foreign key (product_id) 
    references product (product_id);

alter table order_line 
    add constraint FKk9f9t1tmkbq5w27u8rrjbxxg6 
    foreign key (order_id) 
    references orders (order_id);

alter table orders 
    add constraint FKpktxwhj3x9m4gth5ff6bkqgeb 
    foreign key (member_id) 
    references member (member_id);

alter table order_status_history 
    add constraint FKnmcbg3mmbt8wfva97ra40nmp3 
    foreign key (order_id) 
    references orders (order_id);

alter table point_history 
    add constraint FKn7yuk3drkv7qwgq0op21olmwy 
    foreign key (member_id) 
    references member (member_id);

alter table product 
    add constraint FK1mtsbur82frn64de7balymq9s 
    foreign key (category_id) 
    references category (category_id);

alter table product 
    add constraint FKrwdp12h2r63yoe84im0jkrwyu 
    foreign key (discount_policy_id) 
    references discount_policy (discount_policy_id);

alter table review 
    add constraint FKk0ccx5i4ci2wd70vegug074w1 
    foreign key (member_id) 
    references member (member_id);

alter table review 
    add constraint FKiyof1sindb9qiqr9o8npj8klt 
    foreign key (product_id) 
    references product (product_id);

alter table stock 
    add constraint FKjghkvw2snnsr5gpct0of7xfcf 
    foreign key (product_id) 
    references product (product_id);