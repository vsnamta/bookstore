package com.vsnamta.bookstore.service.category;

import static com.vsnamta.bookstore.DomainBuilder.aCategory;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.Optional;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.product.MemoryProductRepository;

import org.junit.Before;
import org.junit.Test;

public class CategoryServiceTest {
    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;
    private CategoryService categoryService;

    @Before
    public void setUp() {
        categoryRepository = new MemoryCategoryRepository();
        productRepository = new MemoryProductRepository();
        
        categoryService = new CategoryService(categoryRepository, productRepository);
    }

    @Test
    public void 카테고리_저장() {
        // given  
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());

        CategorySaveOrUpdatePayload categorySaveOrUpdatePayload = new CategorySaveOrUpdatePayload();
        categorySaveOrUpdatePayload.setName("IT 전문서");
        categorySaveOrUpdatePayload.setParentId(superCategory.getId());

        // when
        Long categoryId = categoryService.save(categorySaveOrUpdatePayload);

        // then
        Category subCategory = categoryRepository.findById(categoryId).get();
        superCategory = categoryRepository.findById(superCategory.getId()).get();

        assertEquals("IT 전문서", subCategory.getName());
        assertEquals(superCategory, subCategory.getParent());
        assertEquals(true, superCategory.getChildren().contains(subCategory));
    }

    @Test
    public void 카테고리_수정() {
        // given    
        Category superCategory1 = categoryRepository.save(aCategory().name("과학/공학").build());
        Category superCategory2 = categoryRepository.save(aCategory().name("컴퓨터/IT").build());

        Category subCategory = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory1).build());

        CategorySaveOrUpdatePayload categorySaveOrUpdatePayload = new CategorySaveOrUpdatePayload();
        categorySaveOrUpdatePayload.setName("IT 전문서");
        categorySaveOrUpdatePayload.setParentId(superCategory2.getId());

        // when
        categoryService.update(subCategory.getId(), categorySaveOrUpdatePayload);

        // then
        subCategory = categoryRepository.findById(subCategory.getId()).get();
        superCategory2 = categoryRepository.findById(superCategory2.getId()).get();

        assertEquals("IT 전문서", subCategory.getName());
        assertEquals(superCategory2, subCategory.getParent());
        assertEquals(true, superCategory2.getChildren().contains(subCategory));
    }

    @Test
    public void 카테고리_삭제() {
        // given  
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());
        Category subCategory = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());

        // when
        categoryService.remove(subCategory.getId());

        // then
        Optional<Category> categoryOpt = categoryRepository.findById(subCategory.getId());
        superCategory = categoryRepository.findById(superCategory.getId()).get();

        assertEquals(false, categoryOpt.isPresent());
        assertEquals(false, superCategory.getChildren().contains(subCategory));
    }
 
    @Test(expected = CategoryRemoveException.class)
    public void 카테고리_삭제시_하위카테고리가_있으면_삭제불가() {
        // given  
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());
        categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());

        // when
        categoryService.remove(superCategory.getId());

        // then
        fail();
    }

    @Test(expected = CategoryRemoveException.class)
    public void 카테고리_삭제시_등록된_상품이_있으면_삭제불가() {
        // given  
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").build());
        Category subCategory = categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());
        
        productRepository.save(aProduct().name("Clean Code").category(subCategory).build());

        // when
        categoryService.remove(subCategory.getId());

        // then
        fail();
    }
}