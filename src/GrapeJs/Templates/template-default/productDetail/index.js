import $ from "jquery";
import { v4 as uuidv4 } from "uuid";
import loadTraiProductDetail from "./trait";
import { validURL } from "../../../../helper/utils.js";
import 'slick-carousel';
export default function loadBlockProductDetail(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    const domc = editor.DomComponents;

    const defaultType = domc.getType("default");
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    loadTraiProductDetail(editor, opt);

    const defaultData = {

    }
    function insertProductData(rootEle, data) {
        window.localStorage.setItem('productData', data);
        let productData = data.product[0];
        let imageArr = productData.images ? productData.images : [];
        let options = productData.is_variant ? data.option : [];
        console.log(data)
        console.log(productData)

        // For render image
        $(rootEle).find(".ezMall-header").html(productData.title)
        $(rootEle).find(".ezMall-type-value").html(productData.type)
        $(rootEle).find(".ezMall-status-value").html(productData.status)
        $(rootEle).find(".ezMall-description").html(productData.description)
        $(rootEle).find(".ezMall-price .price").html(productData.price)
        $(rootEle).find(".ezMall-price .currency").html(productData.currency)
        $(rootEle).find(".ezMall-stick-slide").html("")
        let thumbnailImage = $(rootEle).find(".img-thumbnail")[0];
        thumbnailImage.src = imageArr[0];
        let imagesContainerEle = $(rootEle).find(".ezMall-stick-slide")[0];
        imageArr.forEach((item, index) => {
            let imageItem = `
            <button id="img-${index}" class="" onclick="changeThumnail('img-${index}')">  
                <img src="${item}" class="rounded px-1" alt="${item}" style="width:100%" >
            </button>
            `
            imagesContainerEle.insertAdjacentHTML("beforeend", imageItem);
        });
        $(imagesContainerEle).not('.slick-initialized').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
        });
        //For render options 
        let optionsContainerEle = $(rootEle).find(".ezMall-options-container")[0];
        $(optionsContainerEle).html("");

        options.forEach(item => {
            let variantName = item.name
            let optionContainerHtml =
                `
             <div id="${variantName}" class= "px-3">
                <h5 class= "fw-bold py-2">
                ${variantName}
                </h5>
                <div class ="ezMall-option-container d-flex flex-wrap"
                </div>
            </div> 
                                   
            `
            optionsContainerEle.insertAdjacentHTML("beforeend", optionContainerHtml);
            debugger
            let optionContainer = $(rootEle).find(`#${variantName} .ezMall-option-container `)[0];
            let arrayVariant = item.value ? item.value : [];
            arrayVariant.forEach((variantOptionItem) => {
                let variantOptionHtml =
                    `
                <div class="form-check px-1">
                    <input class="form-check-input d-none" type="radio" name="${variantName}" id="${variantOptionItem.id}" value="${variantOptionItem.id}" 
                    onchange="VariantCheck('${variantOptionItem.id}','${variantOptionItem.id}','${variantOptionItem.id}');">
                    <label class="btn form-check" for=${variantOptionItem.id}>
                    ${variantOptionItem.value}
                    </label>
                </div>
                `
                optionContainer.insertAdjacentHTML("beforeend", variantOptionHtml);
            })
        });

    }

    domc.addType("product-detail", {
        model: {
            defaults: {
                copyable: false,
                attributes: {
                    class: "container product-section",
                    name: "products-collections",
                },
                name: "Product Detail",
                draggable: ".main-content",
                traits: [
                    {
                        type: "Product-Detail-Heading", // Type of the trait
                        label: "Heading", // The label you will see in Settings
                        placeholder: "Header",
                    },
                ],
                attributes: {
                    "ez-mall-type": "productDetail",
                    class: "ezMall-stick-slide py-2"
                }
            },
            init() {

            },
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
                this.listenTo(this.model, "change:attributes:data-ez-mall-collection", this.Update);
            },
            onRender() {
                this.Update()

            },
            async Update() {

                await fetch(`${process.env.REACT_APP_API_URL}products/3aaa41b0-17b1-43e7-bf1d-63fd027ada72`
                    , {
                        mode: 'cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    }).then(res => res.json()).then(res => {
                        if (res.message = "Get product successfully!") {
                            insertProductData(this.el, res.data);
                        } else {

                        }
                    })

            },
        },
        )

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
                style: { "text-align": "center" },
                traits: [

                ],
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
                traits: [

                ],
            },
        },
    });

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
                    content:
                        `
                    <div class="container bg-light">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 pt-3 ezMall-image-container">
                            <div style="width: 100%;" class="d-flex justify-content-center">
                                <img class="main-img img-thumbnail"
                                    src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg"
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
                                    <div class="fw-bold">Loại sản phẩm:</div>
                                    <div class="px-2 ezMall-type-value">A61015</div>
                                </div>
                                <div class="d-flex ezMall-status-container">
                                    <div class="fw-bold">Tình trạng:</div>
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
                                <div id="ezMall-variant-option-1" class= "px-3">
                                    <h5 class= "fw-bold py-2">
                                        SIZE
                                    </h5>
                                    <div class ="ezMall-option-container d-flex flex-wrap">
                                        <div class="form-check px-1">
                                            <input class="form-check-input d-none" type="radio" name="variant" id="flexRadioDefault1" value = "">
                                            <label class="btn form-check" for="flexRadioDefault1">
                                            variant 1
                                            </label>
                                        </div>
                                    </div>
                                </div> 
                            </div>

                            <div class="ezMall-variant-option-1 d-flex justify-content-between px-3 pt-3">
                                <div class="fw-bold pt-2" style="width: 40%;">
                                    SỐ LƯỢNG
                                    <input type="number" min="0" id="val-1" class="form-control ezMall-item-quantity " value="2"
                                        style="min-width: 100%; width: 100%;">
                                </div>
                            </div>
                            
            
                            <div class="px-3 py-3 pt-5">
                                <div class="btn btn-lg btn-dark fw-bold py-3 " style="width: 100%">
                                    THÊM VÀO GIỎ HÀNG
                                </div>
                            </div>
            
                            <div class="px-3 py-3">
                                <div class="btn btn-lg btn-danger fw-bold py-3" style="width: 100%">
                                    MUA HÀNG
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                }
            ],
        },
    });
    //#endregion
}
