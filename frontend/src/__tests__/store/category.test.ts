import { waitFor } from "@testing-library/dom";
import MockAdapter from "axios-mock-adapter";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import apiClient from "../../apis/apiClient";
import rootReducer, { rootActions, rootSaga } from "../../store";

describe('category store test', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    const mockAxios = new MockAdapter(apiClient);

    it('fetchCategoryList', async () => {
        // given
        store.dispatch(rootActions.setAsyncCategoryList({
            result: undefined,
            error: undefined
        }));

        mockAxios.onGet("/api/categories").reply(200, [{
            id: 1,
            name: "컴퓨터/IT",
            parentId: null,
            parentName: null,
            children: [{
                id: 2,
                name: "IT 전문서",
                parentId: 1,
                parentName: "컴퓨터/IT",
                children: []
            }]
        }]);

        // when
        store.dispatch(rootActions.fetchCategoryList());

        // then
        await waitFor(() => {
            const categoryList = store.getState().categories.asyncCategoryList.result;
            const category = store.getState().categories.category;
    
            expect(categoryList?.length).toEqual(1);
            expect(category === undefined).toEqual(true);
        });
    });

    it('selectCategory', () => {
        // given
        store.dispatch(rootActions.setAsyncCategoryList({
            result: [{
                id: 1,
                name: "컴퓨터/IT",
                parentId: NaN,
                parentName: "",
                children: [{
                    id: 2,
                    name: "IT 전문서",
                    parentId: 1,
                    parentName: "컴퓨터/IT",
                    children: []
                }]
            }],
            error: undefined
        }));

        // when
        store.dispatch(rootActions.selectCategory(1));

        // then
        const category = store.getState().categories.category;

        expect(category?.name).toEqual("컴퓨터/IT");
    });

    it('updateCategoryAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncCategoryList({
            result: [{
                id: 1,
                name: "컴퓨터/IT",
                parentId: NaN,
                parentName: "",
                children: [{
                    id: 2,
                    name: "IT",
                    parentId: 1,
                    parentName: "컴퓨터/IT",
                    children: []
                }]
            }],
            error: undefined
        }));

        store.dispatch(rootActions.selectCategory(2));

        mockAxios.onPut("/api/categories/2").reply(200, {
            id: 2,
            name: "IT 전문서",
            parentId: 1,
            parentName: "컴퓨터/IT",
            children: []
        });

        // when
        store.dispatch(rootActions.updateCategoryAsync({
            id: 2,
            payload: { name: "IT 전문서", parentId: 1 }
        }));

        // then
        await waitFor(() => {
            const categoryList = store.getState().categories.asyncCategoryList.result;
            const category = store.getState().categories.category;
    
            expect(categoryList?.[0].children[0].id).toEqual("IT 전문서");
            expect(category?.name).toEqual("IT 전문서");
        });
    });

    it('removeCartAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncCategoryList({
            result: [{
                id: 1,
                name: "컴퓨터",
                parentId: NaN,
                parentName: "",
                children: [{
                    id: 2,
                    name: "IT 전문서",
                    parentId: 1,
                    parentName: "컴퓨터",
                    children: []
                }]
            }],
            error: undefined
        }));

        store.dispatch(rootActions.selectCategory(2));

        mockAxios.onDelete("/api/categories/2").reply(200);

        // when
        store.dispatch(rootActions.removeCategoryAsync({ id: 2 }));

        // then
        await waitFor(() => {
            const categoryList = store.getState().categories.asyncCategoryList.result;
            const category = store.getState().categories.category;
    
            expect(categoryList?.[0].children).toEqual([]);
            expect(category === undefined).toEqual(true);
        });
    });

    it('saveCategoryAsync', async () => {
        // given
        store.dispatch(rootActions.setAsyncCategoryList({
            result: [],
            error: undefined
        }));
        
        mockAxios.onPost("/api/categories").reply(200, {
            id: 1,
            name: "컴퓨터/IT",
            parentId: null,
            parentName: null,
            children: []
        });

        // when
        store.dispatch(rootActions.saveCategoryAsync({ payload: { name: "컴퓨터/IT" } }));

        // then
        await waitFor(() => {
            const categoryList = store.getState().categories.asyncCategoryList.result;
            const category = store.getState().categories.category;
    
            expect(categoryList?.length).toEqual(1);
            expect(category?.name).toEqual("컴퓨터/IT");
        });
    });
});