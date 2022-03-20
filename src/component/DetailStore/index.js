import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

import { Dropdown } from 'react-bootstrap';
import NavBarDetailStore from "../NavBarDetailStore";
import HeaderDetailStore from "../HeaderDetailStore";


import { useSelector, useDispatch } from "react-redux";
import { changeKeySelected, changeNameStoreSelected } from "../../actions/detailStore";
import { ManageSearchTwoTone } from "@mui/icons-material";
import ManageStoreProduct from "../ManageStoreProduct";
const DetailStore = ({liststore, nameAccount}) => {
    
    //use redux to manage state
    const keySelected = useSelector((state) => state.changeKeySelected);

    var callPage = () => {
        console.log(keySelected);
        switch (keySelected) {
            case 1: // Main
            
                return <div></div>

            case 2: // Order
            return <div></div>

            case 3: // Product
            return <ManageStoreProduct></ManageStoreProduct>

            case 31: // Product -> Warehouse
            return <div></div>

            case 32: // Product -> Collection
            return <div></div>

            case 33: // Product -> Gift
            return <div></div>

            case 4: // Customer
            return <div></div>

            case 5: // Analysis
            return <div></div>

            case 6: // Market
            return <div></div>

            case 7: // Discount
            return <div></div>

            case 8: // Setting
            return <div></div>

            default:
                return <div></div>
        }
    }
    return (
        <>
            <HeaderDetailStore ></HeaderDetailStore>
            <div className="row callpage" >

                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
        
                    <NavBarDetailStore  isDesktop={true}></NavBarDetailStore>
                </div> 
                <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table">     
                    <div className="row ">
                        {callPage()}
                    </div>
                </div> 
            </div>       
        </>
    );
}

export default DetailStore;