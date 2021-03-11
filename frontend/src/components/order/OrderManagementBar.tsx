import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import useSearchForm from '../../hooks/useSearchForm';
import { SearchCriteria } from '../../models/common';

interface OrderManagementBarProps {
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
}

function OrderManagementBar({ onUpdateSearchCriteria }: OrderManagementBarProps) {
    const [searchCriteria, useSearchFormMethods] = useSearchForm("id", onUpdateSearchCriteria);
    
    const { onChangeSearchColumn, onChangeSearchKeyword, onClickSearchBtn, onKeyPress } = useSearchFormMethods;

    return (
        <div className="header-bottom pb--10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2">
                        <select className="form-control" onChange={onChangeSearchColumn}>
                            <option value="id">주문번호</option>
                            <option value="memberEmail">이메일</option>
                            <option value="memberName">이름</option>
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <div className="site-mini-search">
                            <input 
                                type="text"
                                onChange={onChangeSearchKeyword}
                                onKeyPress={onKeyPress}
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

export default React.memo(OrderManagementBar);