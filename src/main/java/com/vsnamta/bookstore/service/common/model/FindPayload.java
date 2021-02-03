package com.vsnamta.bookstore.service.common.model;

import javax.validation.Valid;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FindPayload {
    private SearchCriteria searchCriteria = new SearchCriteria();

    @Valid
    private PageCriteria pageCriteria = new PageCriteria();
}
