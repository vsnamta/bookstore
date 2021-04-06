import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import ProductUpdateForm from './ProductUpdateForm';
import { CategoryListAsync } from '../../store/category/reducer';
import { DiscountPolicyListAsync } from '../../store/discountPolicy/reducer';
import { ProductUpdateRequestActionPayload } from '../../store/product/action';
import { ProductAsync } from '../../store/product/reducer';

interface ProductUpdateTemplateProps {
    productAsync: ProductAsync;
    discountPolicyListAsync: DiscountPolicyListAsync;
    categoryListAsync: CategoryListAsync;
    updateProduct: (payload: ProductUpdateRequestActionPayload) => void;
}

function ProductUpdateTemplate({ productAsync, discountPolicyListAsync, categoryListAsync, updateProduct }: ProductUpdateTemplateProps) {
    return (
        <AdminLayout>
            <ProductUpdateForm
                product={productAsync.result}
                discountPolicyList={discountPolicyListAsync.result}
                categoryList={categoryListAsync.result}
                onUpdateProduct={updateProduct} 
            />
            {(productAsync.error || discountPolicyListAsync.error || categoryListAsync.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductUpdateTemplate;