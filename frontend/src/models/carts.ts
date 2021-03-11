export interface CartSavePayload {
    productId: number;
    quantity: number;
}

export interface CartUpdatePayload {
    quantity: number;
}

export interface CartFindPayload {
    memberId: number;
}

export interface CartResult {
    id: number;
    productId: number;
    productName: string;
    imageFileName: string;
    regularPrice: number;
    stockQuantity: number;
    discountPercent: number;
    depositPercent: number;
    quantity: number;
    checked: boolean;
}