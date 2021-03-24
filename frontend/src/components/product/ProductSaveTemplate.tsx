import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import ProductSaveForm from './ProductSaveForm';
import { CategoryListAsync } from '../../store/category/reducer';
import { DiscountPolicyListAsync } from '../../store/discountPolicy/reducer';
import { ProductSaveActionPayload } from '../../store/product/action';

interface ProductSaveTemplateProps {
    discountPolicyListAsync: DiscountPolicyListAsync;
    categoryListAsync: CategoryListAsync;
    saveProduct: (payload: ProductSaveActionPayload) => void;
}

function ProductSaveTemplate({ discountPolicyListAsync, categoryListAsync, saveProduct }: ProductSaveTemplateProps) {
    return (
        <AdminLayout>
            <ProductSaveForm
                discountPolicyList={discountPolicyListAsync.result}
                categoryList={categoryListAsync.result}
                onSaveProduct={saveProduct} 
            />
            {(discountPolicyListAsync.error || categoryListAsync.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductSaveTemplate;