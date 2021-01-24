package com.vsnamta.bookstore.service.product;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryProductRepository extends BaseMemoryRepository<Product> implements ProductRepository {
    @Override
    public long findTotalCount(Long categoryId) {
        return getMap().values()
            .stream()
            .filter(product -> product.getCategory().getId().equals(categoryId))
            .count();
    }

    @Override
    public List<Product> findByIds(List<Long> ids) {
        return ids.stream()
            .map(id -> getMap().get(id))
            .filter(product -> product != null)
            .collect(Collectors.toList());
    }
}