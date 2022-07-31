import $ from "jquery";
import { v4 as uuidv4 } from "uuid";
import loadTraiProductDetail from "./trait";
import { validURL } from "../../../../helper/utils.js";
import "slick-carousel";
import { positions } from "@mui/system";
export default function loadBlockProductDetail(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  const domc = editor.DomComponents;

  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  loadTraiProductDetail(editor, opt);

  const defaultData = {};
  function insertProductData(rootEle, data) {
    window.localStorage.setItem("productData", JSON.stringify(data));
    let productData = data.product[0];
    let imageArr = productData.images ? productData.images : [];
    let options = productData.is_variant ? data.option : [];
    let optionName = options.map((item) => item.name).join("/");
    // For render image
    $(rootEle).find(`.ezMall-price .price`).html(productData.price);
    $(rootEle).find(`.ezMall-quantity-remain`).html(productData.inventory);
    $(rootEle).find(`ezMall-quantity-input`).prop("max", productData.inventory);
    $(rootEle).find(".ezMall-header").html(productData.title);
    $(rootEle).find(".ezMall-type-value").html(productData.type);
    $(rootEle).find(".ezMall-status-value").html(productData.status);
    $(rootEle).find(".ezMall-description").html(productData.description);
    $(rootEle).find(".ezMall-price .price").html(productData.price);
    $(rootEle).find(".ezMall-price .currency").html(productData.currency);
    $(rootEle).find(".ezMall-stick-slide").html("");
    let thumbnailImage = $(rootEle).find(".img-thumbnail")[0];
    $(thumbnailImage).prop("src", imageArr[0]);
    let imagesContainerEle = $(rootEle).find(".ezMall-stick-slide")[0];
    imageArr.forEach((item, index) => {
      let imageItem = `
            <button id="img-${index}" class="" onclick="changeThumnail('img-${index}')">  
                <img src="${item}" class="rounded px-1" alt="${item}" style="width:100%" >
            </button>
            `;
      imagesContainerEle.insertAdjacentHTML("beforeend", imageItem);
    });
    $(imagesContainerEle).not(".slick-initialized").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
    });
    //For render options
    let optionsContainerEle = $(rootEle).find(".ezMall-options-container")[0];
    $(optionsContainerEle).html("");

    options.forEach((item) => {
      let variantName = item.name;
      let optionContainerHtml = `
             <div id=${item.id} class= "px-3">
                <div class = "d-flex">  
                    <h5 class= "fw-bold py-2">
                    ${variantName}
                    </h5>
                </div>
                <div class ="ezMall-option-container d-flex flex-wrap"
                </div>
            </div> 
                                   
            `;
      optionsContainerEle.insertAdjacentHTML("beforeend", optionContainerHtml);

      let optionContainer = $(rootEle).find(
        `#${item.id} .ezMall-option-container `
      )[0];
      let arrayVariant = item.value ? item.value : [];
      arrayVariant.forEach((variantOptionItem, index) => {
        let variantOptionHtml = `
                <div class="form-check px-1">
                    <input class="form-check-input d-none" type="radio" name="${variantName}" id="${variantOptionItem.id}" value="${variantOptionItem.id}" 
                    onchange="VariantCheck('${item.id}','${variantOptionItem.id}');">
                    <label class="btn form-check" for=${variantOptionItem.id}>
                    ${variantOptionItem.value}
                    </label>
                </div>
                `;
        optionContainer.insertAdjacentHTML("beforeend", variantOptionHtml);
      });
    });
  }

  domc.addType("product-detail", {
    model: {
      defaults: {
        attributes: {
          class: "container product-section",
          name: "products-collections",
        },
        name: "Product Detail",
        // draggable: ".main-content",
        draggable: false,
        droppable: false,
        removable : false,
        copyable: false,

        traits: [
          {
            type: "Product-Detail-Heading", // Type of the trait
            label: "Heading", // The label you will see in Settings
            placeholder: "Header",
          },
        ],
        attributes: {
          "ez-mall-type": "productDetail",
          class: "ezMall-stick-slide py-2",
          style: "position: relative",
        },
      },
      init() {},
      initData() {
        // this.attributes.components.models.forEach(function (item) {
        //     //check product//
        //     if (item.attributes.name === "Products") {
        //         item.set({
        //             content: item.attributes.content.replace(
        //                 /myCarousel/g,
        //                 `A${uuidv4()}`
        //             ),
        //         });
        //     }
        // });
      },

      // This function run when component created - we setup listen to change atri
    },
    view: defaultView.extend({
      init() {
        this.listenTo(
          this.model,
          "change:attributes:data-ez-mall-collection",
          this.Update
        );
      },
      onRender() {
        this.Update();
      },
      async Update() {
        await fetch(
          `${process.env.REACT_APP_API_URL}products/9ecd724b-6041-4a5e-b2c1-e98ed37628de`,
          {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if ((res.message = "Get product successfully!")) {
              insertProductData(this.el, res.data);
            } else {
            }
          });
      },
    }),
  });

  domc.addType("product-detail-text", {
    model: {
      defaults: {
        name: "Text",
        tagName: "h2",
        removable: false,
        draggable: false,
        droppable: false,
        highlightable: false,
        copyable: false,
        selectable: false,
        hoverable: false,
        layerable: false,
        style: { "text-align": "center" },
        traits: [],

      },

    },
  });
  domc.addType("product-detail-body", {
    model: {
      defaults: {
        name: "Product Detail Body",
        removable: false,
        draggable: false,
        droppable: false,
        highlightable: false,
        copyable: false,
        selectable: false,
        hoverable: false,
        layerable: false,
        traits: [],
        style:{"positions": "relative" }
      },
    },
  });
  if (!opt.isDeloy) {
    bm.add("ProductDetail", {
      label: `
          <div>${c.label_product_list}</div> `,
      category: c.product_detail,
      attributes: { class: "fa fa-cube" },
     
      content: {
        type: "product-detail",
        components: [
          {
            type: "product-detail-text",
            content: `Products Detail`,
          },
          {
            type: "product-detail-body",
            content: `
                        <div class="container bg-light ezMall-product-detail-container">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 pt-3 ezMall-image-container">
                                    <div style="width: 100%;" class="d-flex justify-content-center">
                                        <img class="main-img img-thumbnail"
                                            src="https://ezmall-bucket.s3.ap-southeast-1.amazonaws.com/DefaultImage/default-image-620x600.png"
                                            style="width:100%; max-width: 640px;">
                                    </div>
                                    <div class="ezMall-stick-slide ">
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 pt-3">
                                    <div class="row text px-3">
                                        <h3 class="fw-bold ezMall-header">
                                        </h3>
                                    </div>
                                    <div class="d-flex justify-content-between px-3">
                                        <div class="d-flex  ezMall-type-container">
                                            <div class="fw-bold">Product type:</div>
                                            <div class="px-2 ezMall-type-value">A61015</div>
                                        </div>
                                        <div class="d-flex ezMall-status-container">
                                            <div class="fw-bold">Status:</div>
                                            <div class="px-2  ezMall-status-value">Online</div>
                                        </div>
                                    </div>
                    
                                    <div class="row ezMall-price px-3 py-3">
                                        <h4 class="fw-bolder" style="color: #f15e2c;">
                                            <span class="price">  </span> <span class="currency">  </span>
                                        </h4>
                                    </div>
                    
                                    <div class="ezMall-description  px-3">
                                    </div>
                
                    
                                    <div class = "ezMall-options-container">
                                    </div>
    
                                    <div class="ezMall-quantity d-flex justify-content-between px-3 pt-3">
                                        <div class="pt-2" >
                                            <div class="d-flex">
                                                <h5 class="fw-bolder py-3 m-0">QUANTITY</h5>
                                                <i class="col px-1 d-flex align-items-center justify-content-center"> (<span class="ezMall-quantity-remain"> </span> <p class="px-1 m-0">products remain</p>)</i>
                                            </div> 
                                            <div class="d-flex fw-bold" style="height:40px; width:252px">                                    
                                                <input type="number" min="0" id="val-1" class="col form-control ezMall-quantity-input " value="2" >
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="px-3 py-3">
                                        <div class="ezMall-alert " style="display:none">
                                            <div class="d-flex text-danger fw-bolder align-items-center justify-content-center">
                                                <p class=" ezMall-alert-text-config">Please choose</p>
                                                <p class="col ezMall-alert-text-option px-1"> á á</p>
                                            </div> 
                                        </div>
                                        <button class="btn btn-lg btn-dark fw-bold py-3 ezMall-add-to-cart" style="width: 100%" onclick = "addToCart();">
                                            ADD TO CART
                                        </button>
                                    </div>
                    
                                    <div class="px-3 py-3">
                                        <div class="btn btn-lg btn-danger fw-bold py-3 ezMall-buys" style="width: 100%" onclick = "buyNow()">
                                            BUY
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="ezMall-popup-alert">
                                <div class="spinner-border ezMall-loading" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="ezMall-popup ezMall-popup-success"> 
                                    <i class="fa fa-check"></i>
                                    <h5 class="text-success fw-bolder">Successful</h5>
                                </div> 
                                <div class="ezMall-popup ezMall-popup-fail"> 
                                    <i class="fa fa-close text-danger"></i>
                                    <h5 class="text-danger fw-bolder">Error</h5>
                                    <div class="ezMalll-msg fw-bold p-3 d-flex">
                                        Something went wrong
                                    </div>
                                
                                </div> 
                            </div>
    
                    `,
          },
        ],
      },
    });
  }

  //#endregion
}
