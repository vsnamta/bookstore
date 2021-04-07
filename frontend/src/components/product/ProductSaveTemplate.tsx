import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import ProductSaveForm from './ProductSaveForm';
import { ProductSaveAsyncPayload } from '../../models/product/store';
import { CategoryListAsync } from '../../models/category/store';
import { DiscountPolicyListAsync } from '../../models/discountPolicy/store';

interface ProductSaveTemplateProps {
    discountPolicyListAsync: DiscountPolicyListAsync;
    categoryListAsync: CategoryListAsync;
    saveProduct: (payload: ProductSaveAsyncPayload) => void;
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