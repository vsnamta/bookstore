import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductUpdateForm from '../../components/product/ProductUpdateForm';
import { ApiError } from '../../error/ApiError';
import { ProductDetailResult, ProductSaveOrUpdatePayload } from '../../models/products';
import { RootState } from '../../store';
import { findCategoryList } from '../../store/category/action';
import { findDiscountPolicyList } from '../../store/discountPolicy/action';
import { findProduct, updateProduct } from '../../store/product/action';

function ProductUpdatePage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams<{id: string}>();

    useEffect(() => {
        dispatch(findProduct(Number.parseInt(id)));
        dispatch(findDiscountPolicyList());
        dispatch(findCategoryList());
    }, []);

    const productsState = useSelector((state: RootState) => state.products);
    const discountPolicyListState = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListState = useSelector((state: RootState) => state.categories.categoryListAsync);

    const onUpdateProduct = useCallback((id: number, payload: ProductSaveOrUpdatePayload, file?: File) => {
        dispatch(updateProduct({
            id: id, 
            payload: payload,
            file: file,
            onSuccess: product => {
                alert("변경하였습니다.");
                history.push(`/admin/product/${id}`);
            }, 
            onFailure: error => {
                alert("변경 오류 = " + error.message);
            }
        }));
    }, []);

    const onUpdateCancel = useCallback(() => {
        history.goBack();
    }, []);

    return (
        <AdminLayout>
            <ProductUpdateForm
                product={productsState.productAsync.result}
                discountPolicyList={discountPolicyListState.result}
                categoryList={categoryListState.result}
                onUpdateProduct={onUpdateProduct} 
                onUpdateCancel={onUpdateCancel}
            />
            {(productsState.productAsync.error || discountPolicyListState.error || categoryListState.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductUpdatePage;