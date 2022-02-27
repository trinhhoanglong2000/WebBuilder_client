import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

import { Dropdown } from 'react-bootstrap';
import StoreLoginList from "../StoreLoginList";
const StoreLogin = ({liststore, nameAccount}) => {
    const [isCreateStore, setIsCreateStore] = useState(false);
    nameAccount = "TP";
    liststore = [{
        shopName: "TpLapTop",
        shopLink: "check.com"
    }, {
        shopName: "TpLapTop1",
        shopLink: "check.com1"
    }, {
        shopName: "TpLapTop2",
        shopLink: "check.com2"
    }, {
        shopName: "TpLapTop3",
        shopLink: "check.com3"
    }, {
        shopName: "TpLapTop4",
        shopLink: "check.com4"
    }, {
        shopName: "TpLapTop5",
        shopLink: "check.com5"
    }]
    const [listStoreShow, setListStoreShow] = useState(liststore);
    const emailAccount = "Yooooo@gmail.com";
    const handleOnchangeSearch = (e) => {
        
        const newListSearch = [];
        liststore.map((store) => {
            if (store.shopName.includes(e.target.value) || store.shopLink.includes(e.target.value)) {
                newListSearch.push(store);
            }

        })
        setListStoreShow([...newListSearch]);

    }
    return (
        <div className="bgImg">
            <div>
                <Grid>
                    <Paper elevation={10}  className="paper-style">
                        <div className="row">
                            <div className=" col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Stack direction="row" spacing={0 } >  
                                    <Avatar
                                        src={process.env.PUBLIC_URL + '/img/Logo.png'}
                                        style={{ height: '4.25rem', width: '4.25rem' }}
                                    /> 
                                    <Typography component={'span'} ><h5 className="mt-3 font-weight-bold">EASY MALL</h5></Typography>
                                </Stack>      
                            </div>     
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Dropdown className="float-right dropdown-store-login p-0 pt-1">
                                    <Dropdown.Toggle id="dropdown-basic">       
                                        <i className="fa-angle-down fa-icon  float-right fa-store-login"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#"> <p className="text-nav">Giá cước</p></Dropdown.Item>
                                        <Dropdown.Item href="#"><p className="text-nav">Tìm hiểu</p></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className="circle  float-right">
                                    <p className="pt-1">{nameAccount}</p>
                                </div>
                            </div>
                        </div>
                        {!isCreateStore ? 
                            <div>
                                <div className="row mt-5">
                                    <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                        <h5 className="text-store">Các cửa hàng của bạn</h5>    
                                    </div>     
                                    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                        
                                        <button className="btn btn-success btn-create-store float-right" onClick={() => setIsCreateStore(true)}> <p className="text-btn-login"> Tạo cửa hàng </p></button>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <TextField name='findstore' className="find-store" placeholder='&#xf002; Tìm Kiếm' fullWidth onChange={handleOnchangeSearch}/>
                                    <div className="row find-store p-0" >
                                        {listStoreShow.map((store, index) => (
                                        <StoreLoginList shopName={store.shopName} shopLink={store.shopLink} key={index}></StoreLoginList>
                                        ))}
                                    </div>
                                    
                                </div>
                                
                            </div>
                        : 
                        <div>
                            <div className="row mt-5">  
                                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                        <i className="fa-angle-left fa-icon  float-right fa-store-login" onClick={() => setIsCreateStore(false)}></i>
                                    </div>   
                                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pt-3">                      
                                        <h5 className="font-weight-bold text-create-store">Tạo Cửa Hàng</h5>
                                    </div>    
                                </div>
                                <div className="row create-store-connect">  
                                    <p className="text-create-store-2">Cửa hàng này được tạo và kết nối bởi {emailAccount}, và được sử dụng miến phí trong vòng 14 ngày</p> 
                                </div>
                                <div className="row mt-1">
                                    <TextField name='create-store' className="find-store"  placeholder='Tên cửa hàng' fullWidth/>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-8   div-button-create-store pt-5">
                                        <button className="btn btn-success btn-create-store" onClick={() => setIsCreateStore(true)}> <p className="text-btn-login"> Tạo cửa hàng </p></button>
                                    </div>  
                               </div>
                        </div>
                        }
                        
                    </Paper>
                </Grid>
            </div>
        </div>
    );
}

export default StoreLogin;