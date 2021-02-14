import React from 'react';

interface StockManagementBarProps {
    onOpenSaveModal: () => void;
}
function StockManagementBar({ onOpenSaveModal }: StockManagementBarProps) {
    return (
        <div className="header-bottom pb--10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2">

                    </div>
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-5">
                        
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-outlined--primary" onClick={onOpenSaveModal}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(StockManagementBar);