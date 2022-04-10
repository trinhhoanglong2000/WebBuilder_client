import { GrapesjsReact } from "grapesjs-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { doSwitchStoreCssData, getInitDataStore, doSaveStoreData } from "../redux/slice/storeSlice";
import { callAPIWithPostMethod } from "../Utils/callAPI";

import "grapesjs/dist/css/grapes.min.css";
import "./dist/Canvas.css";
import "./dist/snow.css";
// import "https://cdn.quilljs.com/1.3.6/quill.snow.css"
import "./blocks/basicBlocks/index";
import "./plugins/index";
//import "./plugins/template-default.plugins";
import NavigationPanel from "./pages/NavigationPanel";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import "./Templates/template-default/template-default.plugins";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Canvas({ type }) {
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(null);
  const [listCssFile, setListCssFile] = useState([]);
  const storeId = useSelector(state => state.store.storeId);
  const storeCssData = useSelector(state => state.store.storeCssData);
  const logoURL = useSelector(state => state.store.logoURL);
  const pageId = useSelector(state => state.page.pageId);
  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };
  const getPlugins = () => {
    return ["Plugins-defaults", "template-default", "gjs-blocks-basic"];
  };

  useEffect(() => {
    $(document).ready(function () {
      $(document).on("DOMNodeInserted", function (e) {
        if ($(e.target).hasClass("gjs-off-prv")) {
          $(e.target).click(function () {
            $(".navigationPanel").removeClass("dnone");
          });
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
    //script
    head.insertAdjacentHTML('beforeend', `<script type="text/javascript" src="http://localhost:5000/files/dist/js/template-default/carousel/carousel.js"></script>
    `);
  }, [listCssFile])

  useEffect(() => {
    dispatch(getInitDataStore(storeId));
  }, [storeId]);

  useEffect(() => {
    loadStoreCss();
  }, [storeCssData]);

  const addNewStoreCss = (newStoreCssData) => {
    dispatch(doSwitchStoreCssData(newStoreCssData));
  }

  const loadStoreCss = () => {
    if (!editor) {
      return;
    }

    let domWrapper = editor.getWrapper().view;
    if (!domWrapper) {
      return
    }

    let domStoreStyle = domWrapper.el.getElementsByClassName('storeCss')[0];
    let cssContent = "";

    for (let key in storeCssData) {
      cssContent += key + " " + storeCssData[key] + " ";
    }

    if (domStoreStyle) {
      domStoreStyle.innerHTML = cssContent;
    } else {
      domWrapper.el.insertAdjacentHTML('afterbegin', `<style class="storeCss"> ${cssContent} </style>`);
    }
  }

  return (
    <>
      <GrapesjsReact
        key={pageId}
        id="grapesjs-react"
        plugins={getPlugins()}
        pluginsOpts={{
          'template-default': {
            'logoURL': logoURL,
            'addCssStore': addNewStoreCss
          }
        }}
        styleManager={
          {
            // clearProperties: true,
          }
        }
        width="100%"
        height="100vh"
        storageManager={{
          type: "remote",

          autosave: false,
          contentTypeJson: true,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
            let droppedComponent = dropped_Component;

            if (Array.isArray(droppedComponent)) {
              droppedComponent = droppedComponent[0];
            }

            if (!droppedComponent) return;
            droppedComponent.initData();

            if (droppedComponent.get("name") == "Main") return;
            let listCss = listCssFile;
            if (!listCss.includes(droppedComponent.attributes.name)) {
              listCss.push(droppedComponent.attributes.name);
            }
            setListCssFile(listCss);

            //update the canvas
          });


          editor.onReady(() => {
            // ========================== Load component css file ================================
            const listComponents = editor.Components.getComponents().models;
            let listCssFile = [];
            listComponents.forEach((ele) => {
              if (ele.attributes.name === "Main") {
                const mainComponent = ele.attributes.components.models;
                mainComponent.forEach((ele) => {
                  listCssFile.push(ele.attributes.name);
                });
              } else {
                listCssFile.push(ele.attributes.name);
              }

              if (ele.attributes.name === "Header") {
                const navbarTrait = ele.getTrait('logoImage');
              }
            })

            // ========================== Load Logo Store ================================
            if (logoURL) {
              let domWrapper = editor.getWrapper().view.el;
              const navBrandImg = domWrapper.querySelector('.navbar-brand img');

              if (navBrandImg) {
                  navBrandImg.src = logoURL;
              } else {
                  const navBrand = domWrapper.querySelector('.navbar-brand');
                  navBrand.innerHTML = `<img src="${logoURL}"/>`
              }
            }

            setListCssFile(listCssFile);
            // ========================== Load store css file ================================
            loadStoreCss();

            const style = `strong{font-weight:bold;}`;

            if (!editor.getCss().includes(style)) editor.addStyle(style);
          })
          
          editor.on("storage:end:store", async function () {
            let domWrapper = editor.getWrapper().view.el;
            let logoImage = domWrapper.querySelector('.navbar-brand img');
            
            if (logoImage) {
              await callAPIWithPostMethod("files/assets/" + storeId, { name: 'LogoImage', base64Image: logoImage.src }, true);
            }
            dispatch(doSaveStoreData());
            console.log("Save")
          })

         

          //need to update in here
        }}
        canvas={{
          styles: [
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
            "https://cdn.quilljs.com/1.3.6/quill.snow.css",
          ],
          scripts: [
            `https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js`,
            `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js`,
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
            `http://localhost:5000/files/dist/js/template-default/test.js`,
            // `http://localhost:5000/files/dist/js/template-default/template-common.js`,
         
          ],
        }}
      />
      {editor && <NavigationPanel editor={editor} />}
    </>
  );
}

export default Canvas;
