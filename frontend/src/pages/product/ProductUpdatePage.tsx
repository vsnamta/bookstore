import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductUpdateForm from '../../components/product/ProductUpdateForm';
import useCategoryList from '../../hooks/category/useCategoryList';
import useDiscountPolicyList from '../../hooks/discountPolicy/useDiscountPolicyList';
import useProduct from '../../hooks/product/useProduct';
import { Page } from '../../models/common';
import { ProductResult, ProductSaveOrUpdatePayload } from '../../models/products';
import productService from '../../services/productService';
import { RootState } from '../../store';
import { setProductResult } from '../../store/product';
import { setProductPage } from '../../store/productPage';

function ProductUpdatePage() {
    const loginMember = useSelector((state: RootState) => state.loginMember.loginMember);
    const productPage= useSelector((state: RootState) => state.productPage.result);

    if(!(loginMember && loginMember.role === "ADMIN")) {
        return <Redirect to={{ pathname: "/" }} />
    } 

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams<{id: string}>();
    const [productState] = useProduct(Number.parseInt(id));
    const [discountPolicyListState] = useDiscountPolicyList();
    const [categoryListState] = useCategoryList();

    const onUpdateProduct = useCallback((id: number, payload: ProductSaveOrUpdatePayload) => {
        productService.update(id, payload)
            .then(updatedProduct => {
                dispatch(setProductResult(updatedProduct));

                dispatch(setProductPage({
                    ...productPage as Page<ProductResult>,
                    list: (productPage as Page<ProductResult>).list
                        .map(product => 
                            product.id === updatedProduct.id
                                ? updatedProduct
                                : product
                        )
                }));
                
                history.push(`/admin/product/${id}`);
            })
            .catch(error => {
                alert("오류가 발생했습니다.");
            });
    }, [productPage]);

    const onUpdateCancel = useCallback(() => {
        history.goBack();
    }, []);

    return (
        <AdminLayout>
            {(productState.error || discountPolicyListState.error || categoryListState.error) && 
            <ErrorDetail message={"오류 발생"} />}

            {(productState.result && discountPolicyListState.result && categoryListState.result) &&
            <ProductUpdateForm
                product={productState.result}
                discountPolicyList={discountPolicyListState.result}
                categoryList={categoryListState.result}
                onUpdateProduct={onUpdateProduct} 
                onUpdateCancel={onUpdateCancel}
            />}
        </AdminLayout>
    )
};

export default ProductUpdatePage;