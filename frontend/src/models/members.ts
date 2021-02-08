export interface MemberUpdatePayload {
    phoneNumber: string;
    zipCode: string;
    address1: string;
    address2: string;
}

export interface MemberResult {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    roleName: string;
    createdDate: string;
}  

export interface MemberDetailResult {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    zipCode: string;
    address1: string;
    address2: string;
    point: number;
    roleName: string;
    createdDate: string;
}  

export interface LoginMember {
    id: number;
    name: string;
    email: string;
    role: string;
}