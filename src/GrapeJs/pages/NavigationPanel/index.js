import "./index.css";
import React, { useState } from "react";
import { DropDown_icon, Home_icon } from "../../../asset/icon/svg"
const NavigationPanel = ({ listPagesId, setLoading, setSearchParams, pageId }) => {
    const [expanded, setExpanded] = useState(false);
    const [name, setName] = useState(listPagesId.filter((ele) => ele.id === pageId)[0]?.name)

    function expand() {
        setExpanded(true);
    }

    function close() {
        setExpanded(false);
    }

    //=======================FUNCTION=========================
    const handleOnchangePage = (e) => {

        close();

        setLoading(true);
        setName(e.target.dataset.name)
        setSearchParams({ pageId: e.target.dataset.value })

    }

    // const renderPagesItem = () => {
    //     return listPagesId.map((element) => { return <option value={element.id} key={element.id}> {element.name} </option> });
    // }
    const renderPagesItem = () => {
        return listPagesId.map((element) => {
            if (element.id === pageId && !name) setName(element.name)
            return <li onClick={handleOnchangePage} data-name={element.name} data-value={element.id} key={element.id}>
                <div style={{
                    width: '25px',
                    height: '25px',
                }} dangerouslySetInnerHTML={{ __html: Home_icon }}>

                </div> 
                <div>
                {element.name}

                </div>
            </li>
        });
    }
    return (
        <div className="navigationPanel" id="navigationPanelPages">
            <div style={{ width: '100%', 'marginTop': '13px' }} tabIndex={0} onMouseDown={expand} onBlur={close}>
                <div className="navigtionWrapper btn" >
                    {name && <p>{name}</p>}

                    <div style={{
                        width: '30px',
                        height: '30px',
                    }} className="content" dangerouslySetInnerHTML={{ __html: DropDown_icon }}></div>
                   
                </div>
                {/* <ul className={"dropdown-options-list"}>
                        {listPagesId && renderPagesItem()}
                    </ul> */}
                {expanded ? (
                    <ul className={"dropdown-options-list"}>
                        {listPagesId && renderPagesItem()}
                    </ul>
                ) : null}
                {/* <select name="pages" id="pages" value={pageId} onChange={handleOnchangePage}>
                {listPagesId && renderPagesItem()}
            </select> */}

            </div>
        </div>
    )
}

export default NavigationPanel;