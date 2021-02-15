export interface ReviewSavePayload {
    productId: number;
    rating: number;
    contents: string;
}

export interface ReviewUpdatePayload {
    rating: number;
    contents: string;
}

export interface ReviewResult {
    id: number;
    memberId: number;
    memberEmail: string;
    memberName: string;
    productId: number;
    productName: string;
    imageFileName: string;
    rating: number;
    contents: string;
    createdDate: string;
}