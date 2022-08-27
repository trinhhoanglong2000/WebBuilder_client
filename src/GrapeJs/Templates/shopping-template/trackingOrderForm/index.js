import $ from "jquery";
import { TRACKING_ICON } from "../../../../asset/icon/svg";

export default function loadTrackingOrderForm(editor, opt = {}) {
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;
  
    const defaultType = dc.getType("default");
    if (!opt.isDeloy) {
        bm.add("tracking-order-form", {
            label: `${TRACKING_ICON}
                <div>Tracking Order Form</div>`,
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
                                <h5 class="error"> </h5>
                                <h5 class="notify"> </h5>
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
    }

    dc.addType("tracking-Order-Form", {
        model: {
            defaults: {
                name: "Tracking Order Form",
                // draggable: ".main-content",
                draggable: false,
                droppable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                removable: false,
                copyable: false,
                attributes: { class: "container", name: "trackingOrderForm", slideIndex: 1 },
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
                      type: "CustomSelect",
                      label: "Theme color",
                      name: "theme",
                      options: [
                        { id: "white", name: "White" },
                        { id: "black", name: "Black" },
                        { id: "lGreen", name: "Light Green" },
                        { id: "lBlue", name: "Light Blue" },
                        { id: "sand", name: "Sand" },
                      ],
                    },
                ],
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
                let notifyAlert = $(this.el).find('.notify');
                let email = $(this.el).find('#email');
                let orderCode = $(this.el).find('#orderCode');

                submitBtn.on('click', () => {
                    errorAlert.css('display', 'none');
            
                    let mailInput = email.val();
                    let orderIdInput = orderCode.val();
                    if (orderIdInput && ValidateEmail(mailInput) && orderIdInput != "") {
                        
                        fetch(`${process.env.REACT_APP_API_URL}stores/${opt.storeId}/order/${orderIdInput}?email=${mailInput}`)
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.statusCode === 200 || response.statusCode === 304) {
                                if (response.data.length <= 0) {
                                    notifyAlert.html('Order could not be found!')
                                    notifyAlert.css('display', 'initial');
                                } 
                            } else {
                                errorAlert.html('Server error!')
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