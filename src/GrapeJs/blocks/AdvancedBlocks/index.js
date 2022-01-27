import {default as customCodePlugin} from "./CustomCodeBlock"
import grapesjs from "grapesjs";

export default grapesjs.plugins.add("gjs-blocks-advanced",(editor, opts = {}) => {
   
    const config = {
      blocks: ['col-card','flip-card'],
      //=======================|Category name|=======================
      labelcolcard_category :"Media",
      labelproductcard_category :"Media",

     
      //=======================|Block name|=======================
      labelcolcard :"Card Column",
      labelproductcard :"Card Product",

      ...opts,
    };
     //======================|Load Plugin|==============

     customCodePlugin(editor,{blockCustomCode:{category:'Extras'}});
    // Add blocks
    const loadBlocks = require('./blocks');
    loadBlocks.default(editor, config);
  }
);
