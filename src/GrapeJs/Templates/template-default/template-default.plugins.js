import grapesjs from "grapesjs";

import loadBlockCarousel from './carousel';
import loadBlockFooter from './footer';
import loadBlockHeader from './header';
import loadBlockProducts from './productList';
import loadBlockMain from '../Main'
import loadBlockRichText from './richText'
import loadImageWithText from "./imageWithText";
import loadContactForm from "./contactForm";
import loadBlockProductPage from "./productPage";



export default grapesjs.plugins.add("template-default", (editor, opts = {}) => {

  const config = {
    blocks: [],
    //=======================|Category name|=======================
    catergory_product_list: "Products",
    carousel_category: "Carousel",
    category_rich_text:'RichText',

    //=======================|Block name|=======================
    label_product_list: "Product collection",
    carouselBlkLabel: "Carousel",
    label_rich_text:"Rich text",

    ...opts,
  };
  //======================|Load Plugin|==============

  // Example Data
  config.storeName = "Store name";

  config.footerNavigation1 = [{
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
  config.footerNavigation2 = [{
    name: "Share your store detail, promotion or brand contents",
    link: "https://www.youtube.com/"
  }];

  // Add blocks
  //loadBlocks(editor, config);
  //Note: Body containter

  //Long ADD START
  loadBlockMain(editor,config)
  loadBlockCarousel(editor, config)
  loadBlockProducts(editor, config)
  loadBlockRichText(editor,config)
  loadBlockFooter(editor, config)
  loadBlockHeader(editor, config)
  loadImageWithText(editor, config)
  loadContactForm(editor, config)
  loadBlockProductPage(editor,config)
  //Long ADD END
}
);
