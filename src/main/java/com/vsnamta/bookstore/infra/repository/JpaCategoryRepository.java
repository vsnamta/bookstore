package com.vsnamta.bookstore.infra.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.domain.category.QCategory;

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
    
    @Override
    public List<Category> findAll() {
        QCategory superCategory = new QCategory("superCategory");
        QCategory subCategory = new QCategory("subCategory");

        JPAQueryFactory query = new JPAQueryFactory(entityManager);

        List<Category> results = 
            query.select(superCategory)
                .distinct()
                .from(superCategory)
                .leftJoin(superCategory.children, subCategory).fetchJoin()
                .where(superCategory.parent.id.isNull())
                .setHint("org.hibernate.readOnly", true)
                .fetch();

        return results;
    }
}