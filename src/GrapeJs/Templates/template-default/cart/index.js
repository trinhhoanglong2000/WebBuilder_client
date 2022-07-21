import loadTraitCart from "./trait";
import $ from "jquery";
export default function loadBlockCart(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    loadTraitCart(editor, c);
    const domc = editor.DomComponents;
    const defaultType = domc.getType("default");

    function calculateTotal(tableBody, tableHead, ezMallSumary, rootEle) {
        let totalCost = 0;
        let items = $(tableBody).find(".ezMall-cart-item ");
        let checkedInput = $(tableBody).find(".ezMall-cart-item .ezMall-cart-item-check:checked")
        if (items.length == 0) {
            $(rootEle).find("#ezMall-cart-zero-item").show().addClass("d-flex");
            $(rootEle).find(".tableRoot").hide();
            $(ezMallSumary).hide();
            $(tableHead).find("#cart-select-all-product").prop("checked", false)
        }
        else {
            $(rootEle).find("#ezMall-cart-zero-item").hide().removeClass("d-flex");
            $(rootEle).find(".tableRoot").show();
            $(ezMallSumary).show();
            if (checkedInput.length == items.length) {
                $(tableHead).find("#cart-select-all-product").prop("checked", true)
            }
        }
        for (let i = 0; i < items.length; i++) {
            let quantity = $(items[i]).find(".ezMall-item-quantity").val();
            let price = $(items[i]).find(".ezMall-item-price").html();
            let isCheck = $(items[i]).find(".ezMall-cart-item-check").is(':checked');
            if (isCheck) {
                totalCost += (Number)(price) * quantity;
            } else {
                $(tableHead).find("#cart-select-all-product").prop("checked", false)
            }
        }
        $(ezMallSumary).find(".ezMallSumary-total-cost").html(totalCost);
       
    }
    function insertData(data, tableHead, tableBody, ezMallSumary, rootEle) {
      
        $(ezMallSumary).find("#ezMall-cart-sumary-unchecked-all").click(() => {
            let checkedInput = $(tableBody).find(".ezMall-cart-item .ezMall-cart-item-check:checked ")
            for (let i = 0; i < checkedInput.length; i++) {
                $(checkedInput[i]).prop("checked", false);
            }
            calculateTotal(tableBody, tableHead, ezMallSumary, rootEle);
        })

        $(tableHead).find(".ezMall-head-remove-all-items").click(() => {
            window.localStorage.setItem('cart', JSON.stringify([]));
            $(tableBody).html("")
            $(tableHead).find("#cart-select-all-product").prop('checked', false);
            calculateTotal(tableBody, tableHead, ezMallSumary, rootEle);
        });

        $(tableHead).find("#cart-select-all-product").click((e) => {
            var checkBox = $(tableBody).find(".ezMall-cart-item .ezMall-cart-item-check");
            for (let i = 0; i < checkBox.length; i++) {
                $(checkBox[i]).prop('checked', e.target.checked)
            }
            calculateTotal(tableBody, tableHead, ezMallSumary, rootEle)
        })

        let totalCostInit = 0;
        data.forEach(element => {
            let totalPrice = (Number)(element.quantity) * (Number)(element.price)
            totalCostInit += totalPrice;
            let id = element.is_variant?  element.variant_id : element.id;
            const rowHtml =
                `
            <tr id  = ${id} class= "ezMall-cart-item" >
                <th class="name">
                    <div class="form-check">
                        <div class="row">
                            <div class="col-auto d-flex align-items-center">
                                <input class="form-check-input ezMall-cart-item-check" type="checkbox" id=${"check-" + id} name=${"check-" + id} value="">
                            </div>
                            <div class="col-md-11 col-8">
                                <div class="row">
                                    <div class="col-xl-4 row d-flex justify-content-center">
                                        <img src=${element.thumnail} alt="Image"
                                            style="height: 150px;width: auto;">
                                    </div>
                                    <div class="col-xl-8 row d-flex flex-column justify-content-center">
                                        <div class="p-0 justify-content-center text-center my-3"> ${element.product_name} ${element.is_variant? ` - ${element.variant_name}`: ""} </div>
                                        <div class="p-0 justify-content-center text-center eZmall-for-des"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </th>
                <td class="price">
                    <div class=" d-flex justify-content-center align-items-center " style="height:150px">
                    <div class="ezMall-item-price px-1"> ${element.price} </div>    
                    <div class= "ezMall-item-price-type">
                    ${element.currency}
                    </div>
                    
                </td>
                <td class="quantity">
                    <div class=" d-flex justify-content-center align-items-center" style="height:150px">
                        <input type="number" min="0" id=${"val-" + id} class="form-control ezMall-item-quantity" value=${element.quantity}
                            style="min-width: 70px; width: 70px;" />

                    </div>
                </td>
                <td class="ezMall-item-total justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center" style="height:150px">${totalPrice} ${element.currency}</div>
                </td>
                <th scope="col">
                    <div class="d-flex justify-content-center align-items-center" style="height:150px">
                        <button type="button"  class="ezMall-cart-item-delete btn fa fa-trash" data-toggle="button" aria-pressed="false"
                            autocomplete="off" style="height: 29px;padding: 0px 10px;">
                        </button>
                    </div>
                </th>
            </tr>                           
                                    
            `

            tableBody.insertAdjacentHTML("beforeend", rowHtml);
            $(tableBody).find(`#${id} button.ezMall-cart-item-delete`).click(() => {
                let cart = JSON.parse(localStorage.getItem('cart'));
                let indexInArr =cart.findIndex((item) =>{
                    if(element.is_variant){
                       if(item.variant_id == id ){
                        return true;
                       } 
                    }else{
                        if(item.id == id){
                            return true
                        }
                    }
                    return false;
                })
                let itemRemove = $(tableBody).find(`#${id}`)
                $(itemRemove).fadeOut(200).remove();
                let totalCost = 0;
                let items = $(tableBody).find(".ezMall-cart-item ");
                calculateTotal(tableBody, tableHead, ezMallSumary, rootEle)
                cart = cart.splice(indexInArr,1);
                window.localStorage.setItem('cart', JSON.stringify(cart));
            })

            $(tableBody).find(`#${id} input.ezMall-item-quantity`).change(() => {
                let cart = JSON.parse(localStorage.getItem('cart'));
                let indexInArr =cart.findIndex((item) =>{
                    if(element.is_variant){
                       if(item.variant_id == id ){
                        return true;
                       } 
                    }else{
                        if(item.id == id){
                            return true
                        }
                    }
                    return false;
                })
                let currentQuantity = $(tableBody).find(`input#val-${id}`).val()
                $(tableBody).find(`#${id} .ezMall-item-total div`).html((Number)(element.price) * currentQuantity + ` ${element.currency}`)
                let items = $(tableBody).find(".ezMall-cart-item ");
                let totalCost = 0;
                calculateTotal(tableBody, tableHead, ezMallSumary, rootEle)
                cart[indexInArr].quantity = currentQuantity;
                window.localStorage.setItem('cart', JSON.stringify(cart));
            });

            $(tableBody).find(`#${id} input.ezMall-cart-item-check`).change(() => {
                calculateTotal(tableBody, tableHead, ezMallSumary, rootEle)
            });
        });
        let items =  $(tableBody).find(".ezMall-cart-item ");
        if (items.length == 0) {
            $(rootEle).find("#ezMall-cart-zero-item").show().addClass("d-flex");
            $(rootEle).find("table").hide();
            $(ezMallSumary).hide();
            $(tableHead).find("#cart-select-all-product").prop("checked", false)
        }
        else {
            $(rootEle).find("#ezMall-cart-zero-item").hide().removeClass("d-flex");
            $(rootEle).find("table").show();
            $(ezMallSumary).show();
        }
    }
    //THIS IS SETTING COMPONENT

    domc.addType("Cart", {
        model: {
            defaults: {
                tagName: 'div',
                draggable: false,
                droppable: false,
                removable : false,
                copyable: false,
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
                        label: "Heading",
                        type: "Heading"
                    }
                ],
                // This is default attributes
                attributes: {
                    "ez-mall-type": "cart",
                }
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
                let tableHead = $(this.el).find(`.tableRoot thead`)[0];
                let tableBody = $(this.el).find(`.tableRoot tbody`)[0];
                let ezMallSumary = $(this.el).find(`.ezMallSumary`)[0];
                let cart = JSON.parse(localStorage.getItem('cart'));
                insertData(cart, tableHead, tableBody, ezMallSumary, rootEle)
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
                    components: [
                        {
                            attributes: { class: "container" },
                            tagName: "h2",
                            name: "Cart Tittle",
                            style: { "text-align": "center", "font-weight": "bold", "padding": "0px" },
                            content: `SHOCARTPPING `,
                            layerable: false,
                            hoverable: false,
                            selectable: false,
                            highlightable: false,
                            droppable: false,
                            draggable: false,
                        },
                        {
                            attributes: { class: "container" },
                            tagName: "h2",
                            name: "Cart Tittle",
                            style: { "text-align": "center", "font-weight": "bold", "padding": "0px" },
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
                                <h3>
                                    Bạn đang không có sản phẩm nào>
                                </h3>
                                <button class = "btn btn-lg btn-primary mt-2"> 
                                    Shopping now
                                </button>
                            </div>
                            <table class="tableRoot ezMallCart">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width: 60%">
                                            <div class="form-check">
                                                <div class="row">
                                                    <div class="col-auto d-flex align-items-center">
                                                        <input id="cart-select-all-product" class="form-check-input" type="checkbox" value="">
                                                    </div>
                                                    Products
                                                </div>
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div class="d-flex align-items-center justify-content-center">Price</div>
                                        </th>
                                        <th scope="col">
                                            <div class="d-flex align-items-center justify-content-center">Quantity</div>
                                        </th>
                                        <th scope="col">
                                            <div class="d-flex align-items-center justify-content-center">Sum</div>
                                        </th>
                                        <th scope="col">
                                            <div class="d-flex justify-content-center align-items-center" style="">
                                                <a type="button" class="ezMall-head-remove-all-items btn fa fa-trash  text-danger" data-toggle="button"
                                                    aria-pressed="false" autocomplete="off">
                                                </a>
                                            </div>
                                        </th>
                                    </tr>   
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
            
                            <div class="ezMallSumary row px-2 py-3" style="font-size: 16px; font-family: "Segoe UI";">
                                <div class="col-4 font-weight-bold d-flex align-items-center ">
                                    <a class = "btn " id = "ezMall-cart-sumary-unchecked-all">
                                        <i class="fa fa-times" aria-hidden="true"></i>
                                        <span style = "font-weight: bold"> 
                                            Uncheck All
                                        </span>
                                    </a>
                                </div>
                                <div class="col-4 d-flex align-items-center font-weight-bold  justify-content-center">
                                    Total Cost: 
                                    <span class="ezMallSumary-total-cost px-2"> 0</span>
                                    <div class= "ezMall-item-price-type">
                                        VND
                                    </div>
                                </div>
                                <div class="col-4  d-flex align-items-center justify-content-end ">
                                    <button type="button" class="btn btn-warning btn-lg text-light font-weight-bold" onClick=payMent()>Payment</button>
                                </div>
                            </div>
                            <hr>
                            `
                        },

                    ]
                },
            ]
        });
    }

}