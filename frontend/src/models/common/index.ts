export interface Page<T> {
    list: T[];
    totalCount: number;
}

export interface ErrorResult {
    message: string;
    fieldErrorResults: FieldErrorResult[];
}

export interface FieldErrorResult {
    field: string;
    message: string;
}

export interface FindPayload {
    searchCriteria?: SearchCriteria;
    pageCriteria: PageCriteria;
}

export interface SearchCriteria {
    column: string;
    keyword: string;
}

export interface PageCriteria {
    page: number;
    size: number;
    sortColumn?: string;
    sortDirection?: string;
}