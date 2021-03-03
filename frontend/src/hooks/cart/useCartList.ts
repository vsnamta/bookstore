import { useCallback, useEffect, useState } from "react";
import { CartResult } from "../../models/carts";
import cartApi from '../../apis/cartApi';
import { ApiError } from "../../error/ApiError";

export interface CartListState {
    payload: number;
    result?: CartResult[];
    error?: ApiError;
}

function useCartList(initailMemberId: number): [
    CartListState,
    React.Dispatch<React.SetStateAction<CartResult[] | undefined>>
] {
    const [memberId, setMemberId] = useState<number>(initailMemberId);
    const [cartList, setCartList] = useState<CartResult[]>();
    const [error, setError] = useState<ApiError>();

    const selectCartList = useCallback((memberId: number) => {
        setMemberId(memberId);
        setError(undefined);

        cartApi.findAll({ memberId })
            .then(cartList => setCartList(cartList))
            .catch((error: ApiError) => {
                setError(error);
                setCartList(undefined);
            });
    }, []);

    useEffect(() => {
        selectCartList(initailMemberId);
    }, []);

    return [{
        payload: memberId,
        result: cartList,
        error: error
    }, setCartList];
}

export default useCartList;