import { CONTACT_FORM_LABEL } from "../../../../asset/icon/svg";
import $ from "jquery";

export default function loadContactForm(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    let dc = editor.DomComponents; 

    const defaultType = dc.getType("default");

    bm.add('contactForm', {
        category: "Contact Form",
        label: `
        ${CONTACT_FORM_LABEL}
        <div>Contact Form</div>
        `,
        content: {
            type: "contact-Form",
            attributes: { class: "container", name: "contactForm" },
            content: `
                <h1 class="text-center">Contact form</h1>
                <div>
                    <div class="row mb-2">
                        <div class="col">
                            <h4 id="error"> Invalid input! </h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-12 mb-3">
                            <input id="name" type="text" class="form-control" placeholder="Name">
                        </div>
                        <div class="col mb-3">
                            <input id="email" type="email" class="form-control" placeholder="Email">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input id="pNumber" type="text" class="form-control" placeholder="Phone number">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <textarea class="form-control" id="comment" placeholder="Comment" rows="4"></textarea>
                        </div>
                    </div>
                    <div class="text-center"><button id="submitBtn" type="button" class="btn btn-ok">Send</button></div>
                </div>
                <div class="modal-loader">
                    <div class="modal-content">
                        <div id="loader-popup">
                            <div class="loader"> </div>
                            <p> Waiting a second... </p>
                        </div>
                        <div id="success-popup">
                            <div class="success"> <i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                            <h2 id="title"> Send mail successfully! </h2>
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
                </div>`
        }
    });

    dc.addType("contact-Form", {
        model: {
          defaults: {
            name: 'Contact Form',
            draggable: ".main-content",
            droppable: false,
            editable: false,
            copyable: false,
          },
          init() {
          },
    
          updated(property, value, prevValue) {
          },
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
                
                function validPhonenumber(pNumber) {
                    let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    if(pNumber.match(phoneno)) {
                      return true;
                    }
                    else {
                      return false;
                    }
                }

                let submitBtn  = $(this.el).find('#submitBtn');
                let modalLoader = $(this.el).find('.modal-loader');
                let loaderPopup = modalLoader.find('#loader-popup');
                let successPopup = modalLoader.find('#success-popup');
                let errorPopup = modalLoader.find('#error-popup');
                let errorLabel = $(this.el).find('#error');
                let name = $(this.el).find('#name');
                let email = $(this.el).find('#email');
                let pNumber = $(this.el).find('#pNumber');
                let comment = $(this.el).find('#comment');

                submitBtn.on('click', () => {
                    let nameInput = name.val()?.trim();
                    let emailInput = email.val()?.trim();
                    let pNumberInput = pNumber.val()?.trim();
                    let commentInput = comment.val()?.trim();
             
                    if (nameInput && commentInput && nameInput != "" && commentInput != "" && 
                        validPhonenumber(pNumberInput) && ValidateEmail(emailInput)) {
                        
                        modalLoader.css('display', 'block');
                        loaderPopup.css('display', 'initial');
                        successPopup.css('display', 'none');
                        errorPopup.css('display', 'none');
                        errorLabel.css('display', 'none');

                        let requestOptions = {
                            method: 'POST',
                            body: JSON.stringify({
                                "name": nameInput,
                                "email": emailInput,
                                "phone": pNumberInput,
                                "comment": commentInput,
                            }),
                            headers: {"Content-type": "application/json; charset=UTF-8"}
                        };
            
                        fetch(`${process.env.REACT_APP_API_URL}stores/${opt.storeId}/contact-form`, requestOptions)
                            .then((response) => response.json())
                            .then((response) => {
                                if (response.statusCode == 200) {
                                    loaderPopup.css('display', 'none');
                                    successPopup.css('display', 'initial');
            
                                    successPopup.find('.footer-button .btn-ok')
                                    .on('click', function() {
                                        modalLoader.css('display', 'none');
                                    })
                                } else {
                                    loaderPopup.css('display', 'none');
                                    errorPopup.css('display', 'initial');
            
                                    errorPopup.find('.footer-button .btn-ok')
                                    .on('click', function() {
                                        modalLoader.css('display', 'none');
                                    })
                                }
                            });
                    } else {
                        errorLabel.css('display', 'initial').html('Invalid input!');
                    }
                })
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