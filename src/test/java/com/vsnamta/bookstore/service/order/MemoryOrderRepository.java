package com.vsnamta.bookstore.service.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.order.OrderStatus;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryOrderRepository extends BaseMemoryRepository<Order> implements OrderRepository {
    @Override
    public List<Order> findAllWillBeCompleted(PageRequest pageRequest) {
        return getMap().values()
            .stream()
            .filter(order -> 
                order.getStatusInfo().getStatus().equals(OrderStatus.ORDERED) &&
                order.getStatusInfo().getUpdatedDate().isBefore(LocalDateTime.now().minusDays(7))
            )
            .skip(pageRequest.getOffset()).limit(pageRequest.getSize())
            .collect(Collectors.toList());
    }

    @Override
    public long findTotalCountWillBeCompleted() {
        return getMap().values()
            .stream()
            .filter(order -> 
                order.getStatusInfo().getStatus().equals(OrderStatus.ORDERED) &&
                order.getStatusInfo().getUpdatedDate().isBefore(LocalDateTime.now().minusDays(7))
            )
            .count();
    }

    @Override
    public List<Order> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCount(SearchRequest searchRequest) {
        return 0;
    }

    @Override
    public Optional<Order> findOne(Long id) {
        return null;
    }
}