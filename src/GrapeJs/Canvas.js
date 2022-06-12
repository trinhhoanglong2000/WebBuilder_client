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
import { Customize_icon } from "../asset/icon/svg"
import Swal from 'sweetalert2'
import { ContactSupportOutlined } from "@mui/icons-material";
import {
  cmdTogglePreview,
  save
} from "./const";
function Canvas({ type }) {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const pageId = searchParams.get('pageId') || "";
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false)
  const storeId = useParams().idStore;
  const listPagesId = useSelector(state => state.store.listPagesId);
  const logoURL = useSelector((state) => state.store.logoURL);
  const template = useSelector((state) => state.store.templateName)
  const token = readCookie('token');

  const Swal = require('sweetalert2')

  const getPlugins = () => {
    return ["Plugins-defaults", "template-default"];
    // return ["Plugins-defaults", "template-default", "gjs-blocks-basic"];
  };

  useEffect(() => {
    dispatch(getInitDataStore(storeId)).then(() => {
      setLoading(false);
    })
  }, [storeId]);

  const addComponentCssNJs = (editor, listCssFile) => {
    listCssFile.forEach((ele) => {
      let canvasDocument = editor.Canvas.getDocument();
      let header = canvasDocument.head;
      let body = canvasDocument.body;

      let addScript = function (componentName) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `${process.env.REACT_APP_API_URL}js/${template}/${componentName}.js`; // use this for linked script
        script.id = componentName;
        script.className = "ScriptClass";

        body.appendChild(script);
      }
      if (ele && ele !== "") {
        header.insertAdjacentHTML(
          "beforeend",
          `<link id="${ele}" href="${process.env.REACT_APP_API_URL}css/${template}/${ele}.css" rel="stylesheet">`
        );
        addScript(ele);
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
                logoURL: logoURL,
                pageId: pageId,
                headerNavigation: listPagesId,
                storeId: storeId,
                addTarget64Image: addTarget64Image,
                validURL: validURL
              },
              "Plugins-defaults": {
                renderImage: renderImage
              }
            }}
            styleManager={
              {
                // clearProperties: true,
              }
            }
            width="100%"
            height="100vh"
            keymaps={{
              defaults: {
                'core:undo': {
                  keys: '⌘+z, ctrl+z',
                  handler: 'core:undo',
                },
                'core:redo': {
                  keys: '⌘+y, ctrl+y',
                  handler: 'core:redo',
                },
                'core:copy': {
                  keys: '⌘+c, ctrl+c',
                  handler: 'core:copy',
                },
                'core:paste': {
                  keys: '⌘+v, ctrl+v',
                  handler: 'core:paste',
                },
                'core:save': {
                  keys: '⌘+s, ctrl+s',
                  handler: save,
                },
                'core:save': {
                  keys: '⌘+p, ctrl+p',
                  handler: cmdTogglePreview,
                },
                'core:component-next': {
                  keys: 's',
                  handler: 'core:component-next',
                },
                'core:component-prev': {
                  keys: 'w',
                  handler: 'core:component-prev',
                },
                'core:component-enter': {
                  keys: 'd',
                  handler: 'core:component-enter',
                },
                'core:component-exit': {
                  keys: 'a',
                  handler: 'core:component-exit',
                },
                'core:component-delete': {
                  keys: 'backspace, delete',
                  handler: 'core:component-delete',
                  opts: { prevent: 1 },
                },
              },
            }}
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
              editor.on('run:preview', () => {
                $("#navigationPanelPages").addClass("dnone");
              })
              editor.on('stop:preview', () => {
                $("#navigationPanelPages").removeClass("dnone");
              })
              editor.on('stop:open-tm stop:open-layers', () => {
                if (!editor.Commands.isActive('open-tm') && !editor.Commands.isActive('open-layers')){
                  $('.gjs-pn-panel.gjs-pn-views-container >div:first-child > div:nth-child(2)').css('display','block')
                }
              })
              editor.on('run:open-layers', () => {
                $('.gjs-pn-panel.gjs-pn-views-container >div:first-child > div').css('display','none')
              })
              editor.on('undo', (some, argument) => {
                // do something
                if (editor.getSelected()) {
                  editor.getSelected().getTraits().forEach(ele => {
                    ele.view.onUpdate({ elInput: ele.el, component: editor.getSelected() })
                  })
                }
              })
              editor.on('redo', (some, argument) => {
                // do something
                if (editor.getSelected()) {
                  editor.getSelected().getTraits().forEach(ele => {
                    ele.view.onUpdate({ elInput: ele.el, component: editor.getSelected() })
                  })
                }
              })
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
                  addComponentCssNJs(editor, [droppedComponent.attributes.name]);
                }
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
                  `
                  $('.gjs-pn-views-container .gjs-trt-header').empty().append(initTraitManger)
                  // ============================= Wrapper =============================================
                  editor.getWrapper().view.el.className = 'wrapper';
                  editor.getWrapper().view.el.style.overflow = 'initial';
                  editor.getWrapper().view.el.style.overflowX = 'initial';

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
                  editor.getWrapper().set({ hoverable: false, selectable: false, highlightable: false })

                  const style = `strong{font-weight:bold;}`;
                  if (!editor.getCss().includes(style)) editor.addStyle(style);
                  addComponentCssNJs(editor, listCssFile);
                }
                setIsSaving(false)
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

              editor.on("asset:add", (asset, b, c) => {
                let isImage = asset.get('src').includes('data:image');
                if (!isImage) {
                  editor.AssetManager.close()
                  editor.AssetManager.remove(asset.get('src'))
                  Swal.fire({
                    icon: 'error',
                    title: 'File  Error',
                    text: 'This file is not image!',
                  }).then((result) => {
                    editor.AssetManager.open()
                  })
                }
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
          {editor && <NavigationPanel setLoading={setIsSaving} listPagesId={listPagesId} setSearchParams={setSearchParams} pageId={pageId} />}
          {isSaving && <SaveLoad open={isSaving} />}
        </>
      ) : <AvatarLoad load={true}></AvatarLoad>}
    </>
  );
}

export default Canvas;
