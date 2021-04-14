import { wait, waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";
import qs from 'qs';
import { ProductFindPayload, ProductResult } from "../../models/product";
import { Page } from "../../models/common";

describe('product store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchProductPage', async () => {
        // given
        store.dispatch(rootActions.setAsyncProductPage({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        const productFindPayload: ProductFindPayload = {
            pageCriteria: { page: 1, size: 10 }
        };

        const productPage: Page<ProductResult> = {
            list: [{
                id: 1,
                name: "Clean Code",
                author: "로버트 C. 마틴",
                publisher: "인사이트",
                publishedDate: "2013-12-24",
                regularPrice: 33000,
                imageFileName: "test.jpg",
                stockQuantity: 100,
                salesQuantity: 0,
                rating: 4,
                reviewCount: 1,
                discountPercent: 10,
                depositPercent: 5
            }],
            totalCount: 1
        };

        const queryString = qs.stringify(productFindPayload, { allowDots: true });

        mockAxios.onGet(`/api/products?${queryString}`).reply(200, productPage);

        // when
        store.dispatch(rootActions.fetchProductPage(productFindPayload));

        // then
        await waitFor(() => {
            const productPage = store.getState().products.asyncProductPage.result;

            expect(productPage?.list.length).toEqual(1);
        });
    });

    it('fetchProduct', async () => {
        // given
        store.dispatch(rootActions.setAsyncProduct({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        mockAxios.onGet("/api/products/1").reply(200, {
            id: 1,
            superCategoryId: 1,
            superCategoryName: "컴퓨터/IT",
            subCategoryId: 2,
            subCategoryName: "IT 전문서",
            name: "Clean Code",
            author: "로버트 C. 마틴",
            publisher: "인사이트",
            publishedDate: "2013-12-24",
            totalPage: "584",
            isbn: "9788966260959",
            regularPrice: 33000,
            imageFileName: "test.jpg",
            authorIntroduction: "저자 소개...",
            bookIntroduction: "책 소개...",
            tableOfContents: "목차...",
            stockQuantity: 100,
            salesQuantity: 0,
            rating: 4,
            reviewCount: 1,
            discountPolicyId: 1,
            discountPolicyName: "기본",
            discountPercent: 10,
            depositPercent: 5
        });

        // when
        store.dispatch(rootActions.fetchProduct(1));

        // then
        await waitFor(() => {
            const product = store.getState().products.asyncProduct.result;

            expect(product?.name).toEqual("Clean Code");
            expect(product?.author).toEqual("로버트 C. 마틴");
        });
    });

    it('updateProductAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncProductPage({
            payload: { pageCriteria: { page: 1, size: 10 } },
            result: {
                list: [{
                    id: 1,
                    name: "Clean Code",
                    author: "로버트 C. 마틴",
                    publisher: "인사이트",
                    publishedDate: "2013-12-24",
                    regularPrice: 33000,
                    imageFileName: "test.jpg",
                    stockQuantity: 100,
                    salesQuantity: 0,
                    rating: 4,
                    reviewCount: 1,
                    discountPercent: 10,
                    depositPercent: 5
                }],
                totalCount: 1
            },
            error: undefined
        }));

        store.dispatch(rootActions.setAsyncProduct({
            payload: 1,
            result: {
                id: 1,
                superCategoryId: 1,
                superCategoryName: "컴퓨터/IT",
                subCategoryId: 2,
                subCategoryName: "IT 전문서",
                name: "Clean Code",
                author: "로버트 C. 마틴",
                publisher: "인사이트",
                publishedDate: "2013-12-24",
                totalPage: "584",
                isbn: "9788966260959",
                regularPrice: 33000,
                imageFileName: "test.jpg",
                authorIntroduction: "저자 소개...",
                bookIntroduction: "책 소개...",
                tableOfContents: "목차...",
                stockQuantity: 100,
                salesQuantity: 0,
                rating: 4,
                reviewCount: 1,
                discountPolicyId: 1,
                discountPolicyName: "기본",
                discountPercent: 10,
                depositPercent: 5
            },
            error: undefined
        }));

        mockAxios.onPut("/api/products/1").reply(200, {
            id: 1,
            superCategoryId: 1,
            superCategoryName: "컴퓨터/IT",
            subCategoryId: 2,
            subCategoryName: "IT 전문서",
            name: "Clean Code",
            author: "로버트 C. 마틴",
            publisher: "인사이트",
            publishedDate: "2013-12-24",
            totalPage: "584",
            isbn: "9788966260959",
            regularPrice: 33000,
            imageFileName: "test.jpg",
            authorIntroduction: "저자 소개...",
            bookIntroduction: "책 소개...",
            tableOfContents: "목차...",
            stockQuantity: 100,
            salesQuantity: 0,
            rating: 4,
            reviewCount: 1,
            discountPolicyId: 1,
            discountPolicyName: "기본",
            discountPercent: 10,
            depositPercent: 5
        });

        // when
        store.dispatch(rootActions.updateProductAsync({
            id: 1,
            payload: {
                discountPolicyId: 1,
                categoryId: 1,
                name: "Clean Code",
                author: "로버트 C. 마틴",
                publisher: "인사이트",
                publishedDate: "2013-12-24",
                totalPage: "584",
                isbn: "9788966260959",
                regularPrice: 33000,
                imageFileName: "test.jpg",
                authorIntroduction: "저자 소개...",
                bookIntroduction: "책 소개...",
                tableOfContents: "목차..."
            },
            file: undefined
        }));

        // then
        await waitFor(() => {
            const productPage = store.getState().products.asyncProductPage.result;
            const product = store.getState().products.asyncProduct.result;
    
            expect(productPage?.list[0].name).toEqual("Clean Code");
            expect(product?.name).toEqual("Clean Code");
        });
    });

    it('saveProductAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncProductPage({
            payload: { pageCriteria: { page: 1, size: 10 } },
            result: {
                list: [],
                totalCount: 0
            },
            error: undefined
        }));

        mockAxios.onPost("/api/files").reply(200, "test.jpg");
        
        mockAxios.onPost("/api/products").reply(200, {
            id: 1,
            superCategoryId: 1,
            superCategoryName: "컴퓨터/IT",
            subCategoryId: 2,
            subCategoryName: "IT 전문서",
            name: "Clean Code",
            author: "로버트 C. 마틴",
            publisher: "인사이트",
            publishedDate: "2013-12-24",
            totalPage: "584",
            isbn: "9788966260959",
            regularPrice: 33000,
            imageFileName: "test.jpg",
            authorIntroduction: "저자 소개...",
            bookIntroduction: "책 소개...",
            tableOfContents: "목차...",
            stockQuantity: 100,
            salesQuantity: 0,
            rating: 4,
            reviewCount: 1,
            discountPolicyId: 1,
            discountPolicyName: "기본",
            discountPercent: 10,
            depositPercent: 5
        });

        mockAxios.onGet("/api/products").reply(200, {
            id: 1,
            name: "Clean Code",
            author: "로버트 C. 마틴",
            publisher: "인사이트",
            publishedDate: "2013-12-24",
            regularPrice: 33000,
            imageFileName: "test.jpg",
            stockQuantity: 100,
            salesQuantity: 0,
            rating: 4,
            reviewCount: 1,
            discountPercent: 10,
            depositPercent: 5
        });

        // when
        store.dispatch(rootActions.saveProductAsync({ 
            payload: {
                discountPolicyId: 1,
                categoryId: 1,
                name: "Clean Code",
                author: "로버트 C. 마틴",
                publisher: "인사이트",
                publishedDate: "2013-12-24",
                totalPage: "584",
                isbn: "9788966260959",
                regularPrice: 33000,
                imageFileName: "test.jpg",
                authorIntroduction: "저자 소개...",
                bookIntroduction: "책 소개...",
                tableOfContents: "목차..."
            },
            file: new File([], "test.jpg")
        }));

        // then
        await waitFor(() => {
            const productPage = store.getState().products.asyncProductPage.result;
            const product = store.getState().products.asyncProduct.result;
    
            expect(productPage?.list[0].name).toEqual("Clean Code");
            expect(product?.name).toEqual("Clean Code");
        });
    });
});