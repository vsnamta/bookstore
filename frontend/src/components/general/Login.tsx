import React from 'react';

function Login() {        
    return (
        <main className="inner-page-sec-padding-bottom">
            <div className="container">
                <h3>로그인 페이지</h3>
                <br />
                <div className="row">
                    <div className="col-12">
                        <div className="add-cart-btn">
                            <a href="/oauth2/authorization/google" className="btn btn-outlined--primary">구글 로그인</a>
                            <a href="/oauth2/authorization/naver" className="btn btn-outlined--primary">네이버 로그인</a>
                        </div> 
                    </div>
                </div>
            </div>
        </main>
    )
};

export default React.memo(Login);