import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageCriteria, SearchCriteria } from "../../models/common";
import { ProductFindPayload } from "../../models/products";
import productService from '../../services/productService';
import { RootState } from "../../store";
import { ProductPageState, setProductPage, setProductPageError, setProductPagePayload } from "../../store/productPage";

function useProductPage(
    categoryId?: number, 
    searchCriteria?: SearchCriteria, 
    pageCriteria: PageCriteria = { page: 1, size: 10 }
): [
    ProductPageState,
    (categoryId: number) => void,
    (searchCriteria: SearchCriteria) => void,
    (pageCriteria: PageCriteria) => void
] {
    const dispatch = useDispatch();
    const productPageState: ProductPageState = useSelector((state: RootState) => state.productPage);

    const selectProductPage = useCallback((payload: ProductFindPayload) => {
        if(!(JSON.stringify(productPageState.payload) === JSON.stringify(payload)) && productPageState.error === undefined) {
            dispatch(setProductPagePayload(payload));
            dispatch(setProductPageError(undefined));

            productService.findAll(payload)
                .then(page => dispatch(setProductPage(page)))
                .catch(error => {
                    dispatch(setProductPageError(error));
                    dispatch(setProductPage(undefined));
                });
        }
    }, [productPageState.payload, productPageState.error]);

    useEffect(() => {
        selectProductPage({categoryId, searchCriteria, pageCriteria});
    }, []);

    const updateCategoryId = useCallback((categoryId: number) => {
        const nextProductFindPayload = {
            ...productPageState.payload as ProductFindPayload,
            categoryId,
            pageCriteria: {
                ...(productPageState.payload as ProductFindPayload).pageCriteria,
                page: 1
            }
        }

        selectProductPage(nextProductFindPayload);
    }, [productPageState.payload, selectProductPage]); 

    const updateSearchCriteria = useCallback((searchCriteria: SearchCriteria) => {
        const nextProductFindPayload = {
            ...productPageState.payload as ProductFindPayload,
            searchCriteria: searchCriteria,
            pageCriteria: {
                ...(productPageState.payload as ProductFindPayload).pageCriteria,
                page: 1
            }
        }

        selectProductPage(nextProductFindPayload);
    }, [productPageState.payload, selectProductPage]);

    const updatePageCriteria = useCallback((pageCriteria: PageCriteria) => {
        const nextProductFindPayload = {
            ...productPageState.payload,
            pageCriteria: pageCriteria
        }

        selectProductPage(nextProductFindPayload);
    }, [productPageState.payload, selectProductPage]);

    return [productPageState, updateCategoryId, updateSearchCriteria, updatePageCriteria];
}

export default useProductPage;