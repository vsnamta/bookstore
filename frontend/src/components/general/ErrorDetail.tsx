import React from 'react';

interface ErrorDetailProps {
    message: string;
}

function ErrorDetail({message}: ErrorDetailProps) {    
    return (
        <div className="row">
            <div className="col-12">
                <h1>{message}</h1>
            </div>
        </div>
    )
};

export default React.memo(ErrorDetail);