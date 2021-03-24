import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import useSearchForm from '../../hooks/useSearchForm';
import { SearchCriteria } from '../../models/common';

interface ProductManagementBarProps {
    searchCriteria?: SearchCriteria;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
}

function ProductManagementBar({ searchCriteria, onUpdateSearchCriteria }: ProductManagementBarProps) {
    const history = useHistory();
    
    const [localSearchCriteria, useSearchFormMethods] = useSearchForm(
        { column: "name", keyword: "" }, onUpdateSearchCriteria
    );

    const { onChangeSearchColumn, onChangeSearchKeyword, onClickSearchBtn, onKeyPress } = useSearchFormMethods;

    const onMoveSave = useCallback(() => {
        history.push("/admin/product/save");
    }, []);  

    return (
        <div className="header-bottom pb--10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2">
                        <select className="form-control" onChange={onChangeSearchColumn}>
                            <option value="name" selected={localSearchCriteria.column === "name"}>상품명</option>
                            <option value="author" selected={localSearchCriteria.column === "author"}>저자</option>
                            <option value="isbn" selected={localSearchCriteria.column === "isbn"}>ISBN</option>
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <div className="site-mini-search">
                            <input 
                                type="text"
                                value={localSearchCriteria.keyword}
                                onChange={onChangeSearchKeyword}
                                onKeyPress={onKeyPress}
                                placeholder="Search" 
                            />
                            <button onClick={onClickSearchBtn}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-outlined--primary" onClick={onMoveSave}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ProductManagementBar);