import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    page?: number;
    totalCount?: number;
    onPageChange: (selectedItem: { selected: number; }) => void;
}

function Pagination({ page, totalCount, onPageChange }: PaginationProps) {
    if(!totalCount) {
        return null;
    }

    return (
        <div className="row pt--30">
            <div className="col-md-12">
                <div className="pagination-block">
                    <ReactPaginate
                        forcePage={!page ? 0 : page - 1} 
                        pageCount={Math.ceil(totalCount / 10)}
                        pageRangeDisplayed={10}
                        marginPagesDisplayed={0}
                        onPageChange={onPageChange}
                        containerClassName={"pagination-btns flex-center"}
                        previousLinkClassName={"single-btn prev-btn"}
                        previousLabel={"<"}
                        activeClassName={"active"}
                        pageLinkClassName={"single-btn"}
                        nextLinkClassName={"single-btn next-btn"}
                        nextLabel={">"}
                    />
                </div>
            </div>
        </div>
    )
};

export default React.memo(Pagination);