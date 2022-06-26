export default function loadTrackingOrderForm(editor, opt = {}) {
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;
  
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
    });
}