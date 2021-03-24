import React from 'react';
import ErrorDetail from '../../components/general/ErrorDetail';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductSaveForm from '../../components/product/ProductSaveForm';
import { ApiError } from '../../error/ApiError';
import { CategoryResult } from '../../models/categories';
import { DiscountPolicyResult } from '../../models/discountPolicies';
import { ProductSaveOrUpdatePayload } from '../../models/products';

interface ProductSaveTemplateProps {
    discountPolicyListAsync?: {
        result?: DiscountPolicyResult[] | undefined;
        error?: ApiError | undefined;
    };
    categoryListAsync?: {
        result?: CategoryResult[] | undefined;
        error?: ApiError | undefined;
    };
    onSaveProduct: (payload: ProductSaveOrUpdatePayload, file: File) => void;
    onSaveCancel: () => void;
}

function ProductSaveTemplate({ discountPolicyListAsync, categoryListAsync, onSaveProduct, onSaveCancel }: ProductSaveTemplateProps) {
    return (
        <AdminLayout>
            <ProductSaveForm
                discountPolicyList={discountPolicyListAsync?.result}
                categoryList={categoryListAsync?.result}
                onSaveProduct={onSaveProduct} 
                onSaveCancel={onSaveCancel}
            />
            {(discountPolicyListAsync?.error || categoryListAsync?.error) && 
            <ErrorDetail message={"오류 발생"} />}
        </AdminLayout>
    )
};

export default ProductSaveTemplate;