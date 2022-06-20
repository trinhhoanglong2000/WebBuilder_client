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
                $(this.el).find('.ezMall-stick-slide').slick({
                    slidesToShow: 4,
                    slidesToScroll: 4,
                });
                await fetch(`${process.env.REACT_APP_API_URL}products/3aaa41b0-17b1-43e7-bf1d-63fd027ada72`
                , {
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin': '*'
                  }
                }).then(res => res.json()).then(data => console.log(data))



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
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 pt-3">
                            <div style="width: 100%;" class="d-flex justify-content-center">
                                <img class="main-img img-thumbnail"
                                    src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg"
                                    style="width:100%; max-width: 640px;">
                            </div>
            
                            <div class="ezMall-stick-slide ">
                                <div class="">
                                    <img src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg" class="rounded px-1"
                                        alt="..." style="width:100%">
                                </div>
                                <div class="">
                                    <img src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg" class="rounded px-1"
                                        alt="..." style="width:100%">
                                </div>
                                <div class="">
                                    <img src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg" class="rounded px-1"
                                        alt="..." style="width:100%">
                                </div>
                                <div class="">
                                    <img src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg" class="rounded px-1"
                                        alt="..." style="width:100%">
                                </div>
                                <div class="">
                                    <img src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg" class="rounded px-1"
                                        alt="..." style="width:100%">
                                </div>
                                <div class="">
                                    <img src="https://ananas.vn/wp-content/uploads/stu_basas_A61015_3.jpg" class="rounded px-1"
                                        alt="..." style="width:100%">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 pt-3">
                            <div class="row ezMall-header text px-3">
                                <h3 class="fw-bold">
                                    BASAS NEW FAMILIAR - LOW TOP - LIGHT GREY
                                </h3>
                            </div>
                            <div class="d-flex ezMall-product-status justify-content-between px-3">
                                <div class="d-flex">
                                    <div class="fw-bold">Mã sản phẩm:</div>
                                    <div class="px-2">A61015</div>
                                </div>
                                <div class="d-flex">
                                    <div class="fw-bold">Tình trạng:</div>
                                    <div class="px-2">Online</div>
                                </div>
                            </div>
            
                            <div class="row ezMall-price px-3 py-3">
                                <h4 class="fw-bolder" style="color: #f15e2c;">
                                    420.000VND
                                </h4>
                            </div>
            
                            <div class="ezMall-description  px-3">
                                Mang ý nghĩa là một “người bạn thân” có thể đồng hành cùng bạn trên khắp các nẻo đường,“The
                                Familiar”
                                không mang đến những sản phẩm cầu kì phức tạp hay đủ phá cách để bạn phấn khích và mang khoe nó với
                                nhiều người. Nó chỉ đơn giản là mang đến cho bạn một sự lựa chọn an toàn, đa-zi-năng cho một ngày
                                học
                                tập, làm việc, vui chơi bình dị.
                            </div>
            
                            <div class="ezMall-variant-option-1 d-flex px-3 pt-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="variant" id="flexRadioDefault1">
                                    <label class="bg-primary mx-1 form-check" style="width: 30px; height: 30px;"
                                        for="flexRadioDefault1">
                                    </label>
                                </div>
                                <div class="form-check px-5">
                                    <input class="form-check-input" type="radio" name="variant" id="flexRadioDefault2">
                                    <label class="bg-danger mx-1 form-check" style="width: 30px; height: 30px;"
                                        for="flexRadioDefault2">
                                    </label>
                                </div>
                            </div>
            
                            <div class="ezMall-variant-option-2 d-flex justify-content-between px-3 pt-3">
            
                                <div class="fw-bold d-flex flex-column" style="width: 40%;">
                                    SIZE
                                    <div class="btn-group pt-2" style="min-width: 100%; width: 100%;">
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Size</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
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
