import { GrapesjsReact } from "grapesjs-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "grapesjs/dist/css/grapes.min.css";
import "./dist/Canvas.css";

import "./blocks/basicBlocks/index";
import "./plugins/index";
//import "./plugins/template-default.plugins";
import NavigationPanel from "./pages/NavigationPanel";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import "./Templates/template-default/template-default.plugins"

function Canvas({ type }) {
  const [editor, setEditor] = useState(null);
  const [listCssFile, setListCssFile] = useState([]);
  const storeId = useSelector(state => state.store.storeId);
  const pageId = useSelector(state => state.page.pageId);

  const getPlugins = () => {
    return ["Plugins-defaults", "template-default", "gjs-blocks-basic"];
  };

  useEffect(() => {
    $(document).ready(function () {

      $(document).on('DOMNodeInserted', function (e) {
        if ($(e.target).hasClass('gjs-off-prv')) {
          $(e.target).click(function () {
            $(".navigationPanel").removeClass("dnone");
          })
        }
      });

    });

  }, []);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const head = editor.Canvas.getDocument().head;

    listCssFile.forEach((ele) => {
      head.insertAdjacentHTML('beforeend', `<link href="http://localhost:5000/files/dist/css/components/${ele}.css" rel="stylesheet">`);
    })

    head.insertAdjacentHTML('beforeend', `<link href="https://ezmall-bucket.s3.ap-southeast-1.amazonaws.com/css/621b5a807ea079a0f7351fb8.css" rel="stylesheet">`);

  }, [listCssFile])

  const saveStoreCssData = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: data
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_API_URL + "stores/css/" + storeId, requestOptions)
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response.json();
        }

        throw Error(response.status);
      })
      .then(result => {
        console.log(result.message);
      })
      .catch(error => {
        console.log('error', error)

      });
  }

  return (
    <>
      <GrapesjsReact
        key={pageId}
        id="grapesjs-react"
        plugins={getPlugins()}
        pluginsOpts={{}}
        styleManager={
          {
            // clearProperties: true,
          }
        }
        width="100%"
        height="100vh"
        storageManager={{
          type: 'remote',

          autosave: false,
          contentTypeJson: true,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          id: "",
          urlStore: `${process.env.REACT_APP_API_URL}stores/${storeId}/${pageId}/content`,
          urlLoad: `${process.env.REACT_APP_API_URL}stores/${storeId}/${pageId}/content`,
        }}
        blockManager={{
          appendTo: ".gjs-pn-block-container",
        }}
        //===============|Editor is here |============
        //===============|Do the event listen here|===============
        onInit={(editor) => {
          setEditor(editor);

          editor.on("block:drag:stop", function (dropped_Component) {
            console.log(dropped_Component);
            let droppedComponent = dropped_Component;

            if (Array.isArray(droppedComponent)) {
              droppedComponent = droppedComponent[0];
            }

            if (!droppedComponent) return;

            if (droppedComponent.attributes.name === "Carousel") {
              droppedComponent.set({
                content: droppedComponent.attributes.content.replace(
                  /myCarousel/g,
                  `A${uuidv4()}`
                ),
              });
            }
            if (droppedComponent.attributes.components) {
              droppedComponent.attributes.components.models.forEach(function (
                item
              ) {
                //check product//
                if (item.attributes.name === "Products") {
                  item.set({
                    content: item.attributes.content.replace(
                      /myCarousel/g,
                      `A${uuidv4()}`
                    ),
                  });
                }
              });
            }

            let listCss = listCssFile;
            if (!listCss.includes(dropped_Component.attributes.name)) {
              listCss.push(dropped_Component.attributes.name);
            }
            setListCssFile(listCss);

            //update the canvas
          });

          editor.onReady(() => {
            // ========================== Load component css file ================================
            const listComponents = editor.Components.getComponents().models;
            let listCssFile = [];
            listComponents.forEach(ele => {
              if (ele.attributes.name === "Main") {
                const mainComponent = ele.attributes.components.models;
                mainComponent.forEach((ele) => {
                  listCssFile.push(ele.attributes.name);
                })
              } else {
                listCssFile.push(ele.attributes.name);
              }
            })

            setListCssFile(listCssFile);
          })
          editor.on("storage:end:store", function () {
            let domWrapper = editor.getWrapper().view.el;
            let domStoreStyle = domWrapper.getElementsByClassName('storeCss');
            let data = "";
            

            if (domStoreStyle) {
              for (let i = 0; i < domStoreStyle.length; i++) {
                data += domStoreStyle[i].innerHTML;
              }
            }

            console.log(data);
            saveStoreCssData(data);
          })
          //need to update in here
        }}
        canvas={{
          styles: [
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
            `http://localhost:5000/files/dist/css/template-default/template-default.css`,
          ],
          scripts: [
            `https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js`,
            `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js`,
            `//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js`,
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
            `http://localhost:5000/files/dist/js/template-default/test.js`,
          ],
        }}
      />
      {editor && <NavigationPanel editor={editor} />}
    </>
  );
}

export default Canvas;