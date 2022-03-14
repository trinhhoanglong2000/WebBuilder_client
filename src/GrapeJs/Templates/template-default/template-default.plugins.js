import grapesjs from "grapesjs";
import loadBlockCarousel from './carousel';
import loadBlockFooter from './footer';
import loadBlockHeader from './header';
import loadBlockProducts from './product';
export default grapesjs.plugins.add("template-default", (editor, opts = {}) => {

  const config = {
    blocks: [],
    //=======================|Category name|=======================
    catergory_product_list: "Products",
    carousel_category: "Carousel",


    //=======================|Block name|=======================
    label_product_list: "Product collection",
    carouselBlkLabel: "Carousel",

    ...opts,
  };
  //======================|Load Plugin|==============

  // Example Data
  config.storeName = "Store name";

  // Example Data
  config.headerNavigation = [{
    name: "Product",
    link: "#"
  }, {
    name: "Contact",
    link: "#"
  }];

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
  editor.BlockManager.add("Main", {
    label: 'Main',
    category: "Main",
    content: {
      name: "Main",
      droppable: true,
      attributes: { class: "main-content" },
      content: `<div style="height:100px;width:100%"></div>`

    }
  })
  //Long ADD START
  loadBlockCarousel(editor, config)
  loadBlockProducts(editor, config)
  loadBlockFooter(editor, config)
  loadBlockHeader(editor, config)
  //Long ADD END
}
);
