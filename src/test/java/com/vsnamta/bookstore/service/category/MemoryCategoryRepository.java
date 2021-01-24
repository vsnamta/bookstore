package com.vsnamta.bookstore.service.category;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.service.common.BaseMemoryRepository;

public class MemoryCategoryRepository extends BaseMemoryRepository<Category> implements CategoryRepository {
    @Override
    public void remove(Category category) {
        getMap().remove(category.getId());
    }
}