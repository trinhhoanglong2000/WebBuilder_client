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
import { loadStoreComponents, validURL } from "../helper/utils";
import {
  getInitDataStore,
  doSaveStoreData,
  doAddTargetImage,
  doRenderImage
} from "../redux/slice/storeSlice";
import { getKeyMaps } from './configs/keymaps'
import { getStorageManager } from './configs/storageManager'
import { getEvents } from "./configs/events";
import { Customize_icon } from "../asset/icon/svg"
function Canvas({ type }) {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const pageId = searchParams.get('pageId') || "";
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true)
  const [isSaving, setIsSaving] = useState(false);
  const storeId = useParams().idStore;
  const listPagesId = useSelector(state => state.store.listPagesId);
  const template = useSelector((state) => state.store.templateName)
  const token = readCookie('token');
  const getPlugins = () => {
    return ["Plugins-defaults", "template-default"];
  };

  useEffect(() => {
    dispatch(getInitDataStore(storeId)).then(() => {
      setLoading(false);
    })
  }, [storeId]);

  const addComponentCssNJs = (editor, listCssFile) => {
    listCssFile.forEach((ele, index) => {
      let canvasDocument = editor.Canvas.getDocument();
      let header = canvasDocument.head;
      let body = canvasDocument.body;

      let addScript = function (componentName, callback = undefined) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `${process.env.REACT_APP_API_URL}js/${template}/${componentName}.js`; // use this for linked script
        script.id = componentName;
        script.className = "ScriptClass";
        if (callback != undefined) {
          script.onload = function () {
            callback();
          };
        }
        body.appendChild(script);
      }
      let addCss = function (componentName, callback = undefined) {
        let stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.type = "text/css";
        stylesheet.href = `${process.env.REACT_APP_API_URL}css/${template}/${componentName}.css`;
        stylesheet.id = `${componentName}`
        if (callback != undefined) {
          stylesheet.onload = function () {
            callback();
          };
        }
        header.appendChild(stylesheet);
      }
      if (ele && ele !== "") {

        if (index === listCssFile.length - 1) {
          addCss(ele, () => {
            setTimeout(() => {
              if (loadingPage === true)
                setLoadingPage(false);
            }, 500)
          })
          addScript(ele, () => {
          });
        } else {
          addCss(ele)
          addScript(ele);

        }
      }
    });
  }

  const addTarget64Image = (data) => {
    dispatch(doAddTargetImage(data));
  }
  const renderImage = (data) => {
    dispatch(doRenderImage(data));
  }
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
                pageId: pageId,
                headerNavigation: listPagesId,
                storeId: storeId,
                addTarget64Image: addTarget64Image,
                validURL: validURL,
                isDeloy: true,
              },
              "Plugins-defaults": {
                renderImage: renderImage,
                storeId: storeId,
              }
            }}
            width="100%"
            height="100vh"
            keymaps={getKeyMaps()}
            storageManager={getStorageManager(storeId, pageId, token)}
            blockManager={{
              appendTo: ".gjs-pn-block-container",
            }}
            //===============|Editor is here |============
            //===============|Do the event listen here|===============
            onInit={(editor) => {
              setEditor(editor);
              getEvents(editor, {
                addComponentCssNJs: addComponentCssNJs
              });
              editor.onReady(() => {
                const initStoreData = async () => {

                  await loadStoreComponents(editor, storeId)
                  // ==============================| Prevent default event | =========================
                  $(document).bind('keydown', (e) => {
                    if (e.ctrlKey && (e.which === 83 || e.which === 80)) {
                      e.preventDefault();
                      return false;
                    }
                  });
                  $(editor.Canvas.getDocument()).bind('keydown', (e) => {
                    if (e.ctrlKey && (e.which === 83 || e.which === 80)) {
                      e.preventDefault();
                      return false;
                    }
                  });
                  //====================| Collapsed block's Categories| ===========
                  const categories = editor.BlockManager.getCategories();
                  categories.each(category => {
                    category.set('open', false)
                    // .on('change:open', opened => {
                    //   opened.get('open') && categories.each(category => {
                    //     category !== opened && category.set('open', false)
                    //   })
                    // })
                  })
                  // ============================= | Init UI when not selected| =========================== 
                  const initTraitManger = `
                  <div class="d-flex flex-column pt-2">
                    ${Customize_icon}
                    <div style="border-bottom: 1px solid black;" >
                    <p class="text-left" style="font-weight:bold; font-size:18px" >Customize your templates</p>
                    
                    <p class="text-left" style="font-size:14px;margin-bottom:0.5rem">
                    Select and drag a block in the sidebar to start.</p >
                    <p class="text-left" style="font-size:14px"  > Select a component in Canvas to start editing. </p>
                    </div>
                  </div>
                  <div class = "pt-2">
                    <p class="text-left" style="font-weight:bold; font-size:18px" >Keyboard shortcuts</p>
                    <p class="text-left" style="font-size: 16px;"> <kbd>Ctrl</kbd> + <kbd>Z</kbd>, <kbd>⌘</kbd> + <kbd>Z</kbd>     Undo</p>
                    <p class="text-left" style="font-size: 16px;"> <kbd>Ctrl</kbd> + <kbd>Y</kbd>, <kbd>⌘</kbd> + <kbd>Y</kbd>     Redo</p>
                    <p class="text-left" style="font-size: 16px;"> <kbd>Ctrl</kbd> + <kbd>S</kbd>, <kbd>⌘</kbd> + <kbd>S</kbd>     Save</p>
                    <p class="text-left" style="font-size: 16px;"> <kbd>Ctrl</kbd> + <kbd>P</kbd>, <kbd>⌘</kbd> + <kbd>P</kbd>     Preview</p>
                  </div>
                  <div class = "d-flex justify-content-start mt-3" style = "font-weight: 600; font-style: italic; ">
                  EasyMall Editor Version ${process.env.REACT_APP_VERSION??'Version 1.0'}
                  </div>
                  `
                  $('.gjs-pn-views-container .gjs-trt-header').empty().append(initTraitManger)
                  // ============================= Wrapper =============================================
                  editor.getWrapper().view.el.className = 'wrapper';
                  editor.getWrapper().view.el.style.overflow = 'initial';
                  editor.getWrapper().view.el.style.overflowX = 'initial';
                  editor.Canvas.getDocument().body.insertAdjacentHTML("beforeend", `<style>  
                  * ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1) !important;
                  }
            
                  * ::-webkit-scrollbar-thumb {
                    background: rgb(0 0 0 / 26%)!important;
                  }
                  </style>`)

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
                  // Deploy template setting true
                  editor.getWrapper().set({ hoverable: false, selectable: false, highlightable: false,
                   droppable:false,
                  })

                  const style = `strong{font-weight:bold;}`;
                  if (!editor.getCss().includes(style)) editor.addStyle(style);
                  addComponentCssNJs(editor, listCssFile);
                  //bug
                  // editor.on('component:add', function (model) {
                  //   const arr = ['', 'cell', 'row', 'table', 'thead', 'tbody', 'tfoot', 'map', 'link', 'label', 'video', 'image', 'script', 'svg-in', 'svg', 'iframe', 'comment', 'textnode', 'text', 'wrapper', 'default']
                  //   if (model === undefined) return;
                  //   try {
                  //     if (arr.includes(model.get('type')) || model.get('type')==='' ){
                  //       model.remove();
                  //     }
                  //     editor.getComponents().models.forEach(ele=>{
                  //       if (arr.includes(ele.get('type')) || ele.get('type')==='' ){
                  //         ele.remove();
                  //       }
                  //     })
                  //     editor.getWrapper().viewLayer.render()
                  //   } catch (error) {

                  //   }

                  // })

                }
                initStoreData();
              });

              editor.on("storage:start:store", async function () {
                setIsSaving(true);
                let footer = editor.getComponents().where({ name: 'Footer' })[0];
                let header = editor.getComponents().where({ name: 'Header' })[0];

                let storeComponents = {
                  'header': JSON.stringify(header),
                  'header-html': header.toHTML(),
                  'footer': JSON.stringify(footer),
                  'footer-html': footer.toHTML(),
                  'asset': JSON.stringify(editor.AssetManager.getAll().models),
                }

                let domWrapper = editor.getWrapper().view.el;
                let logoImage = domWrapper.querySelector(".navbar-brand img");
                let logoSrc = (logoImage) ? logoImage.src : null;
                logoSrc = (logoSrc === "data:,") ? null : logoSrc;
                dispatch(doSaveStoreData({ storeId, logoSrc, storeComponents }));
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
          {editor && <NavigationPanel setLoading={setLoadingPage} listPagesId={listPagesId} setSearchParams={setSearchParams} pageId={pageId} />}
          {(loadingPage || isSaving) && <SaveLoad isSaving={isSaving} />}
        </>
      ) : <AvatarLoad load={true}></AvatarLoad>}
    </>
  );
}

export default Canvas;
