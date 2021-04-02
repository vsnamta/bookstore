import { useCallback, useState } from "react";
import { SearchCriteria } from "../models/common";

export interface UseSearchFormMethods {
    onChangeSearchColumn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeSearchKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickSearchBtn: () => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function useSearchForm(
    initialSearchCriteria: SearchCriteria,
    searchFunc: (searchCriteria: SearchCriteria) => void)
: [
    SearchCriteria,
    UseSearchFormMethods
] {
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(initialSearchCriteria);    

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

        searchFunc(searchCriteria);
    }, [searchCriteria]);

    const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            onClickSearchBtn();
        } 
    }, [onClickSearchBtn]);

    return [searchCriteria, {
        onChangeSearchColumn, 
        onChangeSearchKeyword, 
        onClickSearchBtn, 
        onKeyPress
    }];
}

export default useSearchForm;