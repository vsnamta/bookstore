import React from 'react';

interface PaginationProps {
    message: string;
}

function Pagination({ message }: PaginationProps) {    
    return (
        <main className="inner-page-sec-padding-bottom">
            <div className="row">
                <div className="col-12">
                    <div className="container">
                        <h1>{message}</h1>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default React.memo(Pagination);