import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import ProductUpdateForm from './ProductUpdateForm';
import { ProductUpdateAsyncPayload } from '../../models/product/store';
import { CategoryListAsync } from '../../models/category/store';
import { DiscountPolicyListAsync } from '../../models/discountPolicy/store';
import { ProductAsync } from '../../models/product/store';

interface ProductUpdateTemplateProps {
    productAsync: ProductAsync;
    discountPolicyListAsync: DiscountPolicyListAsync;
    categoryListAsync: CategoryListAsync;
    updateProduct: (payload: ProductUpdateAsyncPayload) => void;
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