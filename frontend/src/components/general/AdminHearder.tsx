import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/image/logo.png';
import { LogoutActionPayload } from '../../store/auth/action';

interface AdminHeaderProps {
    onLogout: (payload: LogoutActionPayload) => void;
}

function AdminHeader({ onLogout }: AdminHeaderProps) {
    const history = useHistory();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); 

    const onClickOpenMobileMenuBtn = useCallback(() => {
        setIsMobileMenuOpen(true);
    }, []);

    const onClickCloseMobileMenuBtn = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const onClickLogoutBtn = useCallback(() => {
        onLogout({
            onSuccess: () => history.push("/"),
            onFailure: error => alert(`오류 발생 : ${error}`)
        });
    }, []);
    
    return (
        <>
            <div className="site-header d-none d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">

                        </div>
                        <div className="col-lg-8 flex-lg-right">
                            <ul className="header-top-list">
                                <li>관리자 님</li>                         
                                <li><a href="javascript:void(0)" onClick={onClickLogoutBtn}>로그아웃</a></li>
                                <li><Link to="/">일반페이지로</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>  
                <div className="header-middle pt--10 pb--10">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 ">
                                <Link to="/admin/discountPolicy">
                                    <img src={Logo} alt="" />
                                </Link>
                            </div>
                            <div className="col-lg-3">

                            </div>
                            <div className="col-lg-6">
                                <div className="main-navigation flex-lg-right">
                                    <ul className="main-menu menu-right ">
                                        <li className="menu-item">
                                            <Link to="/admin/discountPolicy">할인정책 관리</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link to="/admin/category">카테고리 관리</Link>
                                        </li>    
                                        <li className="menu-item">
                                            <Link to="/admin/product/list">상품 관리</Link>
                                        </li>                        
                                        <li className="menu-item">
                                            <Link to="/admin/order">주문 관리</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link to="/admin/member">회원 관리</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className="site-mobile-menu">
                <header className="mobile-header d-block d-lg-none pt--10 pb-md--10">
                    <div className="container">
                        <div className="row align-items-sm-end align-items-center">
                            <div className="col-md-4 col-7">
                                <Link to='/' className="site-brand">
                                    <img src={Logo} alt="" />
                                </Link>
                            </div>
                            <div className="col-md-5 order-3 order-md-2">
                                
                            </div>
                            <div className="col-md-3 col-5  order-md-3 text-right">
                                <div className="mobile-header-btns header-top-widget">
                                    <ul className="header-links">
                                        <li className="sin-link">
                                            <a href="javascript:void(0)" className="link-icon hamburgur-icon off-canvas-btn" onClick={onClickOpenMobileMenuBtn}>
                                                <FontAwesomeIcon icon={faBars} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* <!--Off Canvas Navigation Start--> */}
                <aside className={`off-canvas-wrapper ${isMobileMenuOpen ? " open" : ""}`}>
                    <div className="btn-close-off-canvas" onClick={onClickCloseMobileMenuBtn}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="off-canvas-inner">
                        {/* <!-- mobile menu start --> */}
                        <div className="mobile-navigation">
                            {/* <!-- mobile menu navigation start --> */}
                            <nav className="off-canvas-nav">
                                <ul className="mobile-menu main-mobile-menu">                          
                                    <li><Link to={"/admin/discountPolicy"}>할인정책 관리</Link></li>
                                    <li><Link to={"/admin/category"}>카테고리 관리</Link></li>
                                    <li><Link to={"/admin/product/list"}>상품 관리</Link></li>
                                    <li><Link to={"/admin/order"}>주문 관리</Link></li>
                                    <li><Link to={"/admin/member"}>회원 관리</Link></li>                               
                                </ul>
                            </nav>
                            {/* <!-- mobile menu navigation end --> */}
                        </div>
                        {/* <!-- mobile menu end --> */}
                        <nav className="off-canvas-nav">
                            <ul className="mobile-menu menu-block-2">
                                <li>관리자 님</li>                         
                                <li><a href="javascript:void(0)" onClick={onClickLogoutBtn}>로그아웃</a></li>
                                <li><Link to="/">일반페이지로</Link></li>
                            </ul>
                        </nav>
                        <div className="off-canvas-bottom">
                            
                        </div>
                    </div>
                </aside>
                {/* <!--Off Canvas Navigation End--> */}
                <hr />
            </div>
        </>
    )
}

export default React.memo(AdminHeader);