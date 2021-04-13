import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { rootActions, RootState } from '../../store';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminProductDetail from '../../components/product/AdminProductDetail';

function ProductManagementDetailContainer() {
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const { asyncProductPage, asyncProduct } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(rootActions.fetchProduct(Number.parseInt(id)));
    }, []);
    
    const history = useHistory();

    const onMoveList = useCallback(() => {
        const queryString = qs.stringify(asyncProductPage.payload, { allowDots: true });
        history.push(`/admin/product/list?${queryString}`);
    }, [asyncProductPage.payload]);

    return (
        <>
            <AdminProductDetail 
                product={asyncProduct.result}
                onMoveList={onMoveList}
            />
            {asyncProduct.error && <ErrorDetail message={asyncProduct.error.message} />}
        </>
    )
};

export default React.memo(ProductManagementDetailContainer);