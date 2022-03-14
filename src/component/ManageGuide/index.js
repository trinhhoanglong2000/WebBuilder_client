import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import FooterHomePage from "../FooterHomepage";
const ManageGuide = () => {

    return (
        <>
            <NavBar />
            <div className="manageguide">
                <div className="mg-first-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h1 className="title1">Quản lí</h1>
                            <h1 className="title2">doanh nghiệp của bạn</h1>
                            <h3 className="content">Công cụ quản lý đắc lực giúp doanh nghiệp của bạn hoạt động hiệu quả, tất cả tại cùng một nơi.</h3>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">Đơn hàng</h5>
                                    <h5 className="sub-content">Đễ dàng quản lí và thực hiện đơn hàng từ khâu đặt hàng đến giao hàng</h5>
                                </div>
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">Thiết bị di động</h5>
                                    <h5 className="sub-content">Vận hành doanh nghiệp dù bạn ở đâu</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">Thanh toán</h5>
                                    <h5 className="sub-content">Chấp nhận thanh toán và nhanh chóng nhận được tiền</h5>
                                </div>
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">Thông tin chuyên sâu</h5>
                                    <h5 className="sub-content">Xác định các yếu tố quan trọng và phát triển doanh nghiêp của bạn</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6  slide-part text-align-center align-self-end order-mobile-1">
                            <div className="row align-items-end ">
                                <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                    <img alt="img" src="/img/manageguide/slide1-1.png" />
                                </div>
                                <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                    <img alt="img" src="/img/manageguide/slide1-2.png" className="img-first-slide-t" />
                                    <img alt="img" src="/img/manageguide/slide1-3.png" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Thực hiện đơn hàng tập trung</h4>
                            <h2 className="title2">Hệ thống </h2>
                            <h2 className="title2 mb-3">quản lý đơn hàng</h2>
                            <h5 className="sub-content mb-5">Giao sản phẩm đến đúng nơi nhờ kho hàng, đơn hàng, quá trình thực hiện và vận chuyển được sắp xếp hợp lý.</h5>

                            <h5 className="sub-title-2">Quản lý và thực hiện đơn hàng</h5>
                            <h5 className="sub-content">Giao đơn hàng đến đúng nơi sớm hơn nhờ phương thức thực hiện hiệu quả cho bạn.</h5>

                            <h5 className="sub-title-2">Quản lý hàng tồn kho</h5>
                            <h5 className="sub-content">Tiết kiệm thời gian và tiền bạc nhờ công cụ hỗ trợ bạn quản lý, giám sát và di chuyển hàng trong kho qua nhiều địa điểm.</h5>

                            <h5 className="sub-title-2">Vận chuyển và giao hàng</h5>
                            <h5 className="sub-content">Sử dụng các tùy chọn vận chuyển có giá cả phải chăng để giao đơn hàng trên toàn cầu.</h5>

                            <h5 className="sub-title-2">Trả hàng và hoàn tiền</h5>
                            <h5 className="sub-content">Củng cố niềm tin của khách hàng thông qua quá trình trả hàng, hoàn tiền không phiền toái và dễ quản lý.</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <div className="row">
                                <img alt="img" src="/img/manageguide/slide2-2.png" className="img-second-slide-2" />

                            </div>

                        </div>
                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/manageguide/slide3-1.png" className="img3-2" />

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Quy trình xử lí thanh toán</h4>
                            <h2 className="title1">Thanh toán đơn giản</h2>
                            <h5 className="sub-content">An tâm chấp nhận thẻ tín dụng tại cửa hàng trực tuyến.</h5>

                            <h5 className="sub-title-2">Các phương thức thanh toán</h5>
                            <h5 className="sub-content">Chấp nhận thẻ tín dụng và các phương thức thanh toán địa phương.</h5>

                            <h5 className="sub-title-2">Cổng thanh toán</h5>
                            <h5 className="sub-content">EasyMall cũng tích hợp với hơn 100 cổng thanh toán bên thứ ba.</h5>
                        </div>

                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/manageguide/slide4-1.png" className="img3-2" />

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Ứng dụng EasyMall cho di động</h4>
                            <h2 className="title1">Có mặt</h2>
                            <h2 className="title1">bất kì nơi đâu</h2>
                            <h5 className="sub-content">Hoàn thành công việc ở nhiều địa điểm hơn nhờ việc quản lý sản phẩm, thanh toán, quá trình vận chuyển và thực hiện đơn hàng trên thiết bị di động của bạn.</h5>

                            <h5 className="sub-title-2">Thêm sản phẩm</h5>
                            <h5 className="sub-content">Dễ dàng thêm sản phẩm dù ở bất kì đâu.</h5>

                            <h5 className="sub-title-2">Quản lí hàng tồn kho</h5>
                            <h5 className="sub-content">Kiểm soát hàng trong kho dù bạn ở đâu. Sử dụng thiết bị di động để quét, chuyển và duy trì chính xác cửa hàng trong kho.</h5>

                            <h5 className="sub-title-2">Thực hiện đơn hàng</h5>
                            <h5 className="sub-content">Chủ động trong quá trình thực hiện đơn hàng</h5>
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

export default ManageGuide;