import "./index.css";
import React, { useEffect, useState, useRef } from "react";
import { DropDown_icon, Home_icon, Expanded_icon, BACK_BUTTON_ICON, Cart_icon, COLLECTION_ICON, PAGES_ICON, PRODUCTS_ICON, Star_icon, Items_icon, Others_Icons } from "../../../asset/icon/svg"
const NavigationPanel = ({ listPagesId, setLoading, setSearchParams, pageId }) => {
    const [expanded, setExpanded] = useState(false);
    const [name, setName] = useState(listPagesId.filter((ele) => ele.id === pageId)[0]?.name)
    const [menu, setMenu] = useState([])
    const refMenu = useRef(true)
    const ref = useRef({})
    function expand() {
        setExpanded(!expanded);
    }

    function close() {
        setExpanded(false);
    }
    useEffect(() => {
        listPagesId.forEach((element, index) => {

            if (element.id === pageId && !name) setName(element.name)
        })
        const NonDefaultPages = listPagesId.filter((ele) => !ele.is_default).map(ele => ({ ...ele, _icons_: Items_icon }))
        const Home = listPagesId.filter((ele) => ele.name?.toLowerCase() === "Home".toLowerCase()).map(ele => ({ ...ele, _icons_: Home_icon }))
        const Product = listPagesId.filter((ele => ele.name?.toLowerCase() === "Products".toLowerCase())).map(ele => ({ ...ele, _icons_: Star_icon }))
        const Collections = listPagesId.filter((ele => ele.name?.toLowerCase() === "Collections".toLowerCase())).map(ele => ({ ...ele, _icons_: Star_icon }))
        const Cart = listPagesId.filter((ele => ele.name?.toLowerCase() === "Cart".toLowerCase())).map(ele => ({ ...ele, _icons_: Cart_icon }))

        ref.current = {
            ...ref.current,
            'Home': Home.length ? Home[0] : [],
            'Products': Product,
            'Collections': Collections,
            'Pages': NonDefaultPages,
            'Cart': Cart.length ? Cart[0] : [],
            'Others': [],
        }
        setMenu(ref.current)
    }, [])
    //=======================FUNCTION=========================

    const handleOnchangePage = (e) => {
        close();
        Back_Function()
        if (e.currentTarget.dataset.value !== pageId) {
            setLoading(true);
            setName(e.currentTarget.dataset.name)
            setSearchParams({ pageId: e.currentTarget.dataset.value })
        }

    }
    const changeMenu = (e) => {
        refMenu.current = false
        setMenu(ref.current[e.currentTarget.dataset.value])
    }
    const Back_Function = () => {
        refMenu.current = true
        setMenu(ref.current)

    }
    const renderPagesItem = () => {
        const keys = ref.current && Object.keys(menu)
        const values = ref.current && Object.values(menu)

        const _dom = keys.map((element, index) => {
            // icon
            let icon
            if (element === "Pages") {
                icon = PAGES_ICON
            }
            else if (element === "Collections") {
                icon = COLLECTION_ICON
            }
            else if (element === "Products") {
                icon = PRODUCTS_ICON
            }
            else if (element === "Others") {
                icon = Others_Icons
            }
            return (!Array.isArray(values[index]) ?
                <li onClick={handleOnchangePage} data-name={values[index].name} data-value={values[index].id} key={values[index].id}>
                    <div style={{
                        width: '20px',
                        height: '25px',
                        minWidth: '20px',
                        marginRight: "5px",
                    }} dangerouslySetInnerHTML={{ __html: values[index]._icons_ }}>

                    </div>
                    <div className="store-name">
                        {values[index].name}

                    </div>
                </li>
                :
                <li onClick={changeMenu} key={element} data-value={element}>
                    <div style={{
                        width: '20px',
                        height: '25px',
                        minWidth: '20px',
                        marginRight: "5px",
                    }} dangerouslySetInnerHTML={{ __html: icon }}>

                    </div>
                    <div className="store-name">
                        {element}

                    </div>
                    <div style={{
                        width: '20px',
                        height: '25px',
                        minWidth: '20px',
                        marginRight: "5px",
                    }} dangerouslySetInnerHTML={{ __html: Expanded_icon }}>
                    </div>
                </li>
            )

        });
        const Back = <li onClick={Back_Function} key={'@back_key'}>
            <div style={{
                width: '20px',
                height: '25px',
                minWidth: '20px',
                marginRight: "5px",
            }} dangerouslySetInnerHTML={{ __html: BACK_BUTTON_ICON }}>

            </div>
            <div>
                {'Back'}

            </div>
        </li>
        if (keys.length === 0) {
            return [Back].concat(
                [

                    <div key={'@no_result'} className="store-name" style={{
                        padding: '10px 10px',
                        width: '100%',
                        textAlign: 'center'

                    }}>
                        {`No results`}
                    </div>


                ]
            )
        }
        return refMenu.current ? _dom : [Back].concat(_dom)
    }
    return (
        <div className="navigationPanel" id="navigationPanelPages">
            <div style={{ width: '100%', 'marginTop': '13px' }} tabIndex={0} onBlur={close}>
                <div className="navigtionWrapper btn" onMouseDown={expand}>
                    {name && <p>{name}</p>}

                    <div style={{
                        width: '30px',
                        height: '30px',
                    }} className="content" dangerouslySetInnerHTML={{ __html: DropDown_icon }}></div>

                </div>
                {/* <ul className={"dropdown-options-list"}>
                    {listPagesId && menu && renderPagesItem()}
                </ul> */}
                {expanded ? (
                    <ul className={"dropdown-options-list"}>
                        {listPagesId && menu && renderPagesItem()}
                    </ul>
                ) : null}
            </div>
        </div>
    )
}

export default NavigationPanel;