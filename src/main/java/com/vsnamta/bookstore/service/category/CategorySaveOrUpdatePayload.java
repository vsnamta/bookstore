package com.vsnamta.bookstore.service.category;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategorySaveOrUpdatePayload {
    @NotBlank(message = "이름을 입력해주세요.")
    private String name;
    
    private Long parentId;
}