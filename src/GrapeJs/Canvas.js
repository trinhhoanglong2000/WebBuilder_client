import { GrapesjsReact } from "grapesjs-react";
import "grapesjs/dist/css/grapes.min.css";
import "./dist/Canvas.css";

import "./blocks/basicBlocks/index";
import "./blocks/intermediateBlocks/index";
import "./blocks/AdvancedBlocks/index";
import "./plugins/index";
import "./plugins/template1.plugins";
import "grapesjs-navbar";
import gjsForms from "grapesjs-plugin-forms";
import pluginTooltip from "grapesjs-tooltip";
import grapjesTab from "grapesjs-tabs";
import { v4 as uuidv4 } from "uuid";
/////////======================================
//=======|Type 0 = Basic|=========
//=======|Type 1 = Intermediate|=========
//=======|Type 2 = Advanced|=========
function Canvas({ type }) {
  const getPlugins = () => {
    const plugins = [
      "gjs-blocks-basic",
      "gjs-blocks-intermediate",
      "gjs-blocks-advanced",
    ];
    let result = plugins.slice(0, type + 1);
    //Optional
    if ((type) => 1) {
      result = result.concat([gjsForms]);
    }
    if (type >= 2) {
      result = result.concat([pluginTooltip, grapjesTab]);
    }
    result = result.concat(["Plugins-defaults", "gjs-navbar", "template1"]);
    return result;
  };

  return (
    <GrapesjsReact
      id="grapesjs-react"
      plugins={getPlugins()}
      pluginsOpts={{
        "gjs-navbar": { labelNavbarCategory: "Navigation" },
        [pluginTooltip]: {
          blockTooltip: {
            category: "Extras",
            attributes: { class: "tooltip" },
          },
        },
        [grapjesTab]: {
          tabsBlock: { category: "Navigation" },
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
        type: "local",

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
        editor.on("block:drag:stop", function (dropped_Component) {
          let droppedComponent = dropped_Component;
          if (Array.isArray(droppedComponent)){
            droppedComponent = droppedComponent[0];
          }
 

          if (droppedComponent.attributes.name ==="Carousel"){
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
                console.log(item);
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
        ],
        scripts: [
          `https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js`,
          `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js`,
          `//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js`,
          `//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js`,
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
        ],
      }}
    />
  );
}

export default Canvas;
