import loadTraitCart from "./trait";
import $ from "jquery";
export default function loadBlockCart(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    loadTraitCart(editor, c);
    const domc = editor.DomComponents;
    const defaultType = domc.getType("default");

    function calculateTotal(tableBody, tableHead, ezMallSumary, rootEle, currency) {
       
        let totalCost = 0;
        let items = $(tableBody).find(".ezMall-cart-item ");
        let checkedInput = $(tableBody).find(".ezMall-cart-item .ezMall-cart-item-check:checked")
        if (items.length == 0) {
            $(rootEle).find("#ezMall-cart-zero-item").show().addClass("d-flex");
            $(rootEle).find(".cart-container").hide();
            $(ezMallSumary).hide();
            $(tableHead).find("#cart-select-all-product").prop("checked", false)
        }
        else {
            $(rootEle).find("#ezMall-cart-zero-item").hide().removeClass("d-flex");
            $(rootEle).find(".cart-container").show();
            $(ezMallSumary).show();
            if (checkedInput.length == items.length) {
                $(tableHead).find("#cart-select-all-product").prop("checked", true)
            }
        }
        let cart =  [
            { "id": "195a0fa0-e079-4714-a990-163620eb7187", "quantity": 1, "price": "20000", "product_name": "Product Demo 1", "currency": "VND", "is_variant": false, "variant_id": null, "variant_name": null, "thumnail": "https://dummyimage.com/150x150/000/fff", "description": null, "optionName": "" }
            , { "id": "195a0fa0-e079-4714-a990-163620eb7188", "quantity": 1, "price": "20000", "product_name": "Product Demo 2", "currency": "VND", "is_variant": false, "variant_id": null, "variant_name": null, "thumnail": "https://dummyimage.com/150x150/000/fff", "description": null, "optionName": "" }
        ]
        for (let i = 0; i < items.length; i++) {
            let id = $(items[i]).attr("id");
            let itemData = cart.find((item) => {
                if (item.is_variant) {
                    if (item.variant_id == id) {
                        return true;
                    }
                } else {
                    if (item.id == id) {
                        return true
                    }
                }
                return false;
            })
            let quantity = $(items[i]).find(".ezMall-item-quantity").val();
            let price =itemData.price
            let isCheck = $(items[i]).find(".ezMall-cart-item-check").is(':checked');
            if (isCheck) {
                totalCost += (Number)(price) * quantity;
            } else {
                $(tableHead).find("#cart-select-all-product").prop("checked", false)
            }
        }
        $(ezMallSumary).find(".ezMallSumary-total-cost").html(priceToString(totalCost, currency));
    }
    function insertData(data, tableHead, tableBody, ezMallSumary, rootEle, currency) {

        $(ezMallSumary).find(".ezMall-cart-sumary-unchecked-all").click(() => {
            let checkedInput = $(tableBody).find(".ezMall-cart-item .ezMall-cart-item-check:checked ")
            for (let i = 0; i < checkedInput.length; i++) {
                $(checkedInput[i]).prop("checked", false);
            }
            calculateTotal(tableBody, tableHead, ezMallSumary, rootEle, currency);
        })

        $(rootEle).find(".ezMall-head-remove-all-items").click(() => {
            window.localStorage.setItem('cart', JSON.stringify([]));
            $(tableBody).html("")
            $(rootEle).find("#cart-select-all-product").prop('checked', false);
            calculateTotal(tableBody, tableHead, ezMallSumary, rootEle, currency);
        });

        $(rootEle).find("#cart-select-all-product").click((e) => {
            var checkBox = $(tableBody).find(".ezMall-cart-item .ezMall-cart-item-check");
            for (let i = 0; i < checkBox.length; i++) {
                $(checkBox[i]).prop('checked', e.target.checked)
            }
            calculateTotal(tableBody, tableHead, ezMallSumary, rootEle, currency)
        })

        let totalCostInit = 0;
        data.forEach(element => {
            let totalPrice = (Number)(element.quantity) * (Number)(element.price)
            totalCostInit += totalPrice;
            let id = element.is_variant ? element.variant_id : element.id;
            const rowHtml =
                `
        <div id  = ${id} class= "ezMall-cart-item row py-1 px-3" >
            <div class="name col-md-9">
                    <div class="row">
                                <div class="col-md-4 col-7 row d-flex justify-content-start p-0">
                                        <a href="/products/id=${id}">
                                            <img src=${element.thumnail} alt="Image"
                                            style="height: 150px;width: 100%;">
                                        </a>
                                    </div>
                                    <div class="col-md-8 col-5 d-flex flex-column justify-content-between px-3">
                                        <div class="px-0 py-0 my-2 justify-content-start  text-start fw-bold cart-item-tittle">
                                            <a href="/products?id=${id}"> ${element.product_name} ${element.is_variant ? ` - ${element.variant_name}` : ""}</a>
                                        </div>
                                        <div class = "d-flex justify-content-between px-0">
                                                <div class= "p-0 my-2 fw-bold d-flex text-secondary align-items-center fst-italic">
                                                    Price: 
                                                    <div class="ezMall-item-price px-1"> 
                                                        ${priceToString(element.price, element.currency)}
                                                    </div>    
                                                    <div class= "ezMall-item-price-type">
                                                        ${element.currency}
                                                    </div>
                                                </div>
                                        </div>
                                        <div class="fw-bold d-flex text-secondary align-items-center px-0 fst-italic">
                                            <input type="number" min="0" id=${"val-" + id} class="form-control ezMall-item-quantity" value=${element.quantity}
                                            style="min-width: 135px; width: 135px;" min=1>
                                        </div>
                                    </div>
                    </div>
            </div>
            <div class="ezMall-item-total col-md-3 d-flex align-items-md-end align-items-center flex-md-column flex-row-reverse justify-content-between px-2">
                <div class="my-2 d-flex align-items-center">
                    <label class="form-check-label px-2 " for=${"check-" + id}>
                    Take it
                    </label>
                    <input class="form-check-input ezMall-cart-item-check" type="checkbox" id=${"check-" + id} name=${"check-" + id} value="">
                </div>
                <div class="px-1 py-0 my-2 justify-content-end  text-start fw-bold cart-item-tittle color-orange">
                    ${priceToString(totalPrice, element.currency)}
                </div>
                <div class="d-flex justify-content-end align-items-center">
                    <button type="button"  class="ezMall-cart-item-delete btn ezMall-btn" data-toggle="button" aria-pressed="false"
                        autocomplete="off" style="height: 29px;padding: 0px 10px;">
                        <i class="fa fa-trash " aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>     
        <hr class = "my-2">                      
                                
        `

            tableBody.insertAdjacentHTML("beforeend", rowHtml);
            $(tableBody).find(`#${id} button.ezMall-cart-item-delete`).click(() => {
                debugger
                let cart = [
                    { "id": "195a0fa0-e079-4714-a990-163620eb7187", "quantity": 1, "price": "20000", "product_name": "adasdasd", "currency": "VND", "is_variant": false, "variant_id": null, "variant_name": null, "thumnail": "https://dummyimage.com/150x150/000/fff", "description": null, "optionName": "" }
                    , { "id": "195a0fa0-e079-4714-a990-163620eb7188", "quantity": 1, "price": "20000", "product_name": "adasdasd", "currency": "VND", "is_variant": false, "variant_id": null, "variant_name": null, "thumnail": "https://dummyimage.com/150x150/000/fff", "description": null, "optionName": "" }
                ]
                let indexInArr = cart.findIndex((item) => {
                    if (element.is_variant) {
                        if (item.variant_id == id) {
                            return true;
                        }
                    } else {
                        if (item.id == id) {
                            return true
                        }
                    }
                    return false;
                })

                let itemRemove = $(tableBody).find(`#${id}`)
                $(itemRemove).fadeOut(200).remove();
                let totalCost = 0;
                let items = $(tableBody).find(".ezMall-cart-item ");
                cart.splice(indexInArr, 1);
                window.localStorage.setItem('cart', JSON.stringify(cart));
                updateCart()
                calculateTotal(tableBody, tableHead, ezMallSumary, rootEle, currency)

            })

            $(tableBody).find(`#${id} input.ezMall-item-quantity`).change(() => {
                let cart = JSON.parse(localStorage.getItem('cart'));
                if (!cart) {
                    cart = []
                }
                let indexInArr = cart.findIndex((item) => {
                    if (element.is_variant) {
                        if (item.variant_id == id) {
                            return true;
                        }
                    } else {
                        if (item.id == id) {
                            return true
                        }
                    }
                    return false;
                })
                let currentQuantity = $(tableBody).find(`input#val-${id}`).val()

                if(!currentQuantity.toString().match(/^[1-9]\d*$/)){
                    $('.ezMallSumary button').attr('disabled','disabled');
                    $(`#${id} input.ezMall-item-quantity`).css("border-color", "red").css("background","#ffdddd")  
                    $(`#${id} input.ezMall-item-quantity`).attr('invalid', 'true') 
                    return
                }else{
                    $(`#${id} input.ezMall-item-quantity`).css("border-color", "#ced4da").css("background","#fff")  
                    $(`#${id} input.ezMall-item-quantity`).removeAttr('invalid')
                    if($(`input.ezMall-item-quantity[invalid='true']`).length == 0){
                        $('.ezMallSumary button').removeAttr('disabled');
                    }
                }

                if (currentQuantity <= 0) {
                    $(tableBody).find(`#${id} button.ezMall-cart-item-delete`).click();
                    return
                }
                $(tableBody).find(`#${id} .ezMall-item-total .cart-item-tittle`).html(priceToString((Number)(element.price) * currentQuantity, element.currency))
                let items = $(tableBody).find(".ezMall-cart-item ");
                let totalCost = 0;
                calculateTotal(tableBody, tableHead, ezMallSumary, rootEle, currency)
                cart[indexInArr].quantity = currentQuantity;
                window.localStorage.setItem('cart', JSON.stringify(cart));
                updateCart()
            });

            $(tableBody).find(`#${id} input.ezMall-cart-item-check`).change(() => {
                calculateTotal(tableBody, tableHead, ezMallSumary, rootEle, currency)
            });
        });
    }
    //THIS IS SETTING COMPONENT
    function updateCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = []
        }
        let numberProduct = cart ? cart.length : 0;
        if (numberProduct == 0) {
            $('i.fa.fa-shopping-bag span').css('display', 'none');
        } else {
            $('i.fa.fa-shopping-bag span').css('display', 'initial');
            $('#numberSelectedProduct').html(numberProduct);
        }
    }
    function priceToString(value, currency) {
        switch (currency) {
            case "VND":
                return Math.ceil(Number(value)).toLocaleString('fi-FI', { style: 'currency', currency: 'VND' });
                break;
            case "USD":
                return Number(value).toLocaleString('fi-FI', { style: 'currency', currency: 'USD' });
                break;
            default:
                return `${value}`
                break;
        }
    }
    domc.addType("Cart", {
        model: {
            defaults: {
                tagName: 'div',
                draggable: !opt.isDeloy,
                droppable: !opt.isDeloy,
                removable: !opt.isDeloy,
                copyable: !opt.isDeloy,
                traits: [
                    {
                        label: "Padding Top",
                        type: "padding-setting",
                        typeSetting: "padding-top"
                      },
                      {
                        label: "Padding Bottom",
                        type: "padding-setting",
                        typeSetting: "padding-bottom"
                      },
                      {
                        label: "Padding Left",
                        type: "padding-setting",
                        typeSetting: "padding-left"
                      },
                      {
                        label: "Padding Right",
                        type: "padding-setting",
                        typeSetting: "padding-right"
                      },
                      {
                        type: 'section-common'
                      },
                      {
                        label: "Margin Top",
                        type: "padding-setting",
                        typeSetting: "margin-top"
                      },
                      {
                        label: "Margin Bottom",
                        type: "padding-setting",
                        typeSetting: "margin-bottom"
                      },
                      {
                        label: "Margin Left",
                        type: "padding-setting",
                        typeSetting: "margin-left"
                      },
                      {
                        label: "Margin Right",
                        type: "padding-setting",
                        typeSetting: "margin-right"
                      },
                    {
                        label: "Heading",
                        type: "Heading"
                    }
                ],
                // This is default attributes
                attributes: {
                    "ez-mall-type": "cart",
                },
            },
            // This function run when component created - we setup listen to change atri

            init() {
                this.on('change:attributes:data', this.handleTypeChangeData);
                this.on('change:attributes:placeholder', this.handleTypeChangePlaceHold);

            },
            async Update() {
            },
            async handleTypeChangeData() {
                this.Update()
            },
            initData() {
            },
            handleTypeChangePlaceHold() {
                const atributeData = this.attributes.attributes;

            },
        },
        view: {
            async Update() {

                let rootEle = $(this.el)
                let tableHead = $(this.el).find(`.tableRoot .thead`)[0];

                let tableBody = $(this.el).find(`.tableRoot .tbody`)[0];
                let ezMallSumary = $(this.el).find(`.ezMallSumary`)[0];
                // let cart = JSON.parse(localStorage.getItem('cart'));
                // cart = cart ? []: cart
                let cart = [
                    { "id": "195a0fa0-e079-4714-a990-163620eb7187", "quantity": 1, "price": "20000", "product_name": "Product Demo 1", "currency": "VND", "is_variant": false, "variant_id": null, "variant_name": null, "thumnail": "https://dummyimage.com/150x150/000/fff", "description": null, "optionName": "" }
                    , { "id": "195a0fa0-e079-4714-a990-163620eb7188", "quantity": 1, "price": "20000", "product_name": "Product Demo 2", "currency": "VND", "is_variant": false, "variant_id": null, "variant_name": null, "thumnail": "https://dummyimage.com/150x150/000/fff", "description": null, "optionName": "" }
                ]
                insertData(cart, tableHead, tableBody, ezMallSumary, rootEle, cart[0].currency)
            },
            init() {
                this.listenTo(this.model, 'change:attributes:data', this.Update)
                this.listenTo(this.model, 'change:attributes:placeholder', this.Update)

            },
            events: {
            },
            render: function () {
                defaultType.view.prototype.render.apply(this, arguments);
                return this;
            },
            onRender() {

                this.Update()

            },
        },
    });
    //THIS IS SETTING BLOCK
    if (!opt.isDeloy) {
        bm.add("Cart", {
            // THIS IS HTML DISPLAY ON THE LEFT (BLOCK BAR)
            label: `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="40" height="40" viewBox="0 0 256 256" xml:space="preserve">
            <g transform="translate(128 128) scale(0.87 0.87)" style="">
                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-144.89999999999998 -144.90000000000003) scale(3.22 3.22)" >
                <path d="M 73.713 65.44 H 27.689 c -3.566 0 -6.377 -2.578 -6.686 -6.13 c -0.21 -2.426 0.807 -4.605 2.592 -5.939 L 16.381 21.07 c -0.199 -0.889 0.017 -1.819 0.586 -2.53 s 1.431 -1.124 2.341 -1.124 H 87 c 0.972 0 1.884 0.471 2.446 1.263 c 0.563 0.792 0.706 1.808 0.386 2.725 l -7.798 22.344 c -1.091 3.13 -3.798 5.429 -7.063 5.999 l -47.389 8.281 c -0.011 0.001 -0.021 0.003 -0.032 0.005 c -0.228 0.04 -0.623 0.126 -0.568 0.759 c 0.056 0.648 0.48 0.648 0.708 0.648 h 46.024 c 1.657 0 3 1.343 3 3 S 75.37 65.44 73.713 65.44 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <circle cx="28.25" cy="75.8" r="6.5" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
                <circle cx="68.28999999999999" cy="75.8" r="6.5" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
                <path d="M 19.306 23.417 c -1.374 0 -2.613 -0.95 -2.925 -2.347 l -1.375 -6.155 c -0.554 -2.48 -2.716 -4.212 -5.258 -4.212 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 6.749 c 5.372 0 9.942 3.662 11.113 8.904 l 1.375 6.155 c 0.361 1.617 -0.657 3.221 -2.274 3.582 C 19.742 23.393 19.522 23.417 19.306 23.417 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            </svg>
            <div>Cart</div> `,
            category: c.cart,
            draggable: ".main-content",
            content: [
                {
                    name: 'Cart',
                    type: "Cart",
                    attributes: { class: "" },
                    style: { "position": "relative" },
                    components: [
                        {
                            attributes: { class: "container" },
                            tagName: "h2",
                            name: "Cart Tittle",
                            style: { "text-align": "center", "font-weight": "bold", "padding": "0px" },
                            content: `SHOPPING CART `,
                            layerable: false,
                            hoverable: false,
                            selectable: false,
                            highlightable: false,
                            droppable: false,
                            draggable: false,
                        },
                        {
                            attributes: { class: "container" },
                            layerable: false,
                            hoverable: false,
                            selectable: false,
                            highlightable: false,
                            droppable: false,
                            draggable: false,
                            content:
                                `
                            <hr> 
                            <div  class=" flex-column justify-content-center align-items-center" id="ezMall-cart-zero-item" style = "display:none; height:70vh">
                                <h3 class="d-flex flex-column justify-content-center aligh-items-center text-center my-5">
                                    <i class="fa fa-shopping-basket my-3" style="font-size: 150px"></i>
                                    Nothing products in your cart !!!
                                </h3>
                                <button class = "btn btn-lg ezMall-btn mt-2 fw-bold px-4 py-2"> 
                                    Shopping now
                                </button>
                            </div>
                            <div class = "row cart-container">
                                <div class = "col-xl-8 col-12">
                                    <div class="tableRoot ezMallCart">
                                        <div class ="thead d-flex justify-content-between style-black px-2">
                                            <div class="d-flex align-items-center px-2 fw-bold cart-item-tittle py-2 ">
                                                CART ITEMS
                                            </div>
                                            <div class= "d-flex align-items-center justify-content-center ">
                                                <input id="cart-select-all-product" class="form-check-input px-2" type="checkbox" value="">
                                            </div>
                                        </div>
                                        <div class ="tbody">
                                            
                                        </div>
                                        <div class="d-flex align-items-start justify-content-md-end justify-content-between p-0 my-3" sylte= "font-size: 12px">
                                           <a type="button" class="ezMall-head-remove-all-items btn mx-md-3 ezMall-btn fw-bold p-2" data-toggle="button"
                                                aria-pressed="false" autocomplete="off" style="font-size: 14px ">
                                                <i class="fa fa-trash " aria-hidden="true"></i>
                                                REMOVE ALL
                                            </a> 
                                            <a type="button" class="ezMall-cart-sumary-unchecked-all btn ezMall-btn fw-bold p-2" data-toggle="button"
                                                aria-pressed="false" autocomplete="off" style="font-size: 14px ">
                                                <i class="fa fa-times " aria-hidden="true"></i>
                                                <span style = "font-weight: bold"> 
                                                    UNCHECK ALL
                                                </span>
                                            </a> 
                                        </div>
                                    </div>
                                </div>
                                <div class = "col-xl-4 col-12">
                                    <div class="ezMallSumary d-flex flex-column" style="font-size: 16px; font-family: "Segoe UI";">
                                       <div class="d-flex align-items-center px-2 fw-bold cart-item-tittle py-2 style-black" >
                                            SUMMARY
                                        </div>
                                        <div class="p-1">
                                            <div class="d-flex align-items-center fw-bold justify-content-between my-2 cart-item-tittle">
                                                Total Cost:
                                                <div class="justify-content-center">
                                                    <span class="ezMallSumary-total-cost px-2"> 0</span>
                                                    <div class= "ezMall-item-price-type d-none">
                                                        VND
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-grid gap-2">
                                                <button type="button" class="btn btn-primary text-light fw-bold py-3 bg-orange" onClick=payMent()>PAYMENT</button>
                                            </div>
                                            <div class="text-danger fw-bold" id="cart-alert">
                                            <div>
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
                            `
                        },

                    ]
                },
            ]
        });
    }

}