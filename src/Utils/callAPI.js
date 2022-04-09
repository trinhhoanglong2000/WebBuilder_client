import { useDispatch } from "react-redux";
import { doSwitchLoginState } from "../redux/slice/loginSlice";

const callAPIWithGetMethod = async(pathURL, bearTokenFlg) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (bearTokenFlg) {
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    } 
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let fetchResult;
    await fetch(process.env.REACT_APP_API_URL + pathURL, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw Error(response.status);
        })
        .then(result => {
            fetchResult = result;
        })
        .catch((errorCode) => {
            if (errorCode === 401) {
                const dispatch = useDispatch();
                dispatch(doSwitchLoginState(false));
            } else {
                fetchResult = { 'ok': false, 'errorCode': errorCode };
            }
        })

    return fetchResult;
}


const callAPIWithPostMethod = async(pathURL, data, bearTokenFlg) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (bearTokenFlg) {
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    } 

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

  
    let fetchResult;
    await fetch(process.env.REACT_APP_API_URL + pathURL, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw Error(response.status);
        })
        .then(result => {
            fetchResult = result;
        })
        .catch((errorCode) => {
            if (errorCode === 401) {
                const dispatch = useDispatch();
                dispatch(doSwitchLoginState(false));
            } else {
                fetchResult = { 'ok': false, 'errorCode': errorCode };
            }
        })

    return fetchResult;
}

export { callAPIWithGetMethod, callAPIWithPostMethod };