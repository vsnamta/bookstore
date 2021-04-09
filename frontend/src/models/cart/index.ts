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

export interface CartFindPayload {
    memberId: string;
}

export interface CartUpdatePayload {
    quantity: number;
}

export interface CartSavePayload {
    productId: number;
    quantity: number;
}