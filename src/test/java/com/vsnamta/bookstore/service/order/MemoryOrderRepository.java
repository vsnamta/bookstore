package com.vsnamta.bookstore.service.order;

import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryOrderRepository extends BaseMemoryRepository<Order> implements OrderRepository {
}