import { PageCriteria, SearchCriteria } from "../common";

export interface ProductResult {
    id: number;
    name: string;
    author: string;
    publisher: string;
    publishedDate: string;
    regularPrice: number;
    imageFileName: string;
    stockQuantity: number;
    salesQuantity: number;
    rating: number;
    reviewCount: number;
    discountPercent: number;
    depositPercent: number;
}

export interface ProductDetailResult {
    id: number;
    superCategoryId: number;
    superCategoryName: string;
    subCategoryId: number;
    subCategoryName: string;
    name: string;
    author: string;
    publisher: string;
    publishedDate: string;
    totalPage: string;
    isbn: string;
    regularPrice: number;
    imageFileName: string;
    authorIntroduction: string;
    bookIntroduction: string;
    tableOfContents: string;
    stockQuantity: number;
    salesQuantity: number;
    rating: number;
    reviewCount: number;
    discountPolicyId: number;
    discountPolicyName: string;
    discountPercent: number;
    depositPercent: number;
}

export interface ProductFindPayload {
    categoryId?: number;
    searchCriteria?: SearchCriteria;
    pageCriteria: PageCriteria;
}

export interface ProductSaveOrUpdatePayload {
    discountPolicyId: number;
    categoryId: number;
    name: string;
    author: string;
    publisher: string;
    publishedDate: string;
    totalPage: string;
    isbn: string;
    regularPrice: number;
    imageFileName: string;
    authorIntroduction: string;
    bookIntroduction: string;
    tableOfContents: string;
}