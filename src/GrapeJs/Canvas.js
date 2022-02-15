import { GrapesjsReact } from "grapesjs-react";
import "grapesjs/dist/css/grapes.min.css";
import "./dist/Canvas.css";

import "./blocks/basicBlocks/index";
import "./blocks/intermediateBlocks/index";
import "./blocks/AdvancedBlocks/index";
import "./plugins/index";
import "./plugins/template1.plugins"
import "grapesjs-navbar";
import gjsForms from "grapesjs-plugin-forms";
import pluginTooltip from "grapesjs-tooltip";
import grapjesTab from "grapesjs-tabs";


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
        editor.on('block:add', (block) => { 
          console.log(this)
          console.log("HEHE")
        });

        //CustomeCode(e);
        var iframe = document.querySelector("iframe").contentWindow.document;
        //need to update in here
        iframe.addEventListener("load", function (event) {
          (async () => {
            try {

              console.log("HEHE");







            } catch (e) {
              // Deal with the fact the chain failed
              console.log(e);
            }
          })();
        });

      }}
      canvas={{
        styles: [
          `https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css`,
          `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`,
          `//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css`,
        ],
        scripts: [
          `https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js`,
          `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js`,
          `//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js`,
          `//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js`,
        ],
      }}

    />
  );
}

export default Canvas;
