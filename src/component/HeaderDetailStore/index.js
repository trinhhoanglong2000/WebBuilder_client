import React from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import {Navbar, Container, Offcanvas, Nav, NavDropdown} from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap';
import NavBarDetailStore from "../NavBarDetailStore";

import { useSelector, useDispatch } from "react-redux";
import {  changeNameStoreSelected, changeListStore } from "../../actions/detailStore";
const HeaderDetailStore = ({nameStore, nameAccount, listStore}) => {
    //use redux to manage state
    const dispatch = useDispatch();
    var nameStore = useSelector((state) => state.changeNameStoreSelected);
    var changeNameStoreSelectedCall = (name) => {
        dispatch(changeNameStoreSelected(name));
    }
    nameAccount = "TP";
    var listStoreInStore = useSelector((state) => state.changeListStore);
    var changeListStoreCall = (list) => {
        dispatch(changeListStore(list));
    }
    var listStore = listStoreInStore;
    return (
        <>
        
            <div className="row logo desktop">
                        <div className=" col-md-3 col-lg-3 col-xl-3 mt-1">
                            <Stack direction="row" spacing={0} >  
                                <Avatar
                                    src={process.env.PUBLIC_URL + '/img/Logo.png'}
                                    style={{ height: '4rem', width: '4rem' }}
                                /> 
                                <Typography component={'span'} ><p className="mt-3 font-weight-bold mr-0-3rem">{nameStore}</p></Typography>
                                <Dropdown className="float-right dropdown-store-detail p-0">
                                    <Dropdown.Toggle id="dropdown-basic">       
                                        <i className="fa-angle-down fa-icon  float-right fa-store-detail"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                            {listStore ? listStore.map((store, index) => (
                                                <div onClick={() => changeNameStoreSelectedCall(store.name)}>
                                                    <Dropdown.Item href="#" key={index}> <p className="text-nav m-0">{store.name}</p> <p >{store.storeLink}</p> </Dropdown.Item>
                                                </div>
                                            )):
                                            ""}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Stack>        
                        </div>  
                        <div className=" col-md-6 col-lg-7 col-xl-7 mt-3">
                            <TextField name='findstore' className="find-store" placeholder='&#xf002; Tìm Kiếm' fullWidth />  
                        </div>    
                        <div className="col-md-3 col-lg-2 col-xl-2  ">
                                <div>
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
                        
            </div>
            <div className="row logo mobile">
                        <div className=" col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2 mt-1 button-header-mobile">
                            
                            <Navbar bg="none" expand={false} className="navbar-header-mobile pt-2">
                                <Container fluid className="navbar-header-mobile ">
                                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                                    <Navbar.Offcanvas
                                    id="offcanvasNavbar"
                                    aria-labelledby="offcanvasNavbarLabel"
                                    placement="end"
                                    backdropClassName="mobile"
                                    className="mobile"
                                    >
                                        <Offcanvas.Header closeButton >
                                            <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body >
                                            <NavBarDetailStore isDesktop={false}></NavBarDetailStore>
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </Container>
                            </Navbar>
                        </div>  
                        <div className=" col-9 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-3">
                            <TextField name='findstore' className="find-store" placeholder='&#xf002; Tìm Kiếm' fullWidth />  
                        </div>    
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  button-header-mobile">
                                <div>
                                    <Dropdown className="float-right dropdown-store-login p-0 pt-1 ">
                                        <Dropdown.Toggle id="dropdown-basic" className="navbar-header-mobile pt-1">       
                                            <i className="fa-angle-down fa-icon  float-right fa-store-login "></i>
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
                        
            </div>
        </>
    );
}

export default HeaderDetailStore;