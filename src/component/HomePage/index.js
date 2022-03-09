import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import FooterHomePage from "../FooterHomepage";
const HomePage = () => {
    
    return (
       <>
            <NavBar/>
            <div className="homepage">
                <div className="row first-slide p-0 m-0">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 p-0 pb-4 padding-img-first-slide order-mobile-2">
                        <img alt="img" src="/img/FirstSlideHomePage.png" className="img-first-slide-homepage"/>
                    </div>
                    <div className="col-12 col-sm-12  col-md-5 col-lg-5 col-xl-5 first-slide-part2 p-0 order-mobile-1">
                        <h5 className="text-first-slide">Khởi sự kinh doanh online</h5>
                        <button className="btn btn-first-slide mt-4" > <p className="text-btn-first-slide"> Tìm hiểu thêm </p></button>
                    </div>
                </div>
                <div className="second-slide">
                    <div className=" row p-0 m-0 pt-4 pb-4">
                        <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                            <img alt="img" src="/img/FoodDrink.png" className="img-second-slide-homepage"/>
                            <h5 className="font-weight-bold text-second-slide-1">Thực phẩm và đồ uống</h5>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                            <img alt="img" src="/img/Fashion.png" className="img-second-slide-homepage"/>
                            <h5 className="font-weight-bold  text-second-slide-1">Thời trang</h5>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 offset-3 offset-sm-3 offset-md-0 offset-lg-0 offset-xl-0 padding-mobile">
                            <img alt="img" src="/img/furniture.png" className="img-second-slide-homepage"/>
                            <h5 className="font-weight-bold  text-second-slide-1">Nội thất và nhà cửa</h5>
                        </div>
                    </div>
                    <div className="row  text-align-center pb-1 pt-2">
                        <h5 className="font-weight-bold text-second-slide-2">Đưa ra các lựa chọn lí tưởng nhất</h5>
                        
                    </div>
                    <div className=" row  m-0 column4-second-slide">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <i className="fab fa-shopping-bag fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">Kinh doanh Online</h5>
                            <h5 className=" text-second-slide-3">Tạo cơ sở kinh doanh, dù bạn vừa nảy ra ý tưởng sáng tạo hay đang tìm cách thức kiếm tiền mới</h5>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            
                            <i className="fab fa-globe fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">Đưa cơ sở lên mạng</h5>
                            <h5 className="text-second-slide-3">Biến cửa hàng bán lẻ của bạn thành cửa hàng online và tiếp tục phục vụ khách hàng mà không bị gián đoạn</h5>
                        
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <i className="fab fa-refresh fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">Chuyển sang EasyMall</h5>
                            <h5 className="text-second-slide-3">Đưa cơ sở kinh doanh của bạn lên Triple L, bất kể bạn hiện đang sử dụng nền tảng thương mại điện tử nào</h5>
                        
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <i className="fab fa-users fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">Thuê chuyên gia EasyMall</h5>
                            <h5 className="text-second-slide-3">Thiết lập cửa hàng với sự giúp đỡ của một người làm tự do hay đại lí đáng tin cậy từ Trung tâm chuyên gia Triple L</h5>
                        
                        </div>
                    </div>
                    
                </div>
                
                <div className="row text-align-center pt-5">
                    <h4 className="font-weight-bold">Tại sao chọn chúng tôi?</h4>
                    <div className="row pt-4">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-6 offset-xl-3 offset-lg-2 offset-md-2 offset-sm-1 offset-0">
                            <h5 className="text-why-not">Một nền tảng có mọi tính tương mại điện tử va điểm bán hàng bạn cần để khởi đầu, vận hành và phát triển công việc kinh doanh</h5>
                        </div>
                    </div>
                </div>
                <div className="third-slide mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 order-third-slide-2">
                            <img alt="img" src="/img/third-slide-3.png" className="third-slide-3-left"/>  
                        </div>
                        <div className="col-12 col-sm-12  col-md-12 col-lg-7 col-xl-7 order-third-slide-1 pt-3 part-2-third-slide pl-4rem">
                            <h5 className="header-text-third-slide">Bán hàng ở mọi nền tảng</h5>
                            <h5 className="text-1rem pb-3">Sử dụng một nền tảng để bán sản phẩm ở bất kì đâu, cho bất kì đối tượng nào và tại bất kì thiết bị nào. Bán sản phẩm trực tiếp và online qua trang web, truyền thông xã hội và thị trường online</h5>
                            <Link to={"#"} className="link-third-slide">Khám phá những kênh bán hàng </Link>
                        </div>
                    </div>
                    <div className="row  third-slide-middle">
                        <div className="col-12 col-sm-12  col-md-12 col-lg-7 col-xl-7 part-2-third-slide pt-4rem pl-4rem" >
                            <h5 className="header-text-third-slide">Tiếp thị doanh nghiệp của bạn</h5>
                            <h5 className="text-1rem pb-3">Không còn phải phỏng đoán khi tiếp thị nhờ những công cụ tích hợp giúp bạn tạo, thực thi và phân thích các chiến dịch tiếp thị kĩ thuật số.</h5>
                            <Link to={"#"}  className="link-third-slide ">Khám phá cách tiếp thị cho hoạt động kinh doanh </Link>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 order-third-slide-2 third-slide-3-right-parent">
                            <img alt="img" src="/img/third-slide-2.png" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 order-third-slide-2">
                            <img alt="img" src="/img/third-slide-1.png" className="third-slide-3-left"/>
                        </div>
                        <div className="col-12 col-sm-12  col-md-12 col-lg-7 col-xl-7 part-2-third-slide pl-4rem">
                            <h5 className="header-text-third-slide">Quản lí mọi thứ</h5>
                            <h5 className="text-1rem pb-3">Nắm bắt thông tin chi tiết bạn cần để phát  triển - sử dụng một trang quản trị duy nhất để quản lí đơn hàng, vận chuyển và thanh toán dù bạn ở bất kì nơi đâu</h5>
                            <Link to={"#"}  className="link-third-slide ">Khám phá cách quản lí hoạt động kinh doanh </Link>
                        </div>
                    </div>
                </div>
                <div className="end-slide ">
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

export default HomePage;