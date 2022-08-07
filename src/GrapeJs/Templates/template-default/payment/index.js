import loadTraitPayment from "./trait";
import $ from "jquery";
export default function loadBlockPayMent(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    loadTraitPayment(editor, c);
    const domc = editor.DomComponents;
    const defaultType = domc.getType("default");
    let cart = JSON.parse(localStorage.getItem('cart'));
    async function getDistrict(rootEle){
        let paymentCitySelectContainer = $(rootEle).find("#city")[0];
        let cityOptions = JSON.parse(localStorage.getItem('city'))
        let indexCity = cityOptions.findIndex(item => item.id === $(paymentCitySelectContainer).val())
        if (!('data' in cityOptions[indexCity])) {
            await fetch(`${process.env.REACT_APP_API_URL}data/city/${$(paymentCitySelectContainer).val()}/district`,
                {
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => res.json()).then(districtRes => {
                    if (districtRes.statusCode === 200) {
                        cityOptions[indexCity].data = districtRes.data
                    }
                })
        }
        let paymentDistrictSelectContainer = $(rootEle).find("#district")[0];
        $(paymentDistrictSelectContainer).html("")
        cityOptions[indexCity].data.forEach(item => {
            const rowHtml =
                `                            
                    <option value="${item.id}" >${item.name}</option>        
                `
            paymentDistrictSelectContainer.insertAdjacentHTML("beforeend", rowHtml);
        })
    }
    async function loadPaymentData(rootEle, firstRun) {
        if (firstRun) {
            // Render Currency
            let paymentCurrencySelectCoptainer = $(rootEle).find("#currency")[0];
            let currencyOptions = JSON.parse(localStorage.getItem('currency'))
            $(paymentCurrencySelectCoptainer).html("")
    
            currencyOptions.forEach((element, index) => {
                const rowHtml =
                    `                            
                <option value="${element.currency}" >${element.currency}</option>        
                `
                paymentCurrencySelectCoptainer.insertAdjacentHTML("beforeend", rowHtml);
            });
            let storeCurrency = JSON.parse(localStorage.getItem('storeCurrency'));
            $(rootEle).find("#currency").val(storeCurrency)
            $(paymentCurrencySelectCoptainer).on("change", async () => {
                await loadPaymentData(rootEle, false)
            })
            // Render City
            let paymentCitySelectContainer = $(rootEle).find("#city")[0];
            let cityOptions = JSON.parse(localStorage.getItem('city'))
            $(paymentCitySelectContainer).html("")
            cityOptions.forEach((element, index) => {
                const rowHtml =
                    `                            
                <option value="${element.id}" >${element.name}</option>        
                `
                paymentCitySelectContainer.insertAdjacentHTML("beforeend", rowHtml);
            });
            // Render District
            await getDistrict(rootEle)
            $(paymentCitySelectContainer).on("change", async () => {
                await getDistrict(rootEle)
            })
        }
        // Render cart
        let paymentCurrencyVal = $(rootEle).find("#currency").val();
        $(rootEle).find(".currency").html(paymentCurrencyVal);
        let cart = [{"id":"195a0fa0-e079-4714-a990-163620eb7187","quantity":2,"price":"20000","product_name":"adasdasd","currency":"VND","is_variant":false,"variant_id":null,"variant_name":null,"thumnail":"https://dummyimage.com/150x150/000/fff","description":null,"optionName":""}]
        let paymentCartContainer = $(rootEle).find(".ezMall-payment-cart-container")[0];
        $(paymentCartContainer).html("");
        let paymentCartSumPrice = $(rootEle).find(".ezMall-sumPrice")[0];
        let paymentShippingCost = $(rootEle).find(".ezMall-shipping-cost")[0];
        let paymentDiscount = $(rootEle).find(".ezMall-discount")[0];
        let paymentFinalBillCost = $(rootEle).find(".ezMall-final-bill-cost")[0];
        let sumPrice = 0;
        
        cart.forEach(element => {
            let converCurrency = convertCurrency(Number(element.quantity) * Number(element.price), element.currency, paymentCurrencyVal)
            sumPrice += Number(converCurrency);
            let variantInfo = [];
            let rowHtml = '';
            if (element.is_variant) {
                let variantName = element.variant_name.split("/");
                let optionName = element.optionName.split("/");
    
                for (let i = 0; i < optionName.length; i++) {
                    variantInfo.push(`${optionName[i]}: ${variantName[i]}`)
                }
                rowHtml =
                    `
                    <div class=" px-1">
                        <div class=" py-2 d-flex flex-column justify-content-between" >
                            <div class = "row fw-bold"">
                                ${element.product_name} 
                            </div>
                            <div class = "justify-content-between align-items-end d-flex">
                                <div class = " px-2 fw-bold text-secondary fst-italic">
                                ${variantInfo.join("<br/>")} 
                                </div>
                                <div class = "d-flex flex-row fst-italic text-secondary">
                                    <span class="fw-bold">
                                        x${element.quantity} 
                                    </span>
                                </div>
                                <div class ="justify-content-end align-items-end d-flex fw-bold">
                                    <div class="text-end">${priceToString(converCurrency, paymentCurrencyVal)}</td>
                                </div> 
                            </div>
                            
                        </div
                    </div>                                   
                                    
                    `
            }else{
                rowHtml =
                    `
                    <div class=" px-1">
                        <div class=" py-2 d-flex justify-content-between" >
                            <div class = "row fw-bold"">
                                ${element.product_name} 
                            </div>
                            <div class = "fst-italic text-secondary">
                                    <span class="fw-bold">x${element.quantity}</span>
                            </div>
                            <div class ="fw-bold">
                                    <div class="text-end">${priceToString(converCurrency, paymentCurrencyVal)}</td>
                            </div> 
                        </div
                    </div>                                   
                                    
                    `
            }
            paymentCartContainer.insertAdjacentHTML("beforeend", rowHtml);
        });
        // Render sumary
        let paymentDiscountVal = Number(calculatorDiscount(sumPrice, paymentCurrencyVal));
        $(paymentDiscount).html(priceToString(paymentDiscountVal, paymentCurrencyVal));
        let paymentShippingCostVal = 0;//Number($(paymentShippingCost).val());
        let finalCost = (sumPrice - paymentDiscountVal + paymentShippingCostVal).toFixed(2);
        finalCost = finalCost > 0 ? finalCost : 0;
        $(paymentCartSumPrice).html(priceToString(sumPrice.toFixed(2), paymentCurrencyVal));
        $(paymentShippingCost).html(priceToString(paymentShippingCostVal, paymentCurrencyVal))
        $(paymentDiscount).html(priceToString(paymentDiscountVal, paymentCurrencyVal))
        $(paymentFinalBillCost).html(priceToString(finalCost, paymentCurrencyVal));
        return finalCost;
    }
    function convertCurrency(value, fromCurrency, toCurrency) {
        let currencyOptions = JSON.parse(localStorage.getItem('currency'));
        let dataFromCurrency = currencyOptions.findIndex(item => item.currency == fromCurrency);
        let dataToCurrency = currencyOptions.findIndex(item => item.currency == toCurrency);
    
        switch (toCurrency) {
            case "VND":
                return Math.ceil(value * Number(currencyOptions[dataToCurrency].amount) / Number(currencyOptions[dataFromCurrency].amount));
                break;
            case "USD":
                return parseFloat(value * Number(currencyOptions[dataToCurrency].amount) / Number(currencyOptions[dataFromCurrency].amount) + 0.004).toFixed(2);
                break;
            default:
                return parseFloat(value * Number(currencyOptions[dataToCurrency].amount) / Number(currencyOptions[dataFromCurrency].amount) + 0.004).toFixed(2);
                break;
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
                return `${value} ${currency}`
                break;
        }
    }
    function useDiscount() {

        let rootEle = $("div[ez-mall-type='payment']")[0];
        let storeId = $(rootEle).attr("ez-mall-store");
        let discountCode = $(rootEle).find('input#discount').val();
        let cart = JSON.parse(localStorage.getItem('paymentItems'));
        let paymentCurrencyVal = $(rootEle).find("#currency").val();
        let sumPrice = 0;
        cart.forEach(element => {
            let converCurrency = convertCurrency(Number(element.quantity) * Number(element.price), element.currency, paymentCurrencyVal)
            sumPrice += Number(converCurrency);
        });
        var payload = {
            "store_id": storeId,
            "code": discountCode,
            "total_price": sumPrice,
            "total_products": cart.length,
            "currency": paymentCurrencyVal
        }
        var data = JSON.stringify(payload);
        const rootUrl = $('script.ScriptClass').attr('src').match(/.+(?=\/js|css)/gm)
        const url = `${rootUrl}/discount/use-discount`
        fetch(url,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(function (res) { return res.json(); })
            .then(function (resData) {
                if (resData.statusCode == 200 && data) {
                    window.localStorage.setItem('discount', JSON.stringify(resData.data[0]));
                    $(rootEle).find(".ezMall-discount-description").show();
                    let discount_text = $(rootEle).find(".ezMall-discount-description-text").html(resData.data[0].code);
                } else {
                    window.localStorage.removeItem('discount');
                    $(rootEle).find(".ezMall-discount-description").hide();
                }
            }).finally(() => {
                loadPaymentData(rootEle, false)
            })
    }
    function calculatorDiscount(sumPrice, paymentCurrencyVal) {
        let value = 0;
        let discountInfo = JSON.parse(localStorage.getItem('discount'));
        if (discountInfo) {
            let amount = discountInfo.amount;
            let discountCurrency = discountInfo.currency;
    
            if (discountInfo.type == 1) {
                value = convertCurrency(Number(amount), discountCurrency, paymentCurrencyVal)
            } else if (discountInfo.type == 0) {
                value = convertCurrency(Number(amount) * Number(sumPrice)/100, discountCurrency, paymentCurrencyVal)
            }
        }
        return value;
    }
    
    function removeDiscount() {
        let rootEle = $("div[ez-mall-type='payment']")[0];
        window.localStorage.removeItem('discount');
        $(rootEle).find(".ezMall-discount-description-text").html("");
        $(rootEle).find(".ezMall-discount-description").attr('style', 'display: none !important');
        loadPaymentData(rootEle, false)
    }
    //THIS IS SETTING COMPONENT
    domc.addType("Payment", {
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
                    }, {
                        label: "Heading",
                        type: "Payment-Heading"
                    }

                ],
                // This is default attributes
                attributes: {
                    "ez-mall-type": "payment",
                    "ez-mall-store": opt.storeId
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
                await fetch(`${process.env.REACT_APP_API_URL}data/rate`,
                    {
                        mode: 'cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    }).then(res => res.json()).then(currencyRes => {
                        if (currencyRes.statusCode === 200) {
                            window.localStorage.setItem('currency', JSON.stringify(currencyRes.data));
                        }
                    }).finally(async () => {
                        await fetch(`${process.env.REACT_APP_API_URL}data/city`
                            , {
                                mode: 'cors',
                                headers: {
                                    'Access-Control-Allow-Origin': '*'
                                }
                            }).then(res => res.json()).then(cityRes => {
                                if (cityRes.statusCode === 200) {
                                    window.localStorage.setItem('city', JSON.stringify(cityRes.data));
                                }
                            }).finally(async () => {
                                await loadPaymentData(this.el, true)
                            })

                    })

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
        bm.add("Payment", {
            // THIS IS HTML DISPLAY ON THE LEFT (BLOCK BAR)
            label: `
            <div class="gjs-block-label">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 502.685 502.685" style="enable-background:new 0 0 502.685 502.685;margin: 7px 0px 0px 0px;" xml:space="preserve" width="40" height="40">
                <path style="fill:#010002;" d="M482.797,276.924c4.53-5.824,6.73-13.331,4.724-20.988L428.05,30.521
                    c-3.451-13.029-16.847-20.837-29.854-17.386L18.184,113.331C5.22,116.761-2.61,130.2,0.798,143.207L60.269,368.6
                    c3.408,13.007,16.868,20.816,29.876,17.408l134.278-35.419v75.476c0,42.214,69.954,64.303,139.11,64.303
                    c69.113,0,139.153-22.089,139.153-64.302V311.61C502.685,297.869,495.157,286.307,482.797,276.924z M439.763,199.226l6.212,23.469
                    l-75.541,19.953l-6.169-23.512L439.763,199.226z M395.931,50.733l11.799,44.695l-118.014,31.148l-11.799-44.695L395.931,50.733z
                    M342.975,224.744l6.04,22.951c-27.934,1.251-55.113,6.126-76.943,14.452l-4.616-17.429L342.975,224.744z M79.984,319.224
                    l-6.169-23.426l75.519-19.975l6.212,23.555L79.984,319.224z M170.625,270.237l75.476-19.953l5.716,21.506
                    c-1.834,1.122-3.559,2.286-5.242,3.473l-69.781,18.421L170.625,270.237z M477.491,424.209c0,24.612-50.993,44.544-113.958,44.544
                    c-62.9,0-113.937-19.953-113.937-44.544v-27.718c0-0.928,0.539-1.769,0.69-2.653c3.602,23.34,52.654,41.847,113.247,41.847
                    c60.614,0,109.687-18.508,113.268-41.847c0.151,0.884,0.69,1.726,0.69,2.653V424.209z M477.491,369.678
                    c0,24.591-50.993,44.522-113.958,44.522c-62.9,0-113.937-19.931-113.937-44.522V341.96c0-0.906,0.539-1.769,0.69-2.653
                    c3.602,23.318,52.654,41.869,113.247,41.869c60.614,0,109.687-18.551,113.268-41.869c0.151,0.884,0.69,1.747,0.69,2.653V369.678z
                    M363.532,356.11c-62.9,0-113.937-19.931-113.937-44.501c0-24.569,51.036-44.5,113.937-44.5c62.965,0,113.958,19.931,113.958,44.5
                    C477.491,336.179,426.497,356.11,363.532,356.11z"></path>
            </svg>
    
            <div style="
        margin: 2px 0px 0px 0px;
    ">Payment</div> </div>`,
            category: c.payment,
            draggable: ".main-content",
            content: [
                {
                    name: 'Payment',
                    type: "Payment",
                    attributes: { class: "d-flex flex-column align-items-center justify-content-center" },
                    components: [

                        {
                            attributes: { class: "mb-3" },
                            tagName: "h2",
                            name: "Cart Tittle",
                            style: { "text-align": "center", "font-weight": "bold", "padding": "0px" },
                            content: `Payment`,
                            layerable: false,
                            hoverable: false,
                            selectable: false,
                            highlightable: false,
                            droppable: false,
                            draggable: false,
                        },
                        {
                            attributes: { class: "bg-white px-md-5 px-2", style: "width: 85%" },
                            name: "Payment Tittle",
                            layerable: false,
                            hoverable: false,
                            selectable: false,
                            highlightable: false,
                            droppable: false,
                            draggable: false,
                            content:
                            `
                            <div class="row">
                                <div class=" col-xl-7 col-12">
                                    <div class="text-dark py-2 px-2 d-flex" style ="background: #f1f1f1">
                                        <h4 class="m-0 px-2  fw-bold">YOUR INFORMATION</h4>
                                    </div>
                                    <div class="py-3 px-2">
                                        <form>
                                            <div class="form-group py-1">
                                                <label class = "fw-bold" for="email">
                                                    Email 
                                                    <span class = "text-danger">*</span>
                                                    <span class = "email-alert text-danger fw-normal fst-italic" style= "display:none">Please fill your infor</span>
                                                </label>
                                                <input type="email" class="form-control" id="email" placeholder="xxx@gmail.com">
                                            </div>
                                            <div class="form-group py-1">
                                                <label class = "fw-bold" for="name">
                                                    Name 
                                                    <span class = "text-danger">*</span>
                                                    <span class = "name-alert text-danger fw-normal fst-italic" style= "display:none">Please fill your infor</span>
                                                </label>
                                                <input type="text" class="form-control" id="name" placeholder="Fill your name">
                                            </div>
                                            <div class="form-group py-1">
                                                <label class = "fw-bold" for="tel">
                                                    Phone Number
                                                    <span class = "text-danger">*</span>
                                                    <span class = "tel-alert text-danger fw-normal fst-italic" style= "display:none">Please fill your infor</span>
                                                </label>
                                                <input type="tel" class="form-control" id="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Type your phone">
                                            </div>
                                        
                                            <div class="form-group py-1">
                                                <label class = "fw-bold" for="city">City<span class = "text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="city" name="city">
                                                
                                                </select>
                                            </div>
                                            <div class="form-group py-1">
                                                <label class = "fw-bold" for="district">District<span class = "text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="district" name="district">
                                                
                                                </select>
                                            </div>  
                                            <div class="form-group py-1">
                                                <label class = "fw-bold" for="address"> Detail Address
                                                    <span class = "text-danger">*</span>
                                                    <span class = "address-alert text-danger fw-normal fst-italic" style= "display:none">Please fill your infor</span>
                                                </label>
                                                <input type="text" class="form-control" id="address" placeholder="520 Trường Trinh, TP HCM">
                                            </div>
                                            <div class="form-group py-1">
                                                <label class = "fw-bold" for="note"> Note
                                                </label>
                                                <textarea class="form-control"  name="note" id="note" cols="35" wrap="soft" maxlength="255"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="text-dark py-2 px-2 fw-bold d-flex" style ="background: #f1f1f1">
                                        <h4 class="m-0  fw-bold">DELIVERY OPTIONS</h4>
                                    </div>
                                    <div class="py-3 row px-4">
                                        <div class="form-check py-2 col">
                                            <label class="row form-check-label" for="delivery1">
                                                <div class="col">
                                                    <input class="form-check-input" type="radio" name="delivery" id="delivery1"  value="0">
                                                    <label class="form-check-label" for="delivery1">Take it at store</label>
                                                </div>
                                            </label>
                                        </div>
                                        <div class="form-check py-2  col">
                                            <label class="row form-check-label" for="delivery2">
                                                <div class="col">
                                                    <input class="form-check-input" type="radio" name="delivery" id="delivery2" value="1" checked="">
                                                    <label class="form-check-label" for="delivery2">Standard shipping</label>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="text-dark py-2 px-2 fw-bold d-flex" style ="background: #f1f1f1">
                                        <h4 class="m-0  fw-bold">PAYMENT OPTIONS</h4>
                                    </div>
                                    <div class="py-1 px-3">
                                        <div class="form-check d-flex align-items-center pt-4 border-top ">
                                            <input class="form-check-input" type="radio" name="payment" id="payment2"  value="0" checked="">
                                            <label class="form-check-label px-2" for="payment2">
                                                Cash on Delivery (COD)
                                            </label>
                                        </div>
                                        <div class="form-check d-flex align-items-center py-2 ">
                                            <input class="form-check-input align-items-center" type="radio" name="payment" id="payment1"  value="1" >
                                            <label class="form-check-label" for="payment1">
                                                <div class="d-flex flex-row px-2">
                                                    <img style="height:30px" src="data:image/png;base64,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">
                                                    <p class="pl-1 p-0 m-0">Payment by Paypal</p>
                                                </div>
                                                <div class="px-2">ATM/Visa/Master/JCB/QRCode by Paypal</div>
                                            </label>
                                        </div>
                

                                    </div>
        
                                </div>
                                <div class="col-xl-5  col-12">
                                    <div class="d-flex flex-column p-2" style ="background: #f1f1f1">
                                        <div class="d-flex flex-row justify-content-between p-1" style="border-bottom: solid;">
                                            <h4 class="m-0 fw-bold " >ORDER DETAIL</h4>
                                            <select class="form-select" aria-label="Default select example" id="currency" name="country" style = "width:90px">
                                                <option value="VND" selected="">VND</option>
                                                <option value="USD">USD</option>
                                            </select>
                                        </div>
                                        
                                        
                                        <div class="text-dark py-2 fw-bold d-flex flex-column" >
                                        
                                    
                                            <div class="table table-hover px-2 m-0 pt-2">
                                                <div class="ezMall-payment-cart-container">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div class="pb-3 px-3 d-flex flex-column">
                                            <h4 class="m-0 fw-bolder my-2"  style="border-bottom: dashed 3px;"></h4>
                                            <div class="d-flex justify-content-between fw-bold">
                                                <p class="p-0 m-0">Products Amount</p>
                                                <p class="p-0 m-0"> <span class= "ezMall-sumPrice"> </span> </p>
                                            </div>
                                            <div class="fw-bold d-flex justify-content-between">
                                                <p class=" p-0 m-0">Delivery fee</p>
                                                <p class=" p-0 m-0 "><span class= "ezMall-shipping-cost">0</span> </p>
                                            </div>
                                            <div class="fw-bold d-flex justify-content-between">
                                                <p class=" p-0 m-0">Discount</p>
                                            <p class=" p-0 m-0 "> <span class= "ezMall-discount"> 0</span> </p>
                                            </div>
                                            <div class="fw px-3 d-flex justify-content-start ezMall-discount-description" style = "display:none !important;">
                                                <p class="p-0 m-0 text-danger fw-bold px-2">Used code: </p>
                                                <div class="d-flex">
                                                    <p class="p-0  m-0 text ezMall-discount-description-text">None</p>
                                                    <button onclick= "removeDiscount()" style = "border: solid 0px black;  margin-bottom: 10px;">
                                                        <i class="fa fa-close text-dark" style="font-size: 9px;"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <h4 class="m-0 fw-bolder my-2 "  style="border-bottom: dashed 3px;"></h4>
                                            <div class="d-flex fw-bold justify-content-between py-2">
                                                <h5 class="p-0 m-0 fw-bold color-orange">Total Amount</h5>
                                                <h5 class="fw-bold p-0 m-0 color-orange "><span class= "ezMall-final-bill-cost"> </span></h5>
                                            </div>
                                        </div>  
                                        <div class="py-2">
                                            <span id="incorrect-discount-alert" class = "email-alert text-danger fw-normal fst-italic" style= "display:none">Your discount code incorrect</span>
                                            <div class = "p-0 m-0 d-flex flex-row justify-content-between">
                                                <input type="text" class="form-control pl-1" id="discount" placeholder="Enter your discount code" style="width: 68%">
                                                <button type="button" class="btn ezMall-btn  fw-bold"  onclick = "useDiscount()" style="width: 30%">Use Discount</button>
                                            </div>
                                        </div>
                                        <div class="d-grid gap-1 ">
                                            <button type="button" class="btn bg-orange fw-bold btn-block p-3 mb-3 text-light" style = 
                                            "font-size: 150%;" onclick="buy()";>
                                            BUY
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ezMall-payment-alert">
                                <div class="spinner-border ezMall-loading" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="ezMall-popup ezMall-popup-success"> 
                                    <i class="fa fa-check"></i>
                                    <h5 class="text-success fw-bolder">Order Successful</h5>
                                    <div class="ezMalll-msg fw-bold p-3 d-flex">
                                        We already send an email to you
                                    </div>
                                    <button class="btn ezMall-btn  fw-bold btn-lg">
                                        Click to go tracking page
                                    </button>
                                </div> 
                                <div class="ezMall-popup ezMall-popup-fail"> 
                                    <i class="fa fa-close text-danger"></i>
                                    <h5 class="text-danger fw-bolder">Error</h5>
                                    <div class="ezMalll-msg fw-bold p-3 d-flex">
                                        Something went wrong
                                    </div>
                                    <button class="btn btn-danger fw-bold btn-lg">
                                        Back to home page
                                    </button>
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