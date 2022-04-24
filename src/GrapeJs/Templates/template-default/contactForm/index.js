export default function loadContactForm(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;

    bm.add('contactForm', {
        label: "Contact Form",
        category: "Contact Form",
        // attributes
        content: {
            name: 'contactForm',
            draggable: ".main-content",
            attributes: { class: "container", name: "contactForm" },
            content: `
                <h1 class="text-center">Contact form</h1>
                <form>
                    <div class="row">
                        <div class="col-md-6 col-sm-12 mb-3">
                            <input type="text" class="form-control" name="name" placeholder="Name">
                        </div>
                        <div class="col mb-3">
                            <input type="email" class="form-control" name="email" placeholder="Email">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <input type="number" class="form-control" name="pNumber" placeholder="Phone number">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <textarea class="form-control" name="comment" placeholder="Comment" rows="4"></textarea>
                        </div>
                    </div>
                    <div class="text-center"><button type="submit" class="btn">Send</button></div>
                </form>`
        }
    });
}