
import { useState, useEffect } from "react";
import "./index.css";

const NavigationPanel = ( {editor} ) => {
    const [pages, setPages] = useState(null);

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
          fetch(process.env.REACT_APP_API_URL + "pages/" + storeId, requestOptions)
                .then(response => {
                  console.log(response);
                    if (response.ok) {
                        return response.json();
                    }
    
                    throw Error(response.status);
                })
                .then(result => {
                    setPages(result.data);
                    result.data && initPages(result.data);
                })
      }

    //=======================FUNCTION=========================
    const handleOnchangePage = (e) => {
        const somePage = editor.Pages.get(e.target.value);
        editor.Pages.select(somePage);
    }

    const renderPagesItem = () => {
        return pages.map((ele) => { return <option value={ele._id} key={ele._id}> {ele.name} </option> });
    }

    const initPages = (pages) => {
        pages.forEach(ele => {
            editor.Pages.add({
                id: ele._id,
                component: `<div>${ele.name}</div>`
            });
        });

        const somePage = editor.Pages.get(pages[0]._id);
        editor.Pages.select(somePage);
    }

    return (
        <div className="navigationPanel">
            <label>Pages: 
                <select name="pages" id="pages" onChange={handleOnchangePage}>
                    {pages && renderPagesItem()}
                </select>
            </label>
        </div>
    )
}

export default NavigationPanel;