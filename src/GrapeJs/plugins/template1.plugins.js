import {default as loadBlocks }from '../blocks/template1.blocks'
import grapesjs from "grapesjs";
import loadStyles from '../styles/template1.styles';

export default grapesjs.plugins.add("template1",(editor, opts = {}) => {
   
    const config = {
      blocks: [],
      //=======================|Category name|=======================
      catergory_product_list :"Products",

     
      //=======================|Block name|=======================
      label_product_list :"Product collection",

      ...opts,
    };
     //======================|Load Plugin|==============

    // Add blocks
    loadBlocks(editor, config);
    loadStyles(editor,config);
  }
);
