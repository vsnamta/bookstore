package com.vsnamta.bookstore.service.category;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.category.Category;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CategoryResult {
    private Long id;
    private String name;
    private Long parentId;
    private String parentName;
    private List<CategoryResult> children;

    public CategoryResult(Category category) {
        this.id = category.getId();
        this.name = category.getName();

        if(category.getParent() != null) {
            this.parentId = category.getParent().getId();
            this.parentName = category.getParent().getName();
        }

        this.children = category.getChildren()
            .stream()
            .map(CategoryResult::new)
            .collect(Collectors.toList());
    }
}