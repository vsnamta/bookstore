import { useCallback, useEffect, useState } from "react";
import { CategoryResult } from "../../models/categories";
import categoryApi from '../../apis/categoryApi';
import { ApiError } from "../../error/ApiError";

export interface CategoryListState {
    result?: CategoryResult[];
    error?: ApiError;
}

function useCategoryList(): [
    CategoryListState, 
    React.Dispatch<React.SetStateAction<CategoryResult[] | undefined>>
] {    
    const [categoryList, setCategoryList] = useState<CategoryResult[]>();
    const [error, setError] = useState<ApiError>();

    const selectCategoryList = useCallback(() => {
        setError(undefined);

        categoryApi.findAll()
            .then(categoryList => {
                setCategoryList(categoryList);
            })
            .catch((error: ApiError) => {
                setError(error);
                setCategoryList(undefined);
            });
    }, []);

    useEffect(() => {
        selectCategoryList();
    }, []);

    return [{
        result: categoryList,
        error: error
    }, setCategoryList];
}

export default useCategoryList;