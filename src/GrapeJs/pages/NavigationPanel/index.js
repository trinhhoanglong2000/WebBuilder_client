import { useDispatch, useSelector } from "react-redux";
import { doSwitchPage } from "../../../redux/slice/pageSlice";
import "./index.css";

const NavigationPanel = ({listPagesId,setLoading}) => {
    const dispatch = useDispatch();
    const pageId = useSelector(state => state.page.pageId);

    //=======================FUNCTION=========================
    const handleOnchangePage = (e) => {
        setLoading(true);
        dispatch(doSwitchPage(e.target.value));
    }

    const renderPagesItem = () => {
        return listPagesId.map((element) => { return <option value={element.id} key={element.id}> {element.name} </option> });
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