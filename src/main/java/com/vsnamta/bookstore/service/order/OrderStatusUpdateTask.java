package com.vsnamta.bookstore.service.order;

import java.util.List;

import javax.persistence.EntityManager;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.order.OrderStatusSettingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Component
public class OrderStatusUpdateTask {
    private EntityManager entityManager;
    private OrderRepository orderRepository;
    private OrderStatusSettingService orderStatusSettingService;

    @Autowired
    public OrderStatusUpdateTask(EntityManager entityManager, OrderRepository orderRepository,
            OrderStatusSettingService orderStatusSettingService) {
        this.entityManager = entityManager;
        this.orderRepository = orderRepository;
        this.orderStatusSettingService = orderStatusSettingService;
    }

    @Transactional
    @Scheduled(cron = "0 0 3 * * *")
    public void excute() {
        long totalCount = orderRepository.findTotalCountWillBeCompleted();
        int size = 100;
        long totalPage = (long)Math.ceil((totalCount * 1.0) / size);

        for(int page = 1; page <= totalPage; page++) {
            List<Order> orders = orderRepository.findAllWillBeCompleted(
                PageRequest.builder().page(page).size(size).build()
            );

            for(Order order: orders) {
                orderStatusSettingService.completed(order);
            }

            entityManager.flush();
            entityManager.clear();
        }
    }
}
