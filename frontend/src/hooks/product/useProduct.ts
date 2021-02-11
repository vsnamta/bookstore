import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productService from '../../services/productService';
import { RootState } from "../../store";
import { ProductState, setProductError, setProductPayload, setProductResult } from "../../store/product";

function useProduct(id: number): [
    ProductState,
    (payload: number) => void
] {   
    const productState: ProductState = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch();

    const selectProduct = useCallback((payload: number) => {
        if(!(productState.payload === payload) && productState.error === undefined) {
            dispatch(setProductPayload(payload));
            dispatch(setProductError(undefined));

            productService.findOne(payload)
                .then(result => dispatch(setProductResult(result)))
                .catch(error => {
                    dispatch(setProductError(error));
                    dispatch(setProductResult(undefined));
                });
        }
    }, [productState.payload, productState.error]);

    useEffect(() => {
        selectProduct(id);
    }, []);

    return [productState, selectProduct];
}

export default useProduct;