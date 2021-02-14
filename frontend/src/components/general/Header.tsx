import { faBars, faChevronDown, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import qs from 'qs';
import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/image/logo.png';
import { CategoryResult } from '../../models/categories';
import { SearchCriteria } from '../../models/common';
import { LoginMember } from '../../models/members';

interface HeaderProps {
    loginMember?: LoginMember;
    categoryList?: CategoryResult[];
}

function Header({loginMember, categoryList}: HeaderProps) {
    const history = useHistory();

    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({column:"name", keyword: ""});    
    
    const onChangeSearchKeyword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword: string = event.currentTarget.value;

        setSearchCriteria(searchCriteria => ({
            ...searchCriteria,
            keyword: keyword
        }));
    }, []);

    const onClickSearchBtn = useCallback(() => {
        if(!searchCriteria.keyword) {
            alert("검색어를 입력해주세요.");
            return;
        }

        const queryString = qs.stringify({searchCriteria}, { allowDots: true });
        history.push(`/product/list?${queryString}`);
    }, [searchCriteria]);

    const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            onClickSearchBtn();
        } 
    }, [onClickSearchBtn]);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); 

    const onClickOpenMobileMenuBtn = useCallback(() => {
        setIsMobileMenuOpen(true);
    }, []);

    const onClickCloseMobileMenuBtn = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <>
            <div className="site-header header-2 mb--20 d-none d-lg-block">           
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            
                        </div>
                        <div className="col-lg-8 flex-lg-right">
                            <ul className="header-top-list">
                                {!loginMember 
                                    ? <li><Link to="/login"> 로그인 </Link></li>
                                    : 
                                    <li><a href="/logout">로그아웃 </a></li>
                                }
                                <li className="dropdown-trigger language-dropdown">
                                    <a href="javascript:void(0)">마이 페이지</a> <FontAwesomeIcon icon={faChevronDown} />
                                    <ul className="dropdown-box">
                                        <li><Link to="/myData">나의정보</Link></li>
                                        <li><Link to="/myOrder">주문내역</Link></li>
                                        <li><Link to="/myPointHistory">포인트내역</Link></li>
                                        <li><Link to="/myReview">나의리뷰</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/cart">장바구니</Link></li>
                                {(loginMember && loginMember.role === "ADMIN") &&
                                    <li><Link to="/admin/member"> 관리자 페이지로 </Link></li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="header-middle pt--10 pb--10">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <Link to='/' className="site-brand">
                                    <img src={Logo} alt="" />
                                </Link>
                            </div>
                            <div className="col-lg-5">
                                <div className="header-search-block">                              
                                    <input type="text" 
                                        value={searchCriteria.keyword} 
                                        onChange={onChangeSearchKeyword}
                                        onKeyPress={onKeyPress}
                                    />
                                    <button onClick={onClickSearchBtn}>검색</button>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-bottom bg-primary">
                    <div className="container">
                        <div className="row align-items-center">

                            <div className="col-lg-3">
                                
                            </div>
                    
                            <div className="col-lg-6">
                                <div className="main-navigation flex-lg-right">
                                    <ul className="main-menu menu-right main-menu--white li-last-0">                                    
                                        <li className="menu-item has-children mega-menu">
                                            <a href="javascript:void(0)">전체 카테고리 <FontAwesomeIcon icon={faChevronDown} /></a>
                                            <ul className="sub-menu four-column">
                                                {categoryList && categoryList.map(superCategory => (
                                                    <li className="cus-col-25" key={superCategory.id}>
                                                        <h3 className="menu-title">
                                                            <Link to={`/product/list?categoryId=${superCategory.id}`}>{superCategory.name}</Link>
                                                        </h3>
                                                        <ul className="mega-single-block">
                                                            {superCategory.children.map(subCategory => (
                                                                <li key={subCategory.id}>
                                                                    <Link to={`/product/list?categoryId=${subCategory.id}`} >{subCategory.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="menu-item">
                                            <a href="javascript:void(0)">베스트</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="javascript:void(0)">신상품</a>
                                        </li>                                  
                                        <li className="menu-item">
                                            <a href="javascript:void(0)">이벤트</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="javascript:void(0)">사은품</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                
                            </div>

                        </div>
                    </div>
                </div>
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
                        {/* <!-- search box start --> */}
                        <div className="search-box offcanvas">
                            <form>
                                <input 
                                    type="text"
                                    value={searchCriteria.keyword} 
                                    onChange={onChangeSearchKeyword}
                                    onKeyPress={onKeyPress}
                                />
                                <button className="search-btn" onClick={onClickSearchBtn}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </form>
                        </div>
                        {/* <!-- search box end --> */}
                        {/* <!-- mobile menu start --> */}
                        <div className="mobile-navigation">
                            {/* <!-- mobile menu navigation start --> */}
                            <nav className="off-canvas-nav">
                                <ul className="mobile-menu main-mobile-menu">
                                    <li><Link to={"/product/list"}>전체 카테고리</Link></li>
                                    <li><a href="javascript:void(0)">베스트</a></li>
                                    <li><a href="javascript:void(0)">신상품</a></li>
                                    <li><a href="javascript:void(0)">이벤트</a></li>
                                    <li><a href="javascript:void(0)">사은품</a></li>                               
                                </ul>
                            </nav>
                            {/* <!-- mobile menu navigation end --> */}
                        </div>
                        {/* <!-- mobile menu end --> */}
                        <nav className="off-canvas-nav">
                            <ul className="mobile-menu menu-block-2">
                                {!loginMember 
                                    ? <li><Link to="/login"> 로그인 </Link></li>
                                    : 
                                    <li><a href="/logout">로그아웃 </a></li>
                                }
                                <li><Link to="/myData">마이페이지</Link></li>
                                <li><Link to="/cart">장바구니</Link></li>
                                {(loginMember && loginMember.role === "ADMIN") &&
                                    <li><Link to="/admin/member"> 관리자 페이지로 </Link></li>
                                }
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

export default React.memo(Header);