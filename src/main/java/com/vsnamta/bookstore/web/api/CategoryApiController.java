package com.vsnamta.bookstore.web.api;

import java.util.List;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.category.CategoryResult;
import com.vsnamta.bookstore.service.category.CategorySaveOrUpdatePayload;
import com.vsnamta.bookstore.service.category.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class CategoryApiController {
    private CategoryService categoryService;

    @Autowired
    public CategoryApiController(CategoryService categoryService) {
        this.categoryService = categoryService;
    } 

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/categories")
    public Long save(@Valid @RequestBody CategorySaveOrUpdatePayload categorySaveOrUpdatePayload) {
        return categoryService.save(categorySaveOrUpdatePayload);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/api/categories/{id}")
    public Long update(@PathVariable Long id, @Valid @RequestBody CategorySaveOrUpdatePayload categorySaveOrUpdatePayload) {
        return categoryService.update(id, categorySaveOrUpdatePayload);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/api/categories/{id}")
    public void remove(@PathVariable Long id) {
        categoryService.remove(id);
    }

    @GetMapping("/api/categories")
    public List<CategoryResult> findAll() {
        return categoryService.findAll();
    }
}