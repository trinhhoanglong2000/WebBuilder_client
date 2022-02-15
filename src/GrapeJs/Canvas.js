import { GrapesjsReact } from "grapesjs-react";
import "grapesjs/dist/css/grapes.min.css";
import "./dist/Canvas.css";

import "./blocks/basicBlocks/index";
import "./blocks/intermediateBlocks/index";
import "./blocks/AdvancedBlocks/index";
import "./plugins/index";
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
    result = result.concat(["Plugins-defaults", "gjs-navbar"]);
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
      onInit={(e) => {
        //CustomeCode(e);
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
      style={`h2 {
        color: #000;
        font-size: 26px;
        font-weight: 300;
        text-align: center;
        text-transform: uppercase;
        position: relative;
        margin: 30px 0 80px;
      }
      h2 b {
        color: #ffc000;
      }
      h2::after {
        content: "";
        width: 100px;
        position: absolute;
        margin: 0 auto;
        height: 4px;
        background: rgba(0, 0, 0, 0.2);
        left: 0;
        right: 0;
        bottom: -20px;
      }
      .carousel {
        margin: 50px auto;
        padding: 0 70px;
      }
      .carousel .item {
        min-height: 330px;
          text-align: center;
        overflow: hidden;
      }
      .carousel .item .img-box {
        height: 160px;
        width: 100%;
        position: relative;
      }
      .carousel .item img {	
        max-width: 100%;
        max-height: 100%;
        display: inline-block;
        position: absolute;
        bottom: 0;
        margin: 0 auto;
        left: 0;
        right: 0;
      }
      .carousel .item h4 {
        font-size: 18px;
        margin: 10px 0;
      }
      .carousel .item .btn {
        color: #333;
          border-radius: 0;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: bold;
          background: none;
          border: 1px solid #ccc;
          padding: 5px 10px;
          margin-top: 5px;
          line-height: 16px;
      }
      .carousel .item .btn:hover, .carousel .item .btn:focus {
        color: #fff;
        background: #000;
        border-color: #000;
        box-shadow: none;
      }
      .carousel .item .btn i {
        font-size: 14px;
          font-weight: bold;
          margin-left: 5px;
      }
      .carousel .thumb-wrapper {
        text-align: center;
      }
      .carousel .thumb-content {
        padding: 15px;
      }
      .carousel .carousel-control {
        height: 100px;
          width: 40px;
          background: none;
          margin: auto 0;
          background: rgba(0, 0, 0, 0.2);
      }
      .carousel .carousel-control i {
          font-size: 30px;
          position: absolute;
          top: 50%;
          display: inline-block;
          margin: -16px 0 0 0;
          z-index: 5;
          left: 0;
          right: 0;
          color: rgba(0, 0, 0, 0.8);
          text-shadow: none;
          font-weight: bold;
      }
      .carousel .item-price {
        font-size: 13px;
        padding: 2px 0;
      }
      .carousel .item-price strike {
        color: #999;
        margin-right: 5px;
      }
      .carousel .item-price span {
        color: #86bd57;
        font-size: 110%;
      }
      .carousel .carousel-control.left i {
        margin-left: -3px;
      }
      .carousel .carousel-control.left i {
        margin-right: -3px;
      }
      .carousel .carousel-indicators {
        bottom: -50px;
      }
      .carousel-indicators li, .carousel-indicators li.active {
        width: 10px;
        height: 10px;
        margin: 4px;
        border-radius: 50%;
        border-color: transparent;
      }
      .carousel-indicators li {	
        background: rgba(0, 0, 0, 0.2);
      }
      .carousel-indicators li.active {	
        background: rgba(0, 0, 0, 0.6);
      }
      .star-rating li {
        padding: 0;
      }
      .star-rating i {
        font-size: 14px;
        color: #ffc000;
      }`}
    />
  );
}

export default Canvas;
