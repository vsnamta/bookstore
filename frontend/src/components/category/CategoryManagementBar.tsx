import React, { useCallback } from 'react';

interface CategoryManagementBarProps {
    onOpenSaveModal: (saveCategoryType: string) => void;
}

function CategoryManagementBar({ onOpenSaveModal }: CategoryManagementBarProps) {
    const onClickSaveBtn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onOpenSaveModal(event.currentTarget.value);
    }, []);
    
    return (
        <div className="header-bottom pb--10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2">

                    </div>
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-2">
                        
                    </div>
                    <div className="col-lg-5">
                        <button className="btn btn-outlined--primary" value="super" onClick={onClickSaveBtn}>상위 카테고리 등록</button>
                        <button className="btn btn-outlined--primary" value="sub" onClick={onClickSaveBtn}>하위 카테고리 등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CategoryManagementBar);