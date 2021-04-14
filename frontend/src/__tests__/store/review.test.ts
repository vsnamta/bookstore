import { wait, waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";
import qs from 'qs';
import { FindPayload, Page } from "../../models/common";
import { ReviewResult } from "../../models/review";

describe('review store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchReviewPage', async () => {
        // given
        store.dispatch(rootActions.setAsyncReviewPage({
            payload: undefined,
            result: undefined,
            error: undefined
        }));

        const findPayload: FindPayload = {
            searchCriteria: { column: "productId", keyword: "1" },
            pageCriteria: { page: 1, size: 10 }
        };

        const reviewPage: Page<ReviewResult> = {
            list: [{
                id: 1,
                memberId: "test",
                memberName: "홍길동",
                productId: 1,
                productName: "Clean Code",
                imageFileName: "test.jpg",
                rating: 4,
                contents: "좋아요.",
                createdDate: "2020-01-01 00:00:00"
            }],
            totalCount: 1
        };

        const queryString = qs.stringify(findPayload, { allowDots: true });

        mockAxios.onGet(`/api/reviews?${queryString}`).reply(200, reviewPage);

        // when
        store.dispatch(rootActions.fetchReviewPage(findPayload));

        // then
        await waitFor(() => {
            const reviewPage = store.getState().reviews.asyncReviewPage.result;
            const review = store.getState().reviews.review;
    
            expect(reviewPage?.list.length).toEqual(1);
            expect(review === undefined).toEqual(true);
        });
    });

    it('selectReview', () => {
        // given
        store.dispatch(rootActions.setAsyncReviewPage({
            payload: {
                searchCriteria: { column: "productId", keyword: "1" },
                pageCriteria: { page: 1, size: 10 }
            },
            result: {
                list: [{
                    id: 1,
                    memberId: "test",
                    memberName: "홍길동",
                    productId: 1,
                    productName: "Clean Code",
                    imageFileName: "test.jpg",
                    rating: 4,
                    contents: "좋아요.",
                    createdDate: "2020-01-01 00:00:00"
                }],
                totalCount: 1
            },
            error: undefined
        }));

        // when
        store.dispatch(rootActions.selectReview(1));

        // then
        const review = store.getState().reviews.review;

        expect(review?.memberId).toEqual("test");
        expect(review?.contents).toEqual("좋아요.");
    });

    it('updateReviewAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncReviewPage({
            payload: {
                searchCriteria: { column: "productId", keyword: "1" },
                pageCriteria: { page: 1, size: 10 }
            },
            result: {
                list: [{
                    id: 1,
                    memberId: "test",
                    memberName: "홍길동",
                    productId: 1,
                    productName: "Clean Code",
                    imageFileName: "test.jpg",
                    rating: 4,
                    contents: "좋아요.",
                    createdDate: "2020-01-01 00:00:00"
                }],
                totalCount: 1
            },
            error: undefined
        }));

        store.dispatch(rootActions.selectReview(1));

        mockAxios.onPut("/api/reviews/1").reply(200, {
            id: 1,
            memberId: "test",
            memberName: "홍길동",
            productId: 1,
            productName: "Clean Code",
            imageFileName: "test.jpg",
            rating: 5,
            contents: "아주 좋아요.",
            createdDate: "2020-01-01 00:00:00"
        });

        // when
        store.dispatch(rootActions.updateReviewAsync({
            id: 1,
            payload: { rating: 5, contents: "아주 좋아요." }
        }));

        // then
        await waitFor(() => {
            const reviewPage = store.getState().reviews.asyncReviewPage.result;
            const review = store.getState().reviews.review;
    
            expect(reviewPage?.list[0].contents).toEqual("아주 좋아요.");
            expect(review?.contents).toEqual("아주 좋아요.");
        });
    });

    it('removeReviewAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncReviewPage({
            payload: {
                searchCriteria: { column: "productId", keyword: "1" },
                pageCriteria: { page: 1, size: 10 }
            },
            result: {
                list: [{
                    id: 1,
                    memberId: "test",
                    memberName: "홍길동",
                    productId: 1,
                    productName: "Clean Code",
                    imageFileName: "test.jpg",
                    rating: 4,
                    contents: "좋아요.",
                    createdDate: "2020-01-01 00:00:00"
                }, {
                    id: 2,
                    memberId: "test2",
                    memberName: "임꺽정",
                    productId: 1,
                    productName: "Clean Code",
                    imageFileName: "test.jpg",
                    rating: 5,
                    contents: "아주 좋아요.",
                    createdDate: "2020-01-02 00:00:00"
                }],
                totalCount: 1
            },
            error: undefined
        }));

        mockAxios.onDelete("/api/reviews/1").reply(200);

        // when
        store.dispatch(rootActions.removeReviewAsync({ id: 1 }));

        // then
        await waitFor(() => {
            const reviewPage = store.getState().reviews.asyncReviewPage.result;
            const review = store.getState().reviews.review;
    
            expect(reviewPage?.list.length).toEqual(1);
            expect(review === undefined).toEqual(true);
        });
    });

    it('saveReviewAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncReviewPage({
            payload: {
                searchCriteria: { column: "productId", keyword: "1" },
                pageCriteria: { page: 1, size: 10 }
            },
            result: { list: [], totalCount: 0 },
            error: undefined
        }));
        
        mockAxios.onPost("/api/reviews").reply(200, {
            id: 1,
            memberId: "test",
            memberName: "홍길동",
            productId: 1,
            productName: "Clean Code",
            imageFileName: "test.jpg",
            rating: 4,
            contents: "좋아요.",
            createdDate: "2020-01-01 00:00:00"
        });

        // when
        store.dispatch(rootActions.saveReviewAsync({ 
            payload: { 
                productId: 1,
                rating: 4,
                contents: "좋아요"
            }
        }));

        // then
        await waitFor(() => {
            const reviewPage = store.getState().reviews.asyncReviewPage.result;
            const review = store.getState().reviews.review;
    
            expect(reviewPage?.list.length).toEqual(1);
            expect(review !== undefined).toEqual(true);
        });
    });
});