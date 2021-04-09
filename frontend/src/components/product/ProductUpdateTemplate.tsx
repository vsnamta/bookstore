import React from 'react';
import AdminLayout from '../common/AdminLayout';
import ErrorDetail from '../general/ErrorDetail';
import ProductUpdateForm from './ProductUpdateForm';
import { ProductUpdateAsyncPayload } from '../../models/product/store';
import { AsyncCategoryList } from '../../models/category/store';
import { AsyncDiscountPolicyList } from '../../models/discountPolicy/store';
import { AsyncProduct } from '../../models/product/store';

interface ProductUpdateTemplateProps {
    asyncProduct: AsyncProduct;
    asyncDiscountPolicyList: AsyncDiscountPolicyList;
    asyncCategoryList: AsyncCategoryList;
    updateProduct: (payload: ProductUpdateAsyncPayload) => void;
}

function ProductUpdateTemplate({ asyncProduct, asyncDiscountPolicyList, asyncCategoryList, updateProduct }: ProductUpdateTemplateProps) {
    return (
        <AdminLayout>
            <ProductUpdateForm
                product={asyncProduct.result}
                discountPolicyList={asyncDiscountPolicyList.result}
                categoryList={asyncCategoryList.result}
                onUpdateProduct={updateProduct} 
            />
            {(asyncProduct.error || asyncDiscountPolicyList.error || asyncCategoryList.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductUpdateTemplate;