import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductSaveForm from '../../components/product/ProductSaveForm';
import useCategoryList from '../../hooks/category/useCategoryList';
import useDiscountPolicyList from '../../hooks/discountPolicy/useDiscountPolicyList';
import { ProductSaveOrUpdatePayload } from '../../models/products';
import productService from '../../services/productService';
import { RootState } from '../../store';
import { initProductState } from "../../store/product";
import { initProductPageState } from '../../store/productPage';

function ProductSavePage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 
    
    const history = useHistory();
    const dispatch = useDispatch();
        
    const [discountPolicyListState] = useDiscountPolicyList();
    const [categoryListState] = useCategoryList();

    const onSaveProduct = useCallback((payload: ProductSaveOrUpdatePayload) => {
        productService.save(payload)
            .then(id => {  
                dispatch(initProductPageState());
                dispatch(initProductState());
                
                history.push(`admin/product/${id}`);
            })
            .catch(error => {
                alert("오류가 발생했습니다.");
            });
    }, []);

    const onSaveCancel = useCallback(() => {
        history.goBack();
    }, []);

    return (
        <AdminLayout>
            {(discountPolicyListState.error || categoryListState.error) && <ErrorDetail message={"오류 발생"} />}

            {(discountPolicyListState.result && categoryListState.result) &&
            <ProductSaveForm
                discountPolicyList={discountPolicyListState.result}
                categoryList={categoryListState.result}
                onSaveProduct={onSaveProduct} 
                onSaveCancel={onSaveCancel}
            />}
        </AdminLayout>
    )
};

export default ProductSavePage;