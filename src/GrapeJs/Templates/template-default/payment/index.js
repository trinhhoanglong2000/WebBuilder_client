import loadTraitPayment from "./trait";
export default function loadBlockPayMent(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    loadTraitPayment(editor, c);
    const domc = editor.DomComponents;
    const defaultType = domc.getType("default");

    const defaultData = [
        {
            image: "https://dummyimage.com/150x150/000/fff",
            name: "Vans old school",
            description: "Give customers details about the banner image(s) or content on the template.",
            price: 300,
            quantity: 2,
            productVariantId: "1",
            productVariantName: "Size 43"
        },
        {
            image: "https://dummyimage.com/150x150/000/fff",
            name: "Converse Chuck",
            description: "Give customers details about the banner image(s) or content on the template.",
            price: 200,
            quantity: 1,
            productVariantId: "2",
            productVariantName: "Size 42"
        },
        {
            image: "https://dummyimage.com/150x150/000/fff",
            name: "Image banner 3",
            description: "Give customers details about the banner image(s) or content on the template.",
            price: 100,
            quantity: 1,
            productVariantId: "3",
            productVariantName: "Size 40"
        }
    ]
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
                    },                    {
                        label: "Heading",
                        type: "Payment-Heading"
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
                        attributes: {class: "bg-white px-5", style: "width: 85%" },
                        name: "Payment Tittle",
                        layerable: false,
                        hoverable: false,
                        selectable: false,
                        highlightable: false,
                        droppable: false,
                        draggable: false,
                        content:
                        `
                        <div class="row ">
                        <div class=" col-xl-7 col-12">
                            
                            <div class="bg-primary text-white py-2 px-2 fw-bold d-flex">
                            <p class="m-0 "> ĐỊA CHỈ NHẬN HÀNG</p>
                        </div>
                        <div class="py-3">
                            <form>
                                <div class="form-group py-1">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="abc@gmail.com">
                                </div>
                                <div class="form-group py-1">
                                    <label for="first-name">Họ Tên</label>
                                    <input type="text" class="form-control" id="first-name" placeholder="Trần...">
                                </div>
                                <div class="form-group py-1">
                                    <label for="tel">Số điện thoại</label>
                                    <input type="tel" class="form-control" id="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="0942872722">
                                </div>
                             
                                <div class="form-group py-1">
                                    <label for="country">Tỉnh thành</label>
                                    <select class="form-select" aria-label="Default select example" id="country" name="country">
                                        <option value="KienGiang" selected="">Kiên Giang</option>
                                        <option value="TPHCM">TP HCM</option>
                                        <option value="HaNoi">Hà Nội</option>

                                    </select>
                                </div>
                                <div class="form-group py-1">
                                    <label for="address">Quận/huyện</label>
                                    <input type="text" class="form-control" id="district" placeholder="Quận 12">
                                </div>   <div class="form-group py-1">
                                    <label for="address">Địa chỉ nhà</label>
                                    <input type="text" class="form-control" id="address" placeholder="520 Trường Trinh, TP HCM">
                                </div>
                            </form>
                        </div>
                        <div class="bg-primary text-white py-2 px-2 fw-bold d-flex">
                            <p class="m-0 "> PHƯƠNG THỨC VẬN CHUYỂN</p>
                        </div>
                        <div class="py-3 row px-5">
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
                        <div class="bg-primary text-white py-2 px-2 fw-bold d-flex  ">
                        <p class="m-0 "> PHƯƠNG THỨC THANH TOÁN</p>
                    </div>
                    <div class="py-1 ">
                        <div class="form-check d-flex align-items-center py-2 ">
                            <input class="form-check-input align-items-center" type="radio" name="payment" id="payment1">
                            <label class="form-check-label" for="payment1">
                                <div class="d-flex flex-row px-2">
                                    <img style="height:30px" src="data:image/png;base64,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">
                                    <p class="pl-1 p-0 m-0"> Thanh toán bằng thẻ</p>
                                </div>
                                <div class="px-2">ATM/Visa/Master/JCB/QRCode qua cổng Paypal</div>
                            </label>
                        </div>
                        <div class="form-check d-flex align-items-center py-4 border-top">
                            <input class="form-check-input align-items-center" type="radio" name="payment" id="payment2">
                            <label class="form-check-label" for="payment2">
                                <div class="d-flex flex-row px-2">
                                    <img style="height:30px" src="data:image/png;base64,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">
                                    <p class="px-1 p-0 m-0"> Thanh toán qua Momo </p>
                                </div>
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
                        <div class="col-xl-5 col-12">

                           
                    <div class="bg-primary text-white py-2 px-2 fw-bold d-flex">
                        <p class="m-0 "> THÔNG TIN THANH TOÁN</p>
                    </div>
                            <table class="table table-hover mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col" class="text-center">Số lượng</th>
                                        <th scope="col" class="text-center">Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="py-1">
                                        <th scope="row">
                                            IPhone 11 chính hãng
                                        </th>
                                        <td class="text-center">
                                            1
                                        </td>
                                        <td class="text-center">500 000 VND</td>
                                    </tr>
                                    <tr class="py-1"> 
                                        <th scope="row ">
                                            IPhone 11 chính hãng
                                        </th>
                                        <td class="text-center">
                                            1
                                        </td>
                                        <td class="text-center">500 000 VND</td>
                                    </tr>
                                    <tr class="py-1">
                                        <th scope="row">
                                            IPhone 11 chính hãng
                                        </th>
                                        <td class="text-center">
                                            1
                                        </td>
                                        <td class="text-center">500 000 VND</td>
                                    </tr>
                                    <tr class="py-1">
                                        <th scope="row">
                                            IPhone 11 chính hãng
                                        </th>
                                        <td class="text-center">
                                            1
                                        </td>
                                        <td class="text-center">500 000 VND</td>
                                    </tr>
                                    <tr class="py-1">
                                        <th scope="row">
                                            IPhone 13 chính hãng
                                        </th>
                                        <td class="text-center">
                                            1
                                        </td>
                                        <td class="text-center">500 000 VND</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class=" pt-5 d-flex flex-column">
                                <h5 class="m-0 fw-bold "> TỔNG</h5>
                                <div class="d-flex justify-content-between mt-3">
                                    <p>Tạm tính</p>
                                    <h5 class="fw-bold">1 000 000 VND</h5>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <p>Vận chuyển</p>
                                    <h5 class="fw-bold">0 VND</h5>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <p>Giảm giá</p>
                                <h5 class="fw-bold">0 VND</h5>
                            </div>
                                <div class="d-flex fw-bold justify-content-between mt-2 bg-light py-2 px-1">
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
                        `
                    },

                ]
            },
        ]
    });
}