import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doSwitchPage } from "../../../redux/slice/pageSlice";
import "./index.css";

const NavigationPanel = () => {
    const dispatch = useDispatch();
    const listPagesId = useSelector(state => state.store.listPagesId);
    const pageId = useSelector(state => state.page.pageId);
    
    //=======================FUNCTION=========================
    const handleOnchangePage = (e) => {
        dispatch(doSwitchPage(e.target.value));
    }

    const renderPagesItem = () => {
        return listPagesId.map((ele) => { return <option value={ele.id} key={ele.id}> {ele.name} </option> });
    }

    return (
        <div className="navigationPanel">
            <label>Pages: 
                <select name="pages" id="pages" value={pageId} onChange={handleOnchangePage}>
                    {listPagesId && renderPagesItem()}
                </select>
            </label>
        </div>
    )
}

export default NavigationPanel;