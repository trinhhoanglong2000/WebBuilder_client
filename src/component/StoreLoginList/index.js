import React from "react";
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

const StoreLoginList = ({shopName, shopLink, onClicked}) => {
    
    return (
        <>
            <div className="row mt-3 store-list m-0" onClick={() => onClicked()}>
                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <i className="fa-shopping-bag fa-icon  fa-store-login"></i>
                </div>
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <p className="font-weight-bold">{shopName}</p>
                    <p className="text-link">{shopLink}</p>
                </div>
                <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                    <i className="fa-angle-right fa-icon  fa-store-login"></i>
                </div>
            </div>

        </>
    );
}

export default StoreLoginList;