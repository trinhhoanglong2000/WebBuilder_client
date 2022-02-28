import {default as loadBlocks }from '../blocks/template-default.blocks'
import grapesjs from "grapesjs";
import loadStyles from '../styles/template-default.styles';
import loadPages from  '../page/template-default.page';

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

    // Example Data
    config.storeName = "Store name";

    // Example Data
    config.headerNavigation= [{
      name: "Product",
      link: "#"
    }, {
        name: "Contact",
        link: "#"
    }];

    config.footerNavigation1= [{
      name: "Search",
      link: "https://www.youtube.com/"
      }, {
      name: "Tern of service",
      link: "https://www.youtube.com/"
      }, {
      name: "Refund policy",
      link: "https://www.youtube.com/"
    }];
  
    // Example Data
    config.footerNavigation2= [{
      name: "Share your store detail, promotion or brand contents",
      link: "https://www.youtube.com/"
    }];

    // Add blocks
    loadPages(editor, config);
    loadBlocks(editor, config);
    loadStyles(editor, config);
  }
);
