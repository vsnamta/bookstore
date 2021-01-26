package com.vsnamta.bookstore.infra.repository;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;

import org.springframework.stereotype.Repository;

@Repository
public class JpaCategoryRepository implements CategoryRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Category save(Category category) {
        entityManager.persist(category);
        
        return category;
    }

    @Override
    public void remove(Category category) {
        entityManager.remove(category);
    }

    @Override
    public Optional<Category> findById(Long id) {
        Category result = entityManager.find(Category.class, id);
        
        return Optional.ofNullable(result);
    }
}