package com.vsnamta.bookstore.service.category;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategorySaveOrUpdatePayload {
    private String name;
    private Long parentId;
}