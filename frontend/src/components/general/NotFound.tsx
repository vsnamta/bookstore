import React from 'react';

function NotFound() {    
    return (
        <main className="inner-page-sec-padding-bottom">
            <div className="row">
                <div className="col-12">
                    <div className="container">
                        <h1>페이지를 찾을 수 없습니다.</h1>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default React.memo(NotFound);