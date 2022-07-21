import { WALLET_ICON } from "../../../../asset/icon/svg";

export default function loadTrackingOrder(editor, opt = {}) {
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;

    if (!opt.isDeloy) {
        bm.add("tracking-order", {
            label: "Tracking Order",
            attributes: { class: "fa fa-picture-o" },
            category: "Tracking Order",
            content: {
                type: "tracking-Order",
                components: [
                {
                    type: "defaultCustom",
                    tagName: "article",
                    attributes: { class: "card" },
                    content: `<h1 class="card-header"> Tracking order </h1>
                            <div id="tracking-order" class="card-body">
                                <h6 id="order_id">Order ID: <span></span></h6>
                                <article class="card">
                                    <div class="card-body row">
                                        <div id="customer_name" class="col-md-6 col-sm-12"> <strong>Customer:</strong> <span></span>  </div>
                                        <div id="order_time" class="col-md-6 col-sm-12"> <strong>Order time:</strong> <span></span> </div>
                                        <div id="delivery_address" class="col-md-6 col-sm-12"> <strong>Delivery Address:</strong> <span></span> </div>
                                        <div id="phone" class="col-md-6 col-sm-12"> <strong>Phone:</strong> <span></span>  </div>
                                        <div id="delivery_method" class="col-md-6 col-sm-12"> <strong>Delivery method:</strong> <span></span> </div>
                                        <div id="payment_method" class="col-md-6 col-sm-12"> <strong>Payment method:</strong> <span></span> </div>
                                        <div id="order_Status" class="col-md-6 col-sm-12"> <strong>Order status:</strong> <span> </span> </div>
                                        <div id="order_note" class="col-md-6 col-sm-12"> <strong>Note:</strong> <span> </span> </div>
                                    </div>
                                </article>
                                <div class="track">
                                    <div class="step"> <span class="icon"> ${WALLET_ICON}</i> </span> <span class="text"> Pre-pay </span> </div>
                                    <div class="step"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text"> Order placed </span> </div>
                                    <div class="step"> <span class="icon"> <i class="fa fa-gift "></i> </span> <span class="text"> In production </span> </div>
                                    <div class="step"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> In shipping  </span> </div>
                                    <div class="step"> <span class="icon"> <i class="fa fa-home"></i> </span> <span class="text"> Delivered </span> </div>
                                </div>                              
                            </div>
                            <div id="order_details" class="card-body">
                                <h1> Order Summary </h1>
                                <div class="product-bill w-md-100 w-xl-75">
                                    <div class="product">
                                        <div class="row">
                                            <div class="col-8"> Product </div>
                                            <div class="col-3"> Price </div>
                                        </div>
                                        <hr>
                                    </div>
                                    <hr>
                                    <div class="billing">
                                        <div class="row">
                                            <div class="col-md-4 col-4"> Subtotal: </div>  
                                            <div class="col-md-7 col-6" id="subtotal_price"></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 col-4"> Discount: </div>  
                                            <div class="col-md-7 col-6" id="discount_price"></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 col-4"> Total: </div>  
                                            <div class="col-md-7 col-6" id="total_price"></div>
                                            <div class="col" id="currency"> </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="show_order_details" class="card-body ">
                                <hr>
                                <button class="btn btn-show-orders"> Invoice details </button>
                                <button class="btn btn-primary btn-payment">Payment</button>
                                <button class="btn btn-cancel_order"> Cancel order </button>
                            </div>
                            <div class="modal-loader">
                                <div class="modal-content">
                                    <div id="confirm-popup">
                                        <div class="warning"> <i class="fa fa-exclamation-triangle"></i></div>
                                        <h2 id="title"> Are you sure to cancel this order? </h2>
                                        <div class="footer-button">
                                            <button class="btn btn-yes"> YES </button>
                                            <button class="btn btn-no"> NO </button>
                                        </div>
                                    </div>
                                    <div id="reason-popup">
                                        <div class="warning"> <i class="fa fa-exclamation-triangle"></i></div>
                                        <h2 id="title"> What make you want to cancel this order? </h2>
                                        <textarea class="form form-control" rows="4" cols="50" placeholder="Reason"></textarea>
                                        <div class="footer-button">
                                            <button class="btn btn-yes"> CONFIRM </button>
                                            <button class="btn btn-no"> NOT NOW </button>
                                        </div>
                                    </div>
                                    <div id="loader-popup">
                                        <div class="loader"> </div>
                                        <p> Waiting a second... </p>
                                    </div>
                                    <div id="success-popup">
                                        <div class="success"> <i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                                        <h2 id="title"> Cancel order successfully! </h2>
                                        <div class="footer-button">
                                            <button class="btn btn-ok"> OK </button>
                                        </div>
                                    </div>
                                    <div id="error-popup">
                                    <div class="error"> <p> ! </p> </div>
                                        <h2 id="title"> Server error... ! </h2>
                                        <div class="footer-button">
                                            <button class="btn btn-ok"> OK </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                }
                ]
            }
        })
    }

    dc.addType("tracking-Order", {
        model: {
            defaults: {
                name: "Tracking Order",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                
                attributes: { class: "container", name: "trackingOrder", slideIndex: 1 },
            },

            init() {},
            initData() {},
        },
    });
}