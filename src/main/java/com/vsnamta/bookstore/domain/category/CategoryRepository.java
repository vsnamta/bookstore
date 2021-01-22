package com.vsnamta.bookstore.domain.category;

import java.util.Optional;

public interface CategoryRepository {
    Category save(Category category);

    void remove(Category category);

    Optional<Category> findById(Long id);
}