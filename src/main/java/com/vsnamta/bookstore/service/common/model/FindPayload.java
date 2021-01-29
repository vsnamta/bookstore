package com.vsnamta.bookstore.service.common.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FindPayload {
    private SearchCriteria searchCriteria = new SearchCriteria();
    private PageCriteria pageCriteria = new PageCriteria();
}
