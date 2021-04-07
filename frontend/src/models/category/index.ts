export interface CategorySaveOrUpdatePayload {
    name: string;
    parentId?: number;
}

export interface CategoryResult {
    id: number;
    name: string;
    parentId: number;
    parentName: string;
    children: CategoryResult[];
}