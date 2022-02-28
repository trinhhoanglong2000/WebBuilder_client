import React from "react";
import Stack from '@mui/material/Stack';
import './index.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const FooterHomePage = () => {
    return (
       <div className="row footer">
            <Stack direction="row" spacing={5} className="p-0 pb-2 first-footer">
                <Link to={'#'} className="text-footer-1 font-weight-bold"> Giới thiệu</Link>  
                <Link to={'#'} className="text-footer-1 font-weight-bold"> Sơ đồ trang web</Link>
            </Stack>
            <div className="line"></div>
            <div className="p-0 pb-2 mt-3 mobile-footer">
                <Stack direction="row" spacing={1} justifyContent="space-between">
                    <div className="p-0">
                        <p to={'#'} className="text-footer-2 font-weight-bold"> Cửa hàng trực tuyến</p>
                        <Stack direction="column" spacing={1} className="p-0 pb-2 mt-4">
                            <Link to={'#'} className="text-footer-1 "> Bán hàng trực tuyến</Link>  
                            <Link to={'#'} className="text-footer-1 "> Tính năng</Link>
                            <Link to={'#'} className="text-footer-1 "> Ví dụ</Link>
                        </Stack>
                    </div>
                    <div className="p-0 pr-2rem">
                        <p to={'#'} className="text-footer-2 font-weight-bold"> Hỗ trợ</p>
                        <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
                            <Link to={'#'} className="text-footer-1 "> Hỗ trợ 24/7</Link>  
                            <Link to={'#'} className="text-footer-1 "> Diễn đàn</Link>  
                            <Link to={'#'} className="text-footer-1 "> Tài liệu API</Link>
                        </Stack>
                    </div>
                </Stack>
                <div className="col-12 col-sm-12 p-0 pt-4">
                    <p className="text-footer-2 font-weight-bold"> EasyMall</p>  
                    <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
                        <Link to={'#'} className="text-footer-1 "> Liên hệ</Link>  
                        <Link to={'#'} className="text-footer-1 "> Chương trình đối tác</Link>
                        <Link to={'#'} className="text-footer-1 "> Chương trình liên kết</Link>  
                        <Link to={'#'} className="text-footer-1 "> Nhà phát triển ứng dụng</Link>
                        <Link to={'#'} className="text-footer-1 "> Nhà đầu tư</Link>  
                    </Stack>
                </div>
            </div>
            <div className="desktop-footer">
                <Stack direction="row" justifyContent="space-between"  spacing={2} className="p-0 pb-2 mt-3 ">
                    <div>
                        <p to={'#'} className="text-footer-2 font-weight-bold"> Cửa hàng trực tuyến</p>
                        <Stack direction="column" spacing={1} className="p-0 pb-2 mt-4">
                            <Link to={'#'} className="text-footer-1 "> Bán hàng trực tuyến</Link>  
                            <Link to={'#'} className="text-footer-1 "> Tính năng</Link>
                            <Link to={'#'} className="text-footer-1 "> Ví dụ</Link>
                        </Stack>
                    </div>
                    <div >
                        <p to={'#'} className="text-footer-2 font-weight-bold"> Hỗ trợ</p>
                        <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
                            <Link to={'#'} className="text-footer-1 "> Hỗ trợ 24/7</Link>  
                            <Link to={'#'} className="text-footer-1 "> Diễn đàn</Link>  
                            <Link to={'#'} className="text-footer-1 "> Tài liệu API</Link>
                        </Stack>
                    </div>
                    <div className="pr-2rem">
                        <p className="text-footer-2 font-weight-bold"> EasyMall</p>  
                        <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
                            <Link to={'#'} className="text-footer-1 "> Liên hệ</Link>  
                            <Link to={'#'} className="text-footer-1 "> Chương trình đối tác</Link>
                            <Link to={'#'} className="text-footer-1 "> Chương trình liên kết</Link>  
                            <Link to={'#'} className="text-footer-1 "> Nhà phát triển ứng dụng</Link>
                            <Link to={'#'} className="text-footer-1 "> Nhà đầu tư</Link>  
                        </Stack>
                    </div>
                </Stack>
            </div>
            
            <div className="line"></div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 end-footer">
                <div>
                    <i class="fab fa-linkedin-square fa-icon ml-0 fa-footer"></i>
                    <i class="fa-envelope-o fa-icon fa-footer"></i>
                    <i class="fa-facebook-square fa-icon fa-footer" ></i> 
                </div>
            </div>     
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4  offset-md-2 offset-lg-4 offset-xl-5 p-0 end-footer-right-parent">
                <div className="end-footer-right">
                    <Link to={'#'} className="text-footer-1 mr-1rem"> Điều khoản dịch vụ</Link>  
                    <Link to={'#'} className="text-footer-1 "> Chính sách quyền riêng tư</Link>  
                </div>    
            </div>
       </div>
    );
}

export default FooterHomePage;