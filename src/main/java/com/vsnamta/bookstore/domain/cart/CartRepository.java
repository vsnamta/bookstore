package com.vsnamta.bookstore.domain.cart;

import java.util.List;
import java.util.Optional;

public interface CartRepository {
    Cart save(Cart cart);

    void remove(Cart cart);

    Optional<Cart> findById(Long id);

    Optional<Cart> findByMemberIdAndProductId(Long memberId, Long productId);

    List<Cart> findByIds(List<Long> ids);

    List<Cart> findAll(Long memberId);
}