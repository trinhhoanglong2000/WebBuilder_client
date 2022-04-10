export default function loadImageWithText(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;
    //#region Footer

    bm.add('imageWithText', {
        label: "Image With Text",
        category: "Image With Text",
        // attributes
        content: {
            name: 'imageWithText',
            type: 'imageWithText',
            draggable: ".main-content",
            attributes: { class: "container" },
            components:  [{
                tagName: 'div',
                attributes: { class: "row" },
                components: [
                    {
                        tagName: "div",
                        attributes: { class: "col-sm-12 col-md-6 text-center" },
                        content: `<img src="https://dummyimage.com/600x400/55595c/fff" class="img-responsive img-fluid" alt="">`
                    }, {
                        tagName: "div",
                        attributes: { class: "col text-part" },
                        components: [
                            {
                                tagName: "h1",
                                type: 'product-text',
                                content: `Picture header`
                            }, {
                                tagName: "p",
                                type: 'product-text',
                                content: `Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or event privide review.`
                            }, {
                                tagName: "div",
                                attributes: { class: "text-center" },
                                components: {
                                    tagName: 'button',
                                    attributes: { class: "btn" },
                                    content: `Button label`
                                } 
                            }
                        ]
                    }]
            }]

        }
    });

    editor.DomComponents.addType('imageWithText', {
        isComponent: el => el.tagName === 'imageWithText',
        model: {
            defaults: {
                traits: [
                    
                ],
            },

            init() {

            },

            initData() {

            },

            handleThemeChange() {
                
            }
        },
    });
    //#endregion 
}