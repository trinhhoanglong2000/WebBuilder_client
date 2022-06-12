import "./index.css";

const NavigationPanel = ({listPagesId, setLoading, setSearchParams,  pageId}) => {

    //=======================FUNCTION=========================
    const handleOnchangePage = (e) => {
        setLoading(true);
        
        setSearchParams({pageId:  e.target.value})
    }

    const renderPagesItem = () => {
        return listPagesId.map((element) => { return <option value={element.id} key={element.id}> {element.name} </option> });
    }

    return (
        <div className="navigationPanel" id="navigationPanelPages">
            <label>Pages: 
                <select name="pages" id="pages" value={pageId} onChange={handleOnchangePage}>
                    {listPagesId && renderPagesItem()}
                </select>
            </label>
        </div>
    )
}

export default NavigationPanel;