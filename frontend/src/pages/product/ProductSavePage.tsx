import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductSaveForm from '../../components/product/ProductSaveForm';
import { ProductSaveOrUpdatePayload } from '../../models/products';
import { RootState } from '../../store';
import { findCategoryList } from '../../store/category/action';
import { findDiscountPolicyList } from '../../store/discountPolicy/action';
import { saveProduct } from '../../store/product/action';

function ProductSavePage() {
    const history = useHistory();

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
    const discountPolicyListAsync = useSelector((state: RootState) => state.discountPolcies.discountPolicyListAsync);
    const categoryListAsync = useSelector((state: RootState) => state.categories.categoryListAsync);

    useEffect(() => {
        dispatch(findDiscountPolicyList());
        dispatch(findCategoryList());
    }, []);

    const onSaveProduct = useCallback((payload: ProductSaveOrUpdatePayload, file: File) => {
        dispatch(saveProduct({
            payload: payload,
            file: file,
            onSuccess: product => {
                alert("저장하였습니다.");
                history.push(`/admin/product/${product.id}`);
            }, 
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onSaveCancel = useCallback(() => {
        history.goBack();
    }, []);

    return (
        <AdminLayout>
            <ProductSaveForm
                discountPolicyList={discountPolicyListAsync.result}
                categoryList={categoryListAsync.result}
                onSaveProduct={onSaveProduct} 
                onSaveCancel={onSaveCancel}
            />
            {(discountPolicyListAsync.error || categoryListAsync.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductSavePage;