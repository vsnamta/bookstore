import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductUpdateForm from '../../components/product/ProductUpdateForm';
import { ProductSaveOrUpdatePayload } from '../../models/products';
import { RootState } from '../../store';
import { findCategoryList } from '../../store/category/action';
import { findDiscountPolicyList } from '../../store/discountPolicy/action';
import { findProduct, updateProduct } from '../../store/product/action';

function ProductUpdatePage() {
    const history = useHistory();
    const { id } = useParams<{id: string}>();

    const dispatch = useDispatch();
    const productAsync = useSelector((state: RootState) => state.products.productAsync);
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(findProduct(Number.parseInt(id)));
        dispatch(findDiscountPolicyList());
        dispatch(findCategoryList());
    }, []);

    const onUpdateProduct = useCallback((id: number, payload: ProductSaveOrUpdatePayload, file?: File) => {
        dispatch(updateProduct({
            id: id, 
            payload: payload,
            file: file,
            onSuccess: product => {
                alert("변경하였습니다.");
                history.push(`/admin/product/${id}`);
            }, 
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onUpdateCancel = useCallback(() => {
        history.goBack();
    }, []);

    return (
        <AdminLayout>
            <ProductUpdateForm
                product={productAsync.result}
                discountPolicyList={discountPolicyListAsync.result}
                categoryList={categoryListAsync.result}
                onUpdateProduct={onUpdateProduct} 
                onUpdateCancel={onUpdateCancel}
            />
            {(productAsync.error || discountPolicyListAsync.error || categoryListAsync.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductUpdatePage;