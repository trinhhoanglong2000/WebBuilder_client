import {default as loadBlocks }from '../blocks/template-default.blocks'
import grapesjs from "grapesjs";
import loadStyles from '../styles/template-default.styles';

export default grapesjs.plugins.add("template-default",(editor, opts = {}) => {
   
    const config = {
      blocks: [],
      //=======================|Category name|=======================
      catergory_product_list :"Products",
      carousel_category: "Carousel",

     
      //=======================|Block name|=======================
      label_product_list :"Product collection",
      carouselBlkLabel: "Carousel",

      ...opts,
    };
     //======================|Load Plugin|==============

    // Add blocks
    loadBlocks(editor, config);
    loadStyles(editor,config);
  }
);
