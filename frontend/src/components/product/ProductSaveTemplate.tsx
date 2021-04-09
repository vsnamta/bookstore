import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import ProductSaveForm from './ProductSaveForm';
import { ProductSaveAsyncPayload } from '../../models/product/store';
import { AsyncCategoryList } from '../../models/category/store';
import { AsyncDiscountPolicyList } from '../../models/discountPolicy/store';

interface ProductSaveTemplateProps {
    asyncDiscountPolicyList: AsyncDiscountPolicyList;
    asyncCategoryList: AsyncCategoryList;
    saveProduct: (payload: ProductSaveAsyncPayload) => void;
}

function ProductSaveTemplate({ asyncDiscountPolicyList, asyncCategoryList, saveProduct }: ProductSaveTemplateProps) {
    return (
        <AdminLayout>
            <ProductSaveForm
                discountPolicyList={asyncDiscountPolicyList.result}
                categoryList={asyncCategoryList.result}
                onSaveProduct={saveProduct} 
            />
            {(asyncDiscountPolicyList.error || asyncCategoryList.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductSaveTemplate;