import React from 'react';
import { Link } from 'react-router-dom';

interface MyPageLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

function MyPageLayout({ children }: MyPageLayoutProps) {
    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <div className="myaccount-tab-menu nav" role="tablist">
                            <Link to="/myData">나의정보</Link>
                            <Link to="/myOrder">주문내역</Link>
                            <Link to="/myPointHistory">포인트내역</Link>
                            <Link to="/myReview">나의리뷰</Link>
                            <a href="/logout">로그아웃</a>
                        </div>
                    </div> 
                    <div className="col-lg-9 col-12 mt--30 mt-lg--0">
                        <div className="tab-content" id="myaccountContent">
                            <div className="tab-pane fade show active" id="dashboad" role="tabpanel">
                                <div className="myaccount-content">
                                    {children}   
                                </div>  
                            </div> 
                        </div>  
                    </div>                        
                </div>
            </div>
        </div>
    )
};

export default React.memo(MyPageLayout);