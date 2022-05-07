import { GrapesjsReact } from "grapesjs-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import $ from "jquery";
import "grapesjs/dist/css/grapes.min.css";

import "./dist/Canvas.css";
import "./dist/snow.css";
import "./blocks/basicBlocks/index";
import "./plugins/index";
import NavigationPanel from "./pages/NavigationPanel";
import "./Templates/template-default/template-default.plugins";
import AvatarLoad from '../components/AvatarLoad/AvatarLoad'
import SaveLoad from '../components/SaveLoad/SaveLoad'
import { readCookie } from './../helper/cookie';
import { getTraitStoreEffect } from "../helper/utils";
import {
  doAddStoreTraitData,
  getInitDataStore,
  doSaveStoreData,
} from "../redux/slice/storeSlice";

function Canvas({ type }) {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const pageId = searchParams.get('pageId') || "";
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false)
  const storeId = useParams().idStore;
  const listPagesId = useSelector(state => state.store.listPagesId);
  const storeTraitData = useSelector((state) => state.store.storeTraitData);
  const logoURL = useSelector((state) => state.store.logoURL);
  const template = useSelector((state) => state.store.templateName)
  const token = readCookie('token');

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
    dispatch(getInitDataStore(storeId)).then(()=>{
      setLoading(false);
    })
  }, [storeId]);

  useEffect(() => {
    loadStoreTraitEffect(editor);
  }, [storeTraitData]);

  const addNewStoreTrait = (newStoreTraitData) => {
    dispatch(doAddStoreTraitData(newStoreTraitData));
  };

  const addComponentCssNJs = (editor, listCssFile) => {
    listCssFile.forEach((ele) => { 
      let canvasDocument = editor.Canvas.getDocument();
      let header = canvasDocument.head;
      let body = canvasDocument.body;

      let addScript = function (componentName) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `http://localhost:5000/files/dist/js/${template}/${componentName}.js`; // use this for linked script
        script.id = componentName;
        script.className = "ScriptClass";

        body.appendChild(script);
      }

      if (ele && ele !== "") {
        header.insertAdjacentHTML(
          "beforeend",
          `<link id="${ele}" href="http://localhost:5000/files/dist/css/${template}/${ele}.css" rel="stylesheet">`
        );
        addScript(ele);
      }
    });
  }

  const loadStoreTraitEffect = (e = null) => {
    const editor = e ?? null;
    if (!editor) {
      return;
    }

    let domWrapper = editor.getWrapper().view;
    if (!domWrapper) {
      return;
    }

    let domStoreStyle = domWrapper.el.getElementsByClassName("storeCss")[0];
    let cssContent = getTraitStoreEffect(domWrapper, storeTraitData);

    if (domStoreStyle) {
      domStoreStyle.innerHTML = cssContent;
    } else {
      domWrapper.el.insertAdjacentHTML("afterbegin", `<style class="storeCss"> ${cssContent} </style>`);
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <GrapesjsReact
            key={pageId}
            id="grapesjs-react"
            plugins={getPlugins()}
            pluginsOpts={{
              "template-default": {
                logoURL: logoURL,
                pageId: pageId,
                headerNavigation: listPagesId,
                addCssStore: addNewStoreTrait,
                storeId: storeId,
                
              },
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
                Authorization: `Bearer ${token}`,
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

                if (typeof droppedComponent.initData === "function") {
                  droppedComponent.initData();
                }

                let header = editor.Canvas.getDocument().head;
                let componentCss = header.querySelector(`#${droppedComponent.attributes.name}`)

                if (!componentCss) {
                  addComponentCssNJs(editor, [componentCss]);
                }
              });

              editor.onReady(() => {
                // setEditor(editor);
                setIsSaving(false)
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
                });
                addComponentCssNJs(editor, listCssFile);
                // ========================== Load store css file ================================
                loadStoreTraitEffect(editor);
                editor.getWrapper().set({hoverable :false,selectable:false,highlightable :false})

                const style = `strong{font-weight:bold;}`;
                if (!editor.getCss().includes(style)) editor.addStyle(style);
              });

              editor.on("storage:start:store", async function () {
                setIsSaving(true);
                let domWrapper = editor.getWrapper().view.el;
                let logoImage = domWrapper.querySelector(".navbar-brand img");

                if (logoImage.src === logoURL) {
                  logoImage = null;
                }

                dispatch(doSaveStoreData({storeId, logoImage}));
              });

              editor.on("storage:end:store", function () {
                setIsSaving(false);
              });


            }}
            canvas={{
              styles: [
                "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
                "https://cdn.quilljs.com/1.3.6/quill.snow.css",
              ],
              scripts: [
                `https://code.jquery.com/jquery-3.6.0.js`,
                `https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js`,
                "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
              ],
            }}
          />
          {editor && <NavigationPanel setLoading={setIsSaving} listPagesId={listPagesId} setSearchParams={setSearchParams} pageId={pageId}/>}
          {isSaving && <SaveLoad open={isSaving} />}
        </>
      ) : <AvatarLoad load={true}></AvatarLoad>}
    </>
  );
}

export default Canvas;
