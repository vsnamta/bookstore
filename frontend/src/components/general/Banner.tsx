import React from 'react';

function Banner() {    
    return (
        <section className="hero-area hero-slider-2">
            <div className="container">
                <div className="row align-items-lg-center">
                    <div className="col-12">
                        <div className="single-slide bg-image" style={{backgroundColor: "mintcream"}}>
                            <div className="home-content pl--30">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <span className="title-mid">추천도서</span>
                                        <h2 className="h2-v2">화제의 책</h2>
                                        <p>이벤트 사은품 증정</p>
                                        <a href="javascript:void(0)" className="btn btn-outlined--primary">
                                            바로 가기
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default React.memo(Banner);