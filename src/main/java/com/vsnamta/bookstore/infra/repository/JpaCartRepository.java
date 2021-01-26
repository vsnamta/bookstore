package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.domain.cart.QCart.cart;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaCartRepository implements CartRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Cart save(Cart cart) {
        entityManager.persist(cart);
        
        return cart;
    }

    @Override
    public void remove(Cart cart) {
        entityManager.remove(cart);
    }

    @Override
    public Optional<Cart> findById(Long id) {
        Cart result = entityManager.find(Cart.class, id);

        return Optional.ofNullable(result);
    }

    @Override
    public Optional<Cart> findByMemberIdAndProductId(Long memberId, Long productId) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        Cart result = 
            query.select(cart)
                .from(cart)
                .where(cart.member.id.eq(memberId).and(cart.product.id.eq(productId)))
                .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public List<Cart> findByIds(List<Long> ids) {
        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Cart> result = 
            query.select(cart)
                .from(cart)
                .where(cart.id.in(ids))
                .fetch();

        return result;
    }
}