package com.vsnamta.bookstore.domain.product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    Product save(Product product);

    Optional<Product> findById(Long id);

    long findTotalCount(Long categoryId);

    List<Product> findByIds(List<Long> ids);
}