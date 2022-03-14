import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import FooterHomePage from "../FooterHomepage";
const SellGuide = () => {

    return (
        <>
            <NavBar />
            <div className="sellguide">
                <div className="sg-first-slide p-0 mt-5">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                        <h1 className="title1">Bán hàng</h1>
                        <h1 className="title2">Khắp mọi nơi</h1>
                        <h3 className="content">Nền tảng cho phép bán hàng dù khách hàng đang ở bất kì hơi đâu -  trực tuyến, trực  tiếp.</h3>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Cửa hàng trực tuyến</h5>
                                <h5 className="sub-content">Bán hàng trực tuyến bằng một trang web thương mại điện tử</h5>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Nút mua</h5>
                                <h5 className="sub-content">Thêm tính năng thương mại điện tử vào bất kì trang web hay blog nào</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Địa điểm bán hàng</h5>
                                <h5 className="sub-content">Bán hàng trực tiếp tại các địa điểm bán lẻ, cửa hàng pop-up và nhiều lựa chọn khác</h5>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Kênh bán hàng</h5>
                                <h5 className="sub-content">Bán hàng trên mạng truyền thông và xã hội, thị trường trực tuyến và nhiều lựa chọn khác</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6  slide-part text-align-center align-self-end order-mobile-1">
                        <div className="row align-items-end ">
                            <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                <img alt="img" src="/img/sellguide/slide1-1.png" className="img-first-slide-1" />
                            </div>
                            <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                <img alt="img" src="/img/sellguide/slide1-2.png" className="img-first-slide-2" />
                                <img alt="img" src="/img/sellguide/slide1-3.png" className="img-first-slide-3" />
                            </div>

                        </div>
                    </div>
                </div>
                </div>

                <div className="sg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Cửa hàng trực tuyến theo yêu cầu</h4>
                            <h2 className="title2">Thương hiệu của bạn -</h2>
                            <h2 className="title2 mb-5">cách làm của bạn</h2>

                            <h5 className="sub-title-2">Hơn 50 chủ đề</h5>
                            <h5 className="sub-content">Mang thương  hiệu vào cuộc sống nhờ các chủ đề đáp ứng, có thể tùy chỉnh</h5>

                            <h5 className="sub-title-2">Trình tạo cửa hàng kéo và thả</h5>
                            <h5 className="sub-content">Tạo các cửa hàng mà không cần kỹ năng lập trình hay thiết kế</h5>

                            <h5 className="sub-title-2">Miền tùy chỉnh</h5>
                            <h5 className="sub-content">Dùng miền của bản hoặc mua miền qua Shopify</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <div className="row">
                                <img alt="img" src="/img/sellguide/slide2-1.png" className="img-second-slide-1" />
                                <img alt="img" src="/img/sellguide/slide2-2.png" className="img-second-slide-2" />
                                
                            </div>

                        </div>
                    </div>
                </div>

                <div className="sg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/sellguide/slide3-2.png" className="img3-2"/>

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Điểm bán hàng</h4>
                            <h2 className="title1">Trải nghiệm bán lẻ</h2>
                            <h2 className="title1 mb-4">Khác biệt</h2>
                            <h5 className="sub-content">Tăng doanh thu bán hàng trực tiếp</h5>

                            <h5 className="sub-title-2">Mua sắm thú vị hơn</h5>
                            <h5 className="sub-content">Cung cấp cho khách hàng dịch vụ được cá nhân hóa, khả năng mua sắm linh hoạt và trả lại dễ hàng</h5>

                            <h5 className="sub-title-2">Phần mềm sử dụng</h5>
                            <h5 className="sub-content">Đơn giản hóa thiết lập cửa hàng và đào tạo nhân viênế</h5>

                            <h5 className="sub-title-2">Công cụ quản lí hành chính tích hợp</h5>
                            <h5 className="sub-content">Dùng một công cụ quản lí toàn bộ sản phẩm, kho hàng và khách hàng</h5>
                        </div>
                        
                    </div>
                </div>

                <div className="sg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Nút mua linh hoạt</h4>
                            <h2 className="title2">Thương hiệu điện tử</h2>
                            <h2 className="title2 mb-5">trong tầm tay</h2>

                            <h5 className="sub-title-2">Thanh toán an toàn</h5>
                            <h5 className="sub-content">Thêm trải nghiệm thanh toán an toàn, dễ sử dụng trên thiết bị di động vao trang của bạn</h5>

                            <h5 className="sub-title-2">Nút có thể tùy chỉnh</h5>
                            <h5 className="sub-content">Tạo trải nghiệm mua sắm theo yêu cầu cho trang web hay blog hiện có</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/sellguide/slide4-1.png" className="img-second-slide-2" />
                        </div>
                    </div>
                </div>

                <div className="end-slide mt-5">
                    <h5 className="font-weight-bold text-end-slide-1">Bắt đầu hành trình kinh doanh của bạn với EasyMall</h5>

                    <h5 className="text-end-slide-2">
                        Dùng thử EasyMall miễn phí, khám phá tất cả các công cụ và dịch vụ để khởi động, vận hành và phát triển doanh nghiệp của riêng mình.
                    </h5>
                    <button className="btn btn-success btn-end-slide mt-5" > <p className="text-btn-end-slide"> Bắt đầu dùng thử miễn phí </p></button>
                </div>
            </div>

            <FooterHomePage></FooterHomePage>
        </>
    );
}

export default SellGuide;