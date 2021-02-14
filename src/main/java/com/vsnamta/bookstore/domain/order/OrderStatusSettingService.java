package com.vsnamta.bookstore.domain.order;

import com.vsnamta.bookstore.domain.point.PointHistory;
import com.vsnamta.bookstore.domain.point.PointHistoryRepository;
import com.vsnamta.bookstore.domain.point.PointStatus;
import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.StockRepository;
import com.vsnamta.bookstore.domain.stock.StockStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Component
public class OrderStatusSettingService {
    private StockRepository stockRepository;
    private PointHistoryRepository pointHistoryRepository;

    @Autowired
    public OrderStatusSettingService(StockRepository stockRepository, PointHistoryRepository pointHistoryRepository) {
        this.stockRepository = stockRepository;
        this.pointHistoryRepository = pointHistoryRepository;
    }

    public void ordered(Order order) {
        order.updateStatus(OrderStatus.ORDERED);

        for(OrderLine orderLine : order.getOrderLines()) {
            orderLine.getProduct().minusStockQuantityBySales(orderLine.getQuantity());
            
            stockRepository.save(
                createStock(orderLine, StockStatus.SALES)
            );
        }

        if(order.getPaymentInfo().getUsedPoint() > 0) {
            order.getMember().minusPoint(order.getPaymentInfo().getUsedPoint());

            pointHistoryRepository.save(
                createPointHistory(order, order.getPaymentInfo().getUsedPoint(), PointStatus.BUYING_WITHDRAWAL)
            );
        }
    }

    public void canceld(Order order) {
        order.updateStatus(OrderStatus.CANCELED);

        for(OrderLine orderLine : order.getOrderLines()) {
            orderLine.getProduct().plusStockQuantityBySalesCancel(orderLine.getQuantity());      

            stockRepository.save(
                createStock(orderLine, StockStatus.SALES_CANCEL)
            );
        }

        if(order.getPaymentInfo().getUsedPoint() > 0) {
            order.getMember().plusPoint(order.getPaymentInfo().getUsedPoint());

            pointHistoryRepository.save(
                createPointHistory(order, order.getPaymentInfo().getUsedPoint(), PointStatus.BUYING_CANCEL_DEPOSIT)
            );
        }
    };

    public void completed(Order order) {
        order.updateStatus(OrderStatus.COMPLETED);

        order.getMember().plusPoint(order.getPaymentInfo().getDepositPoint());
        
        pointHistoryRepository.save(
            createPointHistory(order, order.getPaymentInfo().getDepositPoint(), PointStatus.BUYING_DEPOSIT)
        );
    };

    private Stock createStock(OrderLine orderLine, StockStatus stockStatus) {
        return Stock.createStock(
            orderLine.getProduct(), 
            orderLine.getQuantity() * stockStatus.getWeighting(),
            stockStatus.getName(),
            stockStatus 
        );
    }

    private PointHistory createPointHistory(Order order, int point, PointStatus pointStatus) {
        return PointHistory.createPointHistory(
            order.getMember(), 
            point * pointStatus.getWeighting(), 
            pointStatus.getName(), 
            pointStatus
        );
    }
}