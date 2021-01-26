package com.vsnamta.bookstore.infra.repository;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaOrderRepository implements OrderRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Order save(Order order) {
        entityManager.persist(order);
        
        return order;
    }

    @Override
    public Optional<Order> findById(Long id) {
        Order result = entityManager.find(Order.class, id);
        
        return Optional.ofNullable(result);
    }
}