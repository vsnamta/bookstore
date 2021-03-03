package com.vsnamta.bookstore.service.product;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryProductRepository extends BaseMemoryRepository<Product> implements ProductRepository {
    @Override
    public List<Product> findByIds(List<Long> ids) {
        return ids.stream()
            .map(id -> getMap().get(id))
            .filter(product -> product != null)
            .collect(Collectors.toList());
    }
    
    @Override
    public long findTotalCount(Long categoryId) {
        return getMap().values()
            .stream()
            .filter(product -> product.getCategory().getId().equals(categoryId))
            .count();
    }

    @Override
    public Optional<Product> findOne(Long id) {
        return null;
    }

    @Override
    public List<Product> findAll(Long categoryId, SearchRequest searchRequest, PageRequest pageRequest) {
        return null;
    }

    @Override
    public long findTotalCount(Long categoryId, SearchRequest searchRequest) {
        return 0;
    }
}