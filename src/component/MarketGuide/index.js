import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import FooterHomePage from "../FooterHomepage";
const MarketGuide = () => {

    return (
        <>
            <NavBar />
            <div className="marketguide">
                <div className="mg-first-slide p-0 mt-5">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                        <h1 className="title1">Tiếp thị- </h1>
                        <h1 className="title2">doanh nghiệp của bạn</h1>
                        <h3 className="content">Một nền tảng giúp tìm kiếm và bán hàng cho khách hàng phù hợp, dù họ ở bất bì đâu.</h3>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title-orange">Đối  tượng</h5>
                                <h5 className="sub-content">Tìm kiếm khách hàng bằng công cụ tiếp thị nội dung và SEO</h5>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title-orange">Thông tin chuyên sâu</h5>
                                <h5 className="sub-content">Cải tiến từng chiến dịch nhờ báo cáo</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title-orange">Chiến dịch</h5>
                                <h5 className="sub-content">Tiếp cận đối tượng và quảng bá sản phẩm của bản</h5>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title-orange">Các mối quan hệ</h5>
                                <h5 className="sub-content">Làm chủ và phát triển các mối quan hệ khách hàng</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6  slide-part text-align-center align-self-end order-mobile-1">
                        <div className="row align-items-end ">
                            <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                <img alt="img" src="/img/marketguide/slide1-1.png" className="img-first-slide-t" />
                                <img alt="img" src="/img/marketguide/slide1-2.png" />
                            </div>
                            <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                <img alt="img" src="/img/marketguide/slide1-3.png" className="img-first-slide-t" />
                                <img alt="img" src="/img/marketguide/slide1-4.png" />
                            </div>

                        </div>
                    </div>
                </div>
                </div>

                <div className="mg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Nhắm mục tiêu theo đối tượng</h4>
                            <h2 className="title2">Thu hút </h2>
                            <h2 className="title2 mb-3">Khách hàng phù hợp</h2>
                            <h5 className="sub-content mb-5">Tiếp cận khách hàng lý tưởng thông qua tiếp thị nội dung, SEO và mạng xã hội.</h5>

                            <h5 className="sub-title-2">Blog</h5>
                            <h5 className="sub-content">Xây dựng đói tượng và tăng lưu lượng truy cập vào cửa hàng tghoong qua blog tích hợp sẵn của EasyMall</h5>

                            <h5 className="sub-title-2">Các công cụ SEO</h5>
                            <h5 className="sub-content">Giups mọi người tìm thấy cửa hàng của bạn bằng cách sử dụng công cụ SEO để chỉnh sửa thẻ tiêu đề, thẻ mô tả và chi tiết sản phẩm</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <div className="row">
                                <img alt="img" src="/img/marketguide/slide2-2.png" className="img-second-slide-2" />
                                
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/marketguide/slide3-2.png" className="img3-2"/>

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Tạo chiến dịch</h4>
                            <h2 className="title1">Quảng bá sản phẩm</h2>
                            <h5 className="sub-content">Tạo chiến dich marketing online để những người phù hợp thấy cửa hàng của bạn - không cần kinh nghiệm.</h5>

                            <h5 className="sub-title-2">Tiếp thị qua emal</h5>
                            <h5 className="sub-content">Tạo chiến dịch email từ các thiết bị có sẵn với EasyMall email</h5>

                            <h5 className="sub-title-2">Mua sắm thông minh của Google </h5>
                            <h5 className="sub-content">Đặt ngân sách hàng ngày và sử dụng công nghệ của Google để chạy các chiến dịch mang tính chiến lược cho bạn.</h5>

                            <h5 className="sub-title-2">Quảng cáo trên Facebook</h5>
                            <h5 className="sub-content">Dùng EasyMall để chọn đối tượng và tự tin rằng bạn đang nhắm mục tiêu đến những khách hàng lý tưởng.</h5>
                        </div>
                        
                    </div>
                </div>

                <div className="mg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Thông tin chuyên sâu hữu ích</h4>
                            <h2 className="title2 mb-2">Cải thiện hiệu quả</h2>
                            <h5 className="sub-content mb-5">Hạn chế việc phỏng đoán và cải thiện chiến dịch theo thời gian.</h5>
                            <h5 className="sub-title-2">Báo cáo tiếp thị tổng quan</h5>
                            <h5 className="sub-content">Theo dõi hiệu suất chiến dịch trên tất cả các kênh, từ lúc bắt đầu đến khi kết thúc.</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/marketguide/slide4-2.png" className="img-second-slide-2" />
                        </div>
                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/marketguide/slide5-1.png" className="img3-2"/>

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Các mối quan hệ</h4>
                            <h2 className="title1">Xây dựng mối quan hệ với khách hàng</h2>
                            <h5 className="sub-content">Làm chủ và nuôi dưỡng các mối quan hệ khách hàng của riêng bạn thông qua tính năng tin nhắn mạnh mẽ từ một nền tảng duy nhất và tiện lợi.</h5>

                            <h5 className="sub-title-2">Hiểu thêm về khách hàng của bạn</h5>
                            <h5 className="sub-content">Thu thập và hệ thống hóa dữ liệu của bạn một cách an toàn và ở một nơi duy nhất để kết nối với người mua ở mọi nơi.</h5>

                            <h5 className="sub-title-2">Biến dữ liệu của bạn thành doanh thu thông qua Shop Email</h5>
                            <h5 className="sub-content">Giải pháp email ưu tiên thương mại của chúng tôi giúp bạn nhắm mục tiêu khách hàng và phát triển doanh nghiệp của mình.</h5>
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

export default MarketGuide;