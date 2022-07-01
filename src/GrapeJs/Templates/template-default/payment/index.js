import loadTraitPayment from "./trait";
import $ from "jquery";
export default function loadBlockPayMent(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    loadTraitPayment(editor, c);
    const domc = editor.DomComponents;
    const defaultType = domc.getType("default");
    let cart = JSON.parse(localStorage.getItem('cart'));
    function insertData(rootEle,storeId){
        console.log(rootEle)
        let cart = JSON.parse(localStorage.getItem('paymentItems'));
        console.log(cart)
        let paymentCartContainer = $(rootEle).find(".ezMall-payment-cart-container")[0];
        $(paymentCartContainer).html("");
        console.log(paymentCartContainer)
        cart.forEach(element => {
            const rowHtml =
            `
            <div class=" px-1">
                <div class=" py-2 d-flex flex-row justify-content-between" >
                    <div class ="">
                        <div class = "row fw-bold"">
                        ${element.product_name} 
                        </div>
                        <div class = "row py-1 fw-bold text-secondary">
                        ${element.variant_name} 
                        </div>
                    </div>
                    <div class = "justify-content-end align-items-center d-flex px-3 ">
                        <div class = "d-flex flex-row fst-italic text-secondary">
                            <span class="fw-bold"> 
                                x
                            </span>
                            <span class="fw-bold">
                                ${element.quantity} 
                            </span>
                        </div>
                    </div>
                    <div class ="justify-content-end align-items-center d-flex fw-bold">
                        <div class="text-end">${Number(element.quantity)*Number(element.price)}  ${element.currency}</td>
                    </div> 
                </div
            </div>                                   
                            
             `
             paymentCartContainer.insertAdjacentHTML("beforeend", rowHtml);
        });
       
    }
    //THIS IS SETTING COMPONENT
    domc.addType("Payment", {
        model: {
            defaults: {
                tagName: 'div',
                droppable: false,
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
                insertData(this.el,opt.storeId )
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
                            attributes: { class: "bg-white px-5", style: "width: 85%" },
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
                            <div class=" col-xl-7 col-sm-6 col-md-6 col-12">
                                <div class="text-dark py-2 px-2 fw-bold d-flex" style ="background: #f1f1f1">
                                    <h5 class="m-0 px-2"> ĐỊA CHỈ NHẬN HÀNG</h5>
                                 </div>
                                <div class="py-3 px-2">
                                    <form>
                                        <div class="form-group py-1">
                                            <label class = "fw-bold" for="email">Email</label>
                                            <input type="email" class="form-control" id="email" placeholder="abc@gmail.com">
                                        </div>
                                        <div class="form-group py-1">
                                            <label class = "fw-bold" for="first-name">Họ Tên</label>
                                            <input type="text" class="form-control" id="first-name" placeholder="Trần...">
                                        </div>
                                        <div class="form-group py-1">
                                            <label class = "fw-bold" for="tel">Số điện thoại</label>
                                            <input type="tel" class="form-control" id="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="0942872722">
                                        </div>
                                    
                                        <div class="form-group py-1">
                                            <label class = "fw-bold" for="country">Tỉnh thành</label>
                                            <select class="form-select" aria-label="Default select example" id="country" name="country">
                                                <option value="KienGiang" selected="">Kiên Giang</option>
                                                <option value="TPHCM">TP HCM</option>
                                                <option value="HaNoi">Hà Nội</option>
        
                                            </select>
                                        </div>
                                        <div class="form-group py-1">
                                            <label class = "fw-bold" for="district">Quận/huyện</label>
                                            <input type="text" class="form-control" id="district" placeholder="Quận 12">
                                        </div>   <div class="form-group py-1">
                                            <label class = "fw-bold" for="address">Địa chỉ nhà</label>
                                            <input type="text" class="form-control" id="address" placeholder="520 Trường Trinh, TP HCM">
                                        </div>
                                    </form>
                                </div>
                                <div class="text-dark py-2 px-2 fw-bold d-flex" style ="background: #f1f1f1">
                                    <h5 class="m-0 "> PHƯƠNG THỨC VẬN CHUYỂN</h5>
                                </div>
                                <div class="py-3 row px-4">
                                    <div class="form-check py-2 col">
                                        <label class="row form-check-label" for="delivery1">
                                            <div class="col">
                                                <input class="form-check-input" type="radio" name="delivery" id="delivery1" checked="">
                                                <label class="form-check-label" for="delivery1">Nhận tại cửa hàng</label>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-check py-2  col">
                                        <label class="row form-check-label" for="delivery2">
                                            <div class="col">
                                                <input class="form-check-input" type="radio" name="delivery" id="delivery2">Vận chuyển tiêu chuẩn (30 000 VND)</div>
                                        </label>
                                    </div>
                                </div>
                                <div class="text-dark py-2 px-2 fw-bold d-flex" style ="background: #f1f1f1">
                                    <h5 class="m-0 "> PHƯƠNG THỨC THANH TOÁN</h5>
                                </div>
                                <div class="py-1 px-3">
                                    <div class="form-check d-flex align-items-center py-2 ">
                                        <input class="form-check-input align-items-center" type="radio" name="payment" id="payment1">
                                        <label class="form-check-label" for="payment1">
                                            <div class="d-flex flex-row px-2">
                                                <img style="height:30px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA6lBMVEX///8DL4YUnN4BIWkAI4KAirMAIIICJXEVoOKVosMAlNwALYUAE2AAmuAAKoQNcrQAKIMAHIEAG2WCwOkAFn8AGmQAJYICKHYDLYEAF2MMaKrn9Pvl6fGd1PEAF4Hs8PYAD38hR5S1wtsANY7M1eYHR4pVtegRiswAEF/c4u10vuna7/mq2fKAx+4QgcbQ6feHmb9VbafDz+IyU5oQQZVsgLGquNMjRpRqf7J3h7NKZKOSosZCWpugrcw7g7o6rOcEMXcGO38JV5kENHkLYKIKWqQOcroLYqyo1/C74vVhuOgIT52OzvBdcadTS3TIAAAHJElEQVR4nO2cAVvaSBCGYUVMWTZCrlBD8dCKorZFi9TqtR5qvbtq7f//O5dARZTATJLd2W2feX+Aj++zybezkx0KBYZhGIZhGIZhGIZhGIZhGIZhGIZhGCY1nYvVbByfdrudju1/H+a4WS9lpP7ny7K//WH1YuCy50ldFnMgpV+LTYcfT9u2VZL5UM7j94jfrG8Nj7u2deYZbOkRHCNL5e0Xrq3keUmjYeTol4vnB7alnnDiazWMJUs75w7lTsfPFTMLHMufTm2LTTl4qV8wwq+fubKMb+pGDIvF8okjb+NnTXvFPDXfjZ1Dc5TO4m85sYp/1YwZRoHjwNbYGRqI0im1bftx0zb3kMaUz2wLFgZmNosHZN36vnhhLEon+EPbr6LBKJ1Q/mjZ8IfBKB0ja3Z3xY7+uvs5Jbth094xuVmMkTtW9/2uqap0hvJnm4anBIb+iU3DY8ObRYyUNh/TH03zhsWyzV3/i+nNIqZ0bk+wbbTufqBm8UU8oFjCohzaMxwQRGncYLR3hjLXwnhC016YnlFEaRQ19kpTkiiNtgtrhp1t43W3ZcMD83X3GHtP6aBMZGgtaXAtjI1Xa3heRWxsPPsLNWu7BaqFsbaShUh16imlLUFUNziT31RzbOlvWzP8BEfpqzyGY8noIf1iSxDTwsgpOJZsrtoy7MIVzYYGw5X9v48sGZ7CUarFsNFX7+0YHoNRKvO+hhMqQo2sLOMH+CnNtlU8JbgUQijv1oIhIko1CK4Eu56IeUcuiLmFocMwbE0MFfkqHiAqGh2GQX9iKLy3xIZviKL0UvxEjYgNES0MHVH68BrGisSbBqKFoSNKw/WpoVC0zynigK9BcCXozRjekRoiDoc6BK/EDKSL2EbcK9VgGN54s4aUb+LgT1BQR5Q2erOGwiM0vID73Rqi9OlDKkSFsD6F624dhtXWkyUU6p7OENHC0LFZqKdrKPboDBEf1vL7Na69Z4Z0L2IHMWSR33C/99xQvaYy7FJE6UzFNjUkO2EgbmHkN9zvPRcUapPKEHELI3eUJiyhUH9QGVLU3fNvIaUh4kJbXsP5ICU1pGhhPN8LSQ0RgyR5g6a6nrCEdIaIQZKcho2EmKE0NN7CCC6TnlHCwhTx6TBf0DT6iUsoFFXb1HTdHbaSBYUiOj51PpmN0vA62Y+uLm2b/bAW7i4SJDtbdI1uFuGVWPCMCkHVFUbcwsgepcsE1SGRISJKMxtWkzfCn4ZURwvEIEnWKN2/WSJIdjzEDJJk8wuCxFrt0ZAqSuFbGNmCpnqVcGCyETRduEmTxbARtBZnzGQJqXreRloYQXUXWEDCLo2BFkYQfu0DCxgbEgnqb2FEfuuwH+FXYMTt5zSGYWO378F+hLshYpAE/RoG4f5lq4fyI/x8iBgkQRlGduEVWi8SJPtogRgkWW4YBI2wWl3bvYnCBe1HePrFtjBiiwTClbWvu9etfi+VXYxH9s3iDNPCCC+vW+tz9Pu9XtyA8dLaCdJP3IgWxkpwo7wFpDWbLiHZNQXEIIlsLC+gs0B2NEQNkvhLj0DZILzWBg+SyA3tfpRLiGhh+P8YWEKyIMW0MGr/ajeskH0ZLWCitLmgYZ0dunImBo7SZkWzoBCkF9rAKJVStx9dvRYDD5LIoeaHlDJHC5jbz7qjlPr6M3yhTXOUqhHhRhEDD5LojVJyQUSUlsCemdOCiEGSmj4/4o1wDDxIInf0LSFxio6Bo1R+12WoLAw7FQov4M3iP02Gao96DmgM3A329WwWyqMstmf4DkZpTcdmobz31Bn6ANxn8/PX3ZGflQc0BjFIspNXT402ba1fATNIkqvuVqoyurc1uj0BHiTJWneriNHhN2tP5wOruupu9UilorzR3uHmrcVn8xG4heH3MX7i7n5zzLd3t7dHr+3/XvAU+MOanL9gPy9oZy/HgBgkQUSphXIaDTxIgolS8qnsFMC3MHy47rZxYEADfzqswXU3/W8HpACuuxFVqcsPKWKQRMItDPK+RBrgFsYOXHc7nKSIQRI5BAWFy0EDD5IgWhiUs7yp+f2jVM+nQ5ejVEvdTfk1Ny0dxA8ngXU3+c/MpAEeJEFEKfEPlKQDHiTBVKWWfnwNhZZbGLTfc1OipYVBNX2WCXiQBFN3uxylYN0tES0Ml6MUMd4MtzCcjtIDsN8tt2FDl6O0XYTOTpgotfRFCccx1IfCRKnLdXehcLZVXspLOErpfmAmG4MXS/kMvoakv9ZlgNfw0cnlFgaCI1DQ6V4pgtvkn3qYNXQ6SmHuYUO3oxTkDjZ0uYWBYAS+h8L2v5gPRJS6XHcjOIL3e5frbgSIKHW5G4xgEzZ0uYWB4BA2dLmFgQCOUrJxc0P89lFagJfwF6/ZCiPgPXS6oY/iSC1TVC5fo8Hydq+yEHX3ixfdDMMwDMMwDMMwDMMwDMMwDMMwDMMwDGOQ/wH+YuDLDiZk8wAAAABJRU5ErkJggg==">
                                                <p class="pl-1 p-0 m-0"> Thanh toán bằng thẻ</p>
                                            </div>
                                            <div class="px-2">ATM/Visa/Master/JCB/QRCode qua cổng Paypal</div>
                                        </label>
                                    </div>
            
                                    <div class="form-check d-flex align-items-center pt-4 border-top ">
                                        <input class="form-check-input" type="radio" name="payment" id="payment3" checked="">
                                        <label class="form-check-label px-2" for="payment3">
                                            Thanh toán khi nhận hàng
                                        </label>
                                    </div>
                                </div>
    
                            </div>
                            <div class="col-xl-5 col-sm-6 col-md-6   col-12">
                                <div>
                                    <div class="text-dark py-2 px-2 fw-bold d-flex" style ="background: #f1f1f1">
                                        <h5 class="m-0 "> THÔNG TIN THANH TOÁN</h5>
                                    </div>
                                        <table class="table table-hover mt-4">
                                            <tbody class="ezMall-payment-cart-container">
                                            
                                            </tbody>
                                        </table>
                                        <div class=" pt-5 d-flex flex-column">
                                            <h5 class="m-0 fw-bold "> TỔNG</h5>
                                            <div class="d-flex justify-content-between mt-3">
                                                <p class="fw-bold">Tạm tính</p>
                                                <h5 class="fw-bold">1 000 000 VND</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p class="fw-bold">Vận chuyển</p>
                                                <h5 class="fw-bold">0 VND</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p class="fw-bold">Giảm giá</p>
                                            <h5 class="fw-bold">0 VND</h5>
                                        </div>
                                            <div class="d-flex fw-bold justify-content-between mt-2  py-2 px-1">
                                                <p class="p-0 m-0">THÀNH TIỀN</p>
                                                <h5 class="fw-bold p-0 m-0 text-danger">1 000 000 VND</h5>
                                            </div>
            
                                            <div class="d-flex flex-row justify-content-between mt-3">
                                                <input type="text" class="form-control" id="discount" placeholder="Vui lòng nhập mã giảm giá" style="width: 70%">
                                                <button type="button" class="btn btn-outline-dark fw-bold" style="width: 30%">Áp dụng</button>
                                            </div>
                                        </div>
                                        <div class="d-grid gap-1">
                                            <button type="button" class="btn btn-danger fw-bold mt-4 btn-block p-3">ĐẶT HÀNG</button>
                                        </div>
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