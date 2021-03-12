import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';

interface ProductListFilterBar {
    totalCount?: number;
    onSortChange: (sortCriteria: {sortColumn: string, sortDirection: string }) => void
}

function ProductListFilterBar({totalCount, onSortChange}: ProductListFilterBar) { 
    if(!totalCount) {
        return null;
    }
    
    const onChangeSort = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.currentTarget.options[event.currentTarget.options.selectedIndex];

        onSortChange({
            sortColumn: selected.dataset.sortColumn as string, 
            sortDirection: selected.dataset.sortDirection as string 
        });
    }, [onSortChange]);

    return (
        <div className="shop-toolbar with-sidebar mb--30">
            <div className="row align-items-center">								
                <div className="col-lg-2 col-md-2 col-sm-6">									
                    <div className="product-view-mode">
                        <a href="javascript:void(0)" className="sorting-btn active">
                            <FontAwesomeIcon icon={faList} />
                        </a>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-6  mt--10 mt-sm--0">
                    <span className="toolbar-status">
                        {`검색: ${totalCount}건`}
                    </span>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6  mt--10 mt-md--0">
                    <div className="sorting-selection">
                        <span>보기:</span>
                        <select className="form-control nice-select sort-select">
                            <option value="">10</option>
                        </select>
                    </div>
                </div>
                
                <div className="col-xl-5 col-lg-4 col-md-4 col-sm-6 mt--10 mt-md--0 ">
                    <div className="sorting-selection">
                        <span>정렬:</span>
                        <select className="form-control nice-select sort-select mr-0 wide" onChange={onChangeSort}>
                            <option data-sort-column={"publishedDate"} data-sort-direction={"desc"}>출간일 빠른순</option>
                            <option data-sort-column={"salesQuantity"} data-sort-direction={"desc"}>판매량 높은순</option>
                            <option data-sort-column={"regularPrice"} data-sort-direction={"desc"}>가격 높은순</option>
                            <option data-sort-column={"regularPrice"} data-sort-direction={"asc"}>가격 낮은순</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default React.memo(ProductListFilterBar);