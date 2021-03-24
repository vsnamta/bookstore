import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductUpdateForm from '../../components/product/ProductUpdateForm';
import { ApiError } from '../../error/ApiError';
import { CategoryResult } from '../../models/categories';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { ProductDetailResult, ProductSaveOrUpdatePayload } from '../../models/products';

interface ProductUpdateTemplateProps {
    productAsync?: {
        payload?: number | undefined;
        result?: ProductDetailResult | undefined;
        error?: ApiError | undefined;
    };
    discountPolicyListAsync?: {
        result?: DiscountPolicyResult[] | undefined;
        error?: ApiError | undefined;
    };
    categoryListAsync?: {
        result?: CategoryResult[] | undefined;
        error?: ApiError | undefined;
    };
    onUpdateProduct: (id: number, payload: ProductSaveOrUpdatePayload, file?: File | undefined) => void;
    onUpdateCancel: () => void;
}

function ProductUpdateTemplate({ productAsync, discountPolicyListAsync, categoryListAsync, onUpdateProduct, onUpdateCancel }: ProductUpdateTemplateProps) {
    return (
        <AdminLayout>
            <ProductUpdateForm
                product={productAsync?.result}
                discountPolicyList={discountPolicyListAsync?.result}
                categoryList={categoryListAsync?.result}
                onUpdateProduct={onUpdateProduct} 
                onUpdateCancel={onUpdateCancel}
            />
            {(productAsync?.error || discountPolicyListAsync?.error || categoryListAsync?.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductUpdateTemplate;