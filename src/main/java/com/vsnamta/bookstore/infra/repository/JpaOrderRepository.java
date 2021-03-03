package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.discount.QDiscountPolicy.discountPolicy;
import static com.vsnamta.bookstore.domain.member.QMember.member;
import static com.vsnamta.bookstore.domain.order.QOrder.order;
import static com.vsnamta.bookstore.domain.order.QOrderLine.orderLine;
import static com.vsnamta.bookstore.domain.product.QProduct.product;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.order.OrderStatus;

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

    @Override
    public List<Order> findAllWillBeCompleted(PageRequest pageRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Order> results = 
            query.select(order)
                .distinct()
                .from(order)
                .join(order.member, member).fetchJoin()
                .where(order.statusInfo.status.eq(OrderStatus.ORDERED)
                    .and(order.statusInfo.updatedDate.before(LocalDateTime.now().minusDays(7))))
                .offset(pageRequest.getOffset()).limit(pageRequest.getSize())
                .fetch();

        return results;
    }

    @Override
    public long findTotalCountWillBeCompleted() {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        long totalCount = 
            query.select(order.id.count())
                .from(order)
                .where(order.statusInfo.status.eq(OrderStatus.ORDERED)
                    .and(order.statusInfo.updatedDate.before(LocalDateTime.now().minusDays(7))))
                .fetchOne();

        return totalCount;
    }

    @Override
    public Optional<Order> findOne(Long id) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        Order result = 
            query.select(order)
                .distinct()
                .from(order)
                .join(order.member, member).fetchJoin()
                .join(order.orderLines, orderLine).fetchJoin()
                .join(orderLine.product, product).fetchJoin()
                .join(product.discountPolicy, discountPolicy).fetchJoin()
                .where(order.id.eq(id))
                .setHint("org.hibernate.readOnly", true)
                .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public List<Order> findAll(SearchRequest searchRequest, PageRequest pageRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Order> results = 
            query.select(order)
                .distinct()
                .from(order)
                .join(order.member, member).fetchJoin()
                .join(order.orderLines, orderLine).fetchJoin()
                .join(orderLine.product, product).fetchJoin()
                .where(makeSearchCondition(searchRequest))
                .orderBy(order.id.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getSize())
                .setHint("org.hibernate.readOnly", true)
                .fetch();

        return results;
    }

    @Override
    public long findTotalCount(SearchRequest searchRequest) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        long totalCount = 
            query.select(order.id.count())
                .from(order)
                .join(order.member, member)
                .where(makeSearchCondition(searchRequest))
                .fetchOne();

        return totalCount;
    }

    private BooleanExpression makeSearchCondition(SearchRequest searchRequest) {
        String column = searchRequest.getColumn();
        String keyword = searchRequest.getKeyword();

        if (column != null && keyword != null) {
            switch (column) { 
                case "id":
                    return order.id.eq(Long.valueOf(keyword));
                case "memberEmail":
                    return order.member.email.contains(keyword);
                case "memberName":
                    return order.member.name.contains(keyword);
            }
        }

        return null;
    }
}