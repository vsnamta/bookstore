import { useCallback, useEffect, useState } from "react";
import { CategoryResult } from "../../models/categories";
import categoryService from '../../services/categoryService';

export interface CategoryListState {
    result?: CategoryResult[];
    error?: Error;
}

function useCategoryList(): [
    CategoryListState, 
    React.Dispatch<React.SetStateAction<CategoryResult[] | undefined>>
] {    
    const [categoryList, setCategoryList] = useState<CategoryResult[]>();
    const [error, setError] = useState<Error>();

    const selectCategoryList = useCallback(() => {
        setError(undefined);

        categoryService.findAll()
            .then(categoryList => {
                setCategoryList(categoryList);
            })
            .catch(error => {
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