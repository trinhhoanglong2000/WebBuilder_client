import $ from "jquery";

export default function loadTrackingOrderForm(editor, opt = {}) {
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;
  
    const defaultType = dc.getType("default");

    bm.add("tracking-order-form", {
        label: "Tracking Order Form",
        attributes: { class: "fa fa-picture-o" },
        category: "Tracking Order",
        content: {
            type: "tracking-Order-Form",
            components: [
            {
                type: "defaultCustom",
                tagName: "div",
                attributes: { class: "card" },
                content: `
                    <h1 class="card-header"> TRACKING ORDER </h1>
                        <div class="card-body">
                        <P> Tracking your order by enter the information below.</P>
                        <p> We need your email address and order code for security </p>
                        <div class="input-form">
                            <h5 class="error"> Invalid input! </h5>
                            <input id="email" class="form-control" placeholder="Email">
                            <input id="orderCode" class="form-control" placeholder="Order code">
                        </div>
                        <div class="footer-btn">
                            <button type="button" class="btn btn-submit" id="submitBtn"> Find Order </button>
                        </div>
                    </div>
                `
            }
            ]
        }
    })

    dc.addType("tracking-Order-Form", {
        model: {
            defaults: {
                name: "Tracking Order Form",
                draggable: ".main-content",
                droppable: false,
                copyable: false,
                attributes: { class: "container", name: "trackingOrderForm", slideIndex: 1 },
            },

            init() {},
            initData() {},
        },
        view: {
            async Update() {
                function ValidateEmail(mail) {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
                        return (true)
                    }
                    return (false)
                }
                
                let submitBtn  = $(this.el).find('#submitBtn');
                let errorAlert = $(this.el).find('.error');
                let email = $(this.el).find('#email');
                let orderCode = $(this.el).find('#orderCode');

                submitBtn.on('click', () => {
                    errorAlert.css('display', 'none');
            
                    let mailInput = email.val();
                    let orderIdInput = orderCode.val();
                    if (orderIdInput && ValidateEmail(mailInput) && orderIdInput != "") {

                        let serverURL = $('script.ScriptClass').attr('src').match(/.+(?=\/js|css)/gm);
                        // TODO
                        let orderIdInput = "ACICBIDGBGFGB"
                        mailInput = "ttlgame123@gmail.com"
                        
                        fetch(`${serverURL}/stores/${opt.storeId}/order/${orderIdInput}?email=${mailInput}`)
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.statusCode === 200 || response.statusCode === 304) {
                                // TODO - REDIRECT TO TRACKING ORDER
                            } else {
                                errorAlert.html('Server erorr!')
                                errorAlert.css('display', 'initial');
                            }
                        })
                    } else {
                        errorAlert.html('Invalid input!')
                        errorAlert.css('display', 'initial')
                    }
                });
            },
            init() {
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
}