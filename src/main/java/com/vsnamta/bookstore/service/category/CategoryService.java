package com.vsnamta.bookstore.service.category;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class CategoryService {
    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
 
    @Transactional
    public Long save(CategorySaveOrUpdatePayload categorySaveOrUpdatePayload) {
        Category parent = null;

        if(categorySaveOrUpdatePayload.getParentId() != null) {
            parent = categoryRepository.findById(categorySaveOrUpdatePayload.getParentId())
                .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));
        }

        Category category = Category.createCategory(categorySaveOrUpdatePayload.getName(), parent);

        return categoryRepository.save(category).getId();

    }

    @Transactional
    public Long update(Long id, CategorySaveOrUpdatePayload categorySaveOrUpdatePayload) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        Category parent = null;

        if(categorySaveOrUpdatePayload.getParentId() != null) {
            parent = categoryRepository.findById(categorySaveOrUpdatePayload.getParentId())
                .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));
        }

        category.update(categorySaveOrUpdatePayload.getName(), parent);

        return id;
    }

    @Transactional
    public void remove(Long id) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        if(category.hasChildren()) {
            throw new CategoryRemoveException("해당 카테고리의 하위 카테고리가 있어 삭제가 불가능합니다.");  
        }
        
        if(productRepository.findTotalCount(id) > 0) {
            throw new CategoryRemoveException("해당 카테고리에 등록된 상품이 있어 삭제가 불가능합니다.");  
        }

        if(category.hasParent()) {
            category.getParent().removeChild(category);
        }

        categoryRepository.remove(category);
    }
}