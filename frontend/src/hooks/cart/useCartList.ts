import { useCallback, useEffect, useState } from "react";
import { CartResult } from "../../models/carts";
import cartService from '../../services/cartService';

export interface CartListState {
    payload: number;
    result?: CartResult[];
    error?: Error;
}

function useCartList(initailMemberId: number): [
    CartListState,
    React.Dispatch<React.SetStateAction<CartResult[] | undefined>>
] {
    const [memberId, setMemberId] = useState<number>(initailMemberId);
    const [cartList, setCartList] = useState<CartResult[]>();
    const [error, setError] = useState<Error>();

    const selectCartList = useCallback((memberId: number) => {
        setMemberId(memberId);
        setError(undefined);

        cartService.findAll({ memberId })
            .then(cartList => setCartList(cartList))
            .catch(error => {
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