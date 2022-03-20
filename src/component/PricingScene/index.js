import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import FooterHomePage from "../FooterHomepage";
const PricingScene = () => {

    return (
        <>
            <NavBar />
            <div className="end-slide mt-5">
                <h5 className="font-weight-bold text-end-slide-1">Hãy tạo cửa hàng trước, chọn gói giá sau</h5>

                <h5 className="text-end-slide-2">
                    Dùng thử EasyMall miễn phí, khám phá tất cả các công cụ và dịch vụ để khởi động, vận hành và phát triển doanh nghiệp của riêng mình.
                </h5>
                <button className="btn btn-success btn-end-slide mt-5" > <p className="text-btn-end-slide"> Bắt đầu dùng thử miễn phí </p></button>
            </div>
            <div className="pricingscene">
                <div className="price-first-slide  p-4 mt-5">
                    <div className="text-align-center m-5">
                        <h1 className="title1">Tự tin</h1>
                        <h1 className="title2">Làm chủ doanh nghiệp của bạn</h1>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <div className="service-pack mb-2">
                                <h1  className="service-pack-title mb-4">Basic</h1>
                                <p>Phù hợp nhất với những doanh nghiệp thương mại điện tử mới có doanh số bán hàng tại cửa hàng không đáng kể</p>
                                <h1 className="service-pack-title text-align-center mt-5">100.000</h1>
                            </div>

                        </div>
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="service-pack mb-2">
                                <h1  className="service-pack-title mb-4">EasyMall</h1>
                                <p>Phù hợp nhất với những doanh nghiệp thương mại điện tử mới có doanh số bán hàng tại cửa hàng không đáng kể</p>
                                <h1 className="service-pack-title text-align-center mt-5">200.000</h1>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="service-pack mb-2">
                                <h1  className="service-pack-title mb-4">Advanced</h1>
                                <p>Phù hợp nhất với những doanh nghiệp thương mại điện tử mới có doanh số bán hàng tại cửa hàng không đáng kể</p>
                                <h1 className="service-pack-title text-align-center mt-5">300.000</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="price-second-slide  p-4 mt-5">
                <img alt="img" src="/img/price/Table.png" />
                </div>


            </div>

            <FooterHomePage></FooterHomePage>
        </>
    );
}

export default PricingScene;