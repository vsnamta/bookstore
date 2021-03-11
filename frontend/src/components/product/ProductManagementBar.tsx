import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import useSearchForm from '../../hooks/useSearchForm';
import { SearchCriteria } from '../../models/common';

interface ProductManagementBarProps {
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
    onMoveSave: () => void;
}

function ProductManagementBar({ onUpdateSearchCriteria, onMoveSave }: ProductManagementBarProps) {
    const [searchCriteria, useSearchFormMethods] = useSearchForm("name", onUpdateSearchCriteria);
    
    const { onChangeSearchColumn, onChangeSearchKeyword, onClickSearchBtn, onKeyPress } = useSearchFormMethods;

    return (
        <div className="header-bottom pb--10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2">
                        <select className="form-control" onChange={onChangeSearchColumn}>
                            <option value="name">상품명</option>
                            <option value="author">저자</option>
                            <option value="isbn">ISBN</option>
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <div className="site-mini-search">
                            <input 
                                type="text"
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