import grapesjs from "grapesjs";

import loadBlockCarousel from './carousel';
import loadBlockFooter from './footer';
import loadBlockHeader from './header';
import loadBlockProducts from './productList';
import loadBlockMain from '../Main'
import loadBlockPageNotFound from "../PageNotFound";
import loadBlockRichText from './richText'
import loadImageWithText from "./imageWithText";
import loadContactForm from "./contactForm";
import loadBlockProductPage from "./productPage";
import loadBlockMulticolumn from "./multicolumn";
import loadVideo from "./video"
import loadImage from "./image";
import loadBlockCart from "./cart";
import loadBlockPayMent from "./payment";
import loadBlockPolicy from "../Policy";
import loadSlideshowGallery from "./slideshowGallery";
import loadCommonTrait from "./common/trait";
import loadBlockProductDetail from "./productDetail";
import loadTrackingOrder from "./trackingOrder";
import loadTrackingOrderForm from "./trackingOrderForm";

export default grapesjs.plugins.add("pet-shop", (editor, opts = {}) => {

  const config = {
    blocks: [],
    //=======================|Category name|=======================
    catergory_product_list: "Products",
    carousel_category: "Carousel",
    category_rich_text:'RichText',
    multicolumn: "Multicolumn",
    cart: "Cart",
    payment:"Payment",
    product_detail: "Product Detail",

    //=======================|Block name|=======================
    label_product_list: "Product List",
    carouselBlkLabel: "Carousel",
    label_rich_text:"Rich text",

    ...opts,
  };
  //======================|Load Plugin|==============

  // Example Data
  config.storeName = "Store name";

  config.footerNavigation = [{
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
  config.footerHeading = "Share your store detail, promotion or brand contents with your customers.";

  // Add blocks
  //loadBlocks(editor, config);
  //Note: Body containter

  //Long ADD START
  loadCommonTrait(editor,config)
  loadBlockMain(editor,config);
  loadBlockPageNotFound(editor, config);
  loadBlockCarousel(editor, config);
  loadBlockProducts(editor, config);
  loadBlockRichText(editor,config);
  loadBlockHeader(editor, config);
  loadImageWithText(editor, config);
  loadContactForm(editor, config);
  loadBlockProductPage(editor,config);
  loadVideo(editor,config);
  loadBlockMulticolumn(editor,config);
  loadImage(editor,config);
  loadBlockCart(editor,config);
  loadBlockPayMent(editor,config);
  loadBlockPolicy(editor,config);
  loadSlideshowGallery(editor,config);
  loadBlockProductDetail(editor,config);
  loadTrackingOrder(editor, config);
  loadTrackingOrderForm(editor, config);
  loadBlockFooter(editor, config);
  //Long ADD END
}
);
