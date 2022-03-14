import { GrapesjsReact } from "grapesjs-react";
import "grapesjs/dist/css/grapes.min.css";
import "./dist/Canvas.css";
import { useEffect, useState } from "react";
import "./blocks/basicBlocks/index";

import "./plugins/index";
//import "./plugins/template-default.plugins";
import NavigationPanel from "./pages/NavigationPanel";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";
import "./Templates/template-default/template-default.plugins"

function Canvas({ type }) {
  const [editor, setEditor] = useState(null);

  const getPlugins = () => {
    return ["Plugins-defaults", "template-default", "gjs-blocks-basic"];
  };
  useEffect(() => {
    $(document).ready(function () {

      $(document).on('DOMNodeInserted', function(e) {
        if ( $(e.target).hasClass('gjs-off-prv') ) {
          $(e.target).click(function(){
            $(".navigationPanel").removeClass("dnone");   
          })
        }
    });
     
    });
  }, []);
  return (
    <>
      <GrapesjsReact
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
          type: "null",

          stepsBeforeSave: 1,
          contentTypeJson: true,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
          headers: {
            "Content-Type": "application/json",
          },
          id: "",
          urlStore: `${process.env.REACT_APP_API_URL}pages/${1}/content`,
          urlLoad: `${process.env.REACT_APP_API_URL}pages/${1}/content`,
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

            //update the canvas
          });

          //CustomeCode(e);
          //need to update in here
        }}
        canvas={{
          styles: [
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
            `http://localhost:5000/files/dist/css/template-default/template-default.css`
            
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
