import React, { useCallback, useMemo } from 'react';
import { CategoryResult } from '../../models/categories';

const convertFlatCategoryList = (categoryList: CategoryResult[]) => {
    return categoryList.flatMap(category => [category, ...category.children]);
};

interface CategoryListProps {
    categoryList?: CategoryResult[];
    onSelectCategory: (id: number) => void;
    onRemoveCategory: (id: number) => void;
}

function CategoryList({categoryList, onSelectCategory, onRemoveCategory}: CategoryListProps) {
    if(!categoryList) {
        return null;
    }
    
    const flatCategoryList = useMemo(() => convertFlatCategoryList(categoryList), [categoryList]);

    const onClickUpdateBtn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onSelectCategory(parseInt(event.currentTarget.value));
    }, [onSelectCategory]);

    const onClickRemoveBtn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(confirm("삭제하시겠습니까?")) {
            onRemoveCategory(parseInt(event.currentTarget.value));
        }
    }, []);
    
    return (
        <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>카테고리</th>
                        <th>부모 카테고리</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {flatCategoryList.map(category => (
                        <tr key={category.id}>
                            <td>
                                {category.parentId && "ㄴ "}
                                {category.name}
                            </td>
                            <td>{category.parentName}</td>
                            <td>
                                <div className="add-cart-btn">
                                    <button className="btn btn-outlined--primary" value={category.id} onClick={onClickUpdateBtn} >수정</button>
                                    <button className="btn btn-outlined--primary" value={category.id} onClick={onClickRemoveBtn} >삭제</button> 
                                </div>                                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    )
};

export default React.memo(CategoryList);