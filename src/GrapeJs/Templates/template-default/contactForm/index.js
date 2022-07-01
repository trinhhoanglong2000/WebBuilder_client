import { CONTACT_FORM_LABEL } from "../../../../asset/icon/svg";

export default function loadContactForm(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    let dc = editor.DomComponents; 

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
                            <h4 id="error"> ERROR </h4>
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
                    <div class="text-center"><button id="submitBtn" type="button" class="btn">Send</button></div>
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
    
          // This function run when component created - we setup listen to change atri
        },
    });
}