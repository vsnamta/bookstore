package com.vsnamta.bookstore.service.order;

import java.util.List;
import java.util.Optional;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryOrderRepository extends BaseMemoryRepository<Order> implements OrderRepository {
    @Override
    public List<Order> findAllWillBeCompleted(PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCountWillBeCompleted() {
        return 0;
    }
    
    @Override
    public Optional<Order> findOne(Long id) {
        return null;
    }

    @Override
    public List<Order> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCount(SearchRequest searchRequest) {
        return 0;
    }
}