import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doSwitchPage } from "../../../redux/slice/pageSlice";
import { doSwitchLoginState } from "../../../redux/slice/loginSlice";
import "./index.css";

const NavigationPanel = () => {
    const dispatch = useDispatch();
    const [pages, setPages] = useState(null);
    const pageId = useSelector(state => state.page.pageId);

    useEffect(() => {
        getPages();
    }, []);
    
    const getPages = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

        let storeId = "621b5a807ea079a0f7351fb8";
        fetch(process.env.REACT_APP_API_URL + "stores/" + storeId+ "/pages", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw response.status;
            })
            .then(result => {
                setPages(result.data);
            })
            .catch((errorCode) => {
                if (errorCode === 401) {
                    dispatch(doSwitchLoginState(false));
                }
            })
    }

    //=======================FUNCTION=========================
    const handleOnchangePage = (e) => {
        dispatch(doSwitchPage(e.target.value));
    }

    const renderPagesItem = () => {
        return pages.map((ele) => { return <option value={ele.id} key={ele.id}> {ele.name} </option> });
    }

    return (
        <div className="navigationPanel">
            <label>Pages: 
                <select name="pages" id="pages" value={pageId} onChange={handleOnchangePage}>
                    {pages && renderPagesItem()}
                </select>
            </label>
        </div>
    )
}

export default NavigationPanel;