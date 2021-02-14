import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import { SearchCriteria } from '../../models/common';

interface MemberManagementBarProps {
    onUpdateSearchCriteria: (searchCriteria: SearchCriteria) => void;
}

function MemberManagementBar({ onUpdateSearchCriteria }: MemberManagementBarProps) {
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({column:"email", keyword: ""});    

    const onChangeSearchColumn = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const column: string = event.target.value;

        setSearchCriteria(searchCriteria => ({
            ...searchCriteria,
            column: column
        }));
    }, []);

    const onChangeSearchKeyword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword: string = event.currentTarget.value;

        setSearchCriteria(searchCriteria => ({
            ...searchCriteria,
            keyword: keyword
        }));
    }, []);

    const onClickSearchBtn = useCallback(() => {
        if(!searchCriteria.keyword) {
            alert("검색어를 입력해주세요.");
            return;
        }

        onUpdateSearchCriteria(searchCriteria);
    }, [searchCriteria]);

    const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            onClickSearchBtn();
        } 
    }, [onClickSearchBtn]);

    return (
        <div className="header-bottom pb--10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2">
                        <select className="form-control" onChange={onChangeSearchColumn}>
                            <option value="email">이메일</option>
                            <option value="name">이름</option>
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MemberManagementBar);