package com.vsnamta.bookstore.service.cart;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.CartRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryCartRepository extends BaseMemoryRepository<Cart> implements CartRepository {
    @Override
    public void remove(Cart cart) {
        getMap().remove(cart.getId());
    }

    @Override
    public Optional<Cart> findByMemberIdAndProductId(Long memberId, Long productId) {
        return getMap().values()
            .stream()
            .filter(cart -> cart.getMember().getId().equals(memberId) && cart.getProduct().getId().equals(productId))
            .findFirst();
    }
    
    @Override
    public List<Cart> findByIds(List<Long> ids) {
        return ids.stream()
            .map(id -> getMap().get(id))
            .filter(cart -> cart != null)
            .collect(Collectors.toList());
    }

    @Override
    public List<Cart> findAll(Long memberId) {
        return null;
    }
}