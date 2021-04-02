import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import useSearchForm from '../../hooks/useSearchForm';
import { SearchCriteria } from '../../models/common';

interface MemberManagementBarProps {
    searchCriteria?: SearchCriteria;
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
}

function MemberManagementBar({ searchCriteria, onUpdateSearchCriteria }: MemberManagementBarProps) {
    const [localSearchCriteria, useSearchFormMethods] = useSearchForm(
        { column: "id", keyword: "" }, onUpdateSearchCriteria
    );
    
    const { onChangeSearchColumn, onChangeSearchKeyword, onClickSearchBtn, onKeyPress } = useSearchFormMethods;

    return (
        <div className="header-bottom pb--10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2">
                        <select className="form-control" onChange={onChangeSearchColumn}>
                            <option value="id" selected={localSearchCriteria.column === "id"}>아이디</option>
                            <option value="name" selected={localSearchCriteria.column === "name"}>이름</option>
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MemberManagementBar);