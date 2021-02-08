export interface OrderSavePayload {
    orderProducts: OrderProduct[];
    usedPoint: number;
    receiverName: string;
    receiverPhoneNumber: string;
    deliveryZipCode: string;
    deliveryAddress1: string;
    deliveryAddress2: string;
    deliveryMessage: string;
}

interface OrderProduct {
    cartId?: number;
    productId: number;
    quantity: number;
}

export interface OrderUpdatePayload {
    status: string;
}

export interface OrderResult {
    id: number;
    memberName: string;
    orderLineName: string;
    totalAmounts: number;
    statusName: string;
    orderDate: string;
}  

export interface OrderDetailResult {
    id: number;
    memberName: string;
    orderLines: OrderLineResult[];
    totalAmounts: number;
    usedPoint: number;
    depositPoint: number;
    receiverName: string;
    receiverPhoneNumber: string;
    deliveryZipCode: string;
    deliveryAddress1: string;
    deliveryAddress2: string;
    deliveryMessage: string;
    statusName: string;
    statusUpdatedDate: string;
    orderStatusHistories: OrderStatusHistoryResult[];
}  

interface OrderLineResult {
    productId: number;
    productName: string;
    imageFileName: string;
    regularPrice: number;
    discountPercent: number;
    depositPercent: number;
    quantity: number;
}

interface OrderStatusHistoryResult {
    statusName: string;
    createdDate: string;
}

export interface OrderingProduct {
    cartId?: number;
    productId: number;
    productName: string;
    imageFileName: string;
    regularPrice: number;
    discountPercent: number;
    depositPercent: number;
    quantity: number;
}