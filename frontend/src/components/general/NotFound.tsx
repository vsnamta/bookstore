import React from 'react';

function NotFound() {    
    return (
        <div className="row">
            <div className="col-12">
                <h1>페이지를 찾을 수 없습니다.</h1>
            </div>
        </div>
    )
};

export default React.memo(NotFound);