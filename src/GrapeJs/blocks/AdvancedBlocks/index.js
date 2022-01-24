import customCodePlugin from "./CustomCodeBlock"
import grapesjs from "grapesjs";

export default grapesjs.plugins.add("gjs-blocks-advanced",(editor, opts = {}) => {
   
    const config = {
      blocks: [],
      //=======================|Category name|=======================

     
      //=======================|Block name|=======================

      ...opts,
    };
     //======================|Load Plugin|==============

     customCodePlugin(editor,{blockCustomCode:{category:'Extras'}});
    // Add blocks

  }
);
