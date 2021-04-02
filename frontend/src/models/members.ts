export interface MemberSavePayload {
    id: string;
    password: string;
    name: string;
    phoneNumber: string;
    zipCode: string;
    address1: string;
    address2: string;
}

export interface MemberUpdatePayload {
    currentPassword: string;
    newPassword: string;
    phoneNumber: string;
    zipCode: string;
    address1: string;
    address2: string;
}

export interface MemberResult {
    id: number;
    name: string;
    phoneNumber: string;
    roleName: string;
    createdDate: string;
}  

export interface MemberDetailResult {
    id: number;
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
    role: string;
}