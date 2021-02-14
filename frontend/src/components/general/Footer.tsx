import React from 'react';
import Logo from '../../assets/image/logo.png';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row justify-content-between  section-padding">
                    <div className=" col-xl-3 col-lg-4 col-sm-6">
                        <div className="single-footer pb--40">
                            <div className="brand-footer footer-title">
                                <img src={Logo} alt="" />
                            </div>
                            <div className="footer-contact">
                                <p><span className="label">주소:</span><span className="text">서울시 중구 명동 123번지</span></p>
                                <p><span className="label">대표전화:</span><span className="text">123-456</span></p>
                                <p><span className="label">이메일:</span><span className="text">test@gmail.com</span></p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-xl-3 col-lg-2 col-sm-6">
                        <div className="single-footer pb--40">
                            <div className="footer-title">
                                <h3>이용정보</h3>
                            </div>
                            <ul className="footer-list normal-list">
                                <li><a href="javascript:void(0)">회사소개</a></li>
                                <li><a href="javascript:void(0)">이용약관</a></li>
                                <li><a href="javascript:void(0)">개인정보취급방침</a></li>
                                <li><a href="javascript:void(0)">청소년보호정책</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-xl-3 col-lg-2 col-sm-6">
                        <div className="single-footer pb--40">
                            <div className="footer-title">
                                <h3>문의사항</h3>
                            </div>
                            <ul className="footer-list normal-list">
                                <li><a href="javascript:void(0)">인재채용</a></li>
                                <li><a href="javascript:void(0)">제휴안내</a></li>
                                <li><a href="javascript:void(0)">광고안내</a></li>
                                <li><a href="javascript:void(0)">고객센터</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-xl-3 col-lg-4 col-sm-6">
                        <div className="footer-title">
                            <h3>이벤트 정보 정기 구독</h3>
                        </div>
                        <div className="newsletter-form mb--30">
                            <form>
                                <input type="email" className="form-control" placeholder="이메일을 입력해주세요." />
                                <button className="btn btn--primary w-100">구독하기</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p className="copyright-text">Copyright © 2020 <a href="javascript:void(0)" className="author">boostore</a>. All Right Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default React.memo(Footer);