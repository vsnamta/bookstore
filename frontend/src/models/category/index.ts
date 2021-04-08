export interface CategoryResult {
    id: number;
    name: string;
    parentId: number;
    parentName: string;
    children: CategoryResult[];
}

export interface CategorySaveOrUpdatePayload {
    name: string;
    parentId?: number;
}