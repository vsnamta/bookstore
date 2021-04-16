package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.Fixtures.aCategory;
import static org.junit.Assert.assertEquals;

import java.util.List;

import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.CategoryRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
public class JpaCategoryRepositoryTest {
    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void 카테고리_조회() {
        //given
        Category superCategory = categoryRepository.save(aCategory().name("컴퓨터/IT").parent(null).build());
        
        categoryRepository.save(aCategory().name("IT 전문서").parent(superCategory).build());
        categoryRepository.save(aCategory().name("컴퓨터수험서").parent(superCategory).build());

        // when
        List<Category> categorys = categoryRepository.findAll();

        // then
        assertEquals(1, categorys.size());
        assertEquals(2, categorys.get(0).getChildren().size());
    }
}