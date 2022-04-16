export default function loadImageWithText(editor, opt = {}) {
    const c = opt;
    let bm = editor.BlockManager;

    // editor.TraitManager.addType("product-heading", {
    //     // Expects as return a simple HTML string or an HTML element
    //     createInput({ trait }) {
    //       const initValue = trait.target.get("content") || "";
    //       const placeholder = trait.get('placeholder') || "";
    //       const el = document.createElement("div");
    //       el.innerHTML = `
    
    //         <div class="gjs-field gjs-field-text">
    //           <input class="Product-Heading"placeholder="${placeholder} " value="${initValue}" />
             
    //         </div>
    //       `;
    
    //       $(el)
    //         .find("input")
    //         .on("input", (ev) => this.onChange(ev));
    
    //       return el;
    //     },
    //     onEvent({ elInput, component, event }) {
    //       //#1 when option change we will get new option => change HTML following option
    //       const inputType = elInput.querySelector(".Product-Heading");
    
    //       let data = inputType.value;
    //       //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
    //       if (component.get("content") !== data) {
    //         component.set({ content: data });
    //       }
    //     },
    //   });
    //   editor.TraitManager.addType("product-heading-align", {
    //     // Expects as return a simple HTML string or an HTML element
    //     createInput({ trait }) {
    //             //.Radio-Group CSS in CAnvas CSS
    
    //       const initValue = trait.target.getStyle()["text-align"] || "center";
    //       const el = document.createElement("div");
    //       el.innerHTML = `
    
    //         <div class="Radio-Group gjs-one-bg">
    //             <input id="left" type="radio" name="alignment" value="left" style="display:none" />
    
    //             <label for="left"class="label-radio" style="border-right: none;border-top-left-radius: 5px;border-bottom-left-radius: 5px;" >
    //                 <i class="fa fa-align-left" aria-hidden="true"></i>
    //             </label>
    
    //             <input id="center" type="radio" name="alignment" value="center" style="display:none" />
    //             <label for="center"class="label-radio">
    //                 <i class="fa fa-align-center" aria-hidden="true"></i>
    //             </label>
    
    //             <input id="right" type="radio" name="alignment" value="right" style="display:none" />
    //             <label for="right"class="label-radio" style="border-left: none;border-top-right-radius: 5px;border-bottom-right-radius: 5px;" >
    //                 <i class="fa fa-align-right" aria-hidden="true"></i>
    
    //             </label>
    //         </div>
    //       `;
    //       $(el).find(`#${initValue}`).prop('checked', true);
    
          
            
    
    //       return el;
    //     },
    //     onEvent({ elInput, component, event }) {
    //       //#1 when option change we will get new option => change HTML following option
    //       const inputType = elInput.querySelector('input[name="alignment"]:checked');
    
    //       let data = inputType.value;
    //       // editor.Selectors.setState('after');
    //       // console.log(editor.Selectors.getState())
    //       component.setStyle({ ...component.getStyle(),"text-align": data  });
    
          
    //     },
    //   });

    bm.add('imageWithText', {
        label: "Image With Text",
        category: "Image With Text",
        // attributes
        content: {
            name: 'imageWithText',
            type: 'imageWithText',
            draggable: ".main-content",
            attributes: { class: "container", name: 'imageWithText' },
            components:  [{
                tagName: 'div',
                attributes: { class: "row" },
                layerable: false,
                hoverable: false,
                selectable: false,
                components: [
                    {
                        hoverable: false,
                        selectable: false,
                        draggable: "[name='imageWithText'] .row",
                        tagName: "div",
                        attributes: { class: "col-sm-12 col-md-6 d-flex align-items-center" },
                        content: `<img src="https://dummyimage.com/600x400/55595c/fff" class="img-responsive img-fluid" alt="">`
                    }, {
                        hoverable: false,
                        selectable: false,
                        tagName: "div",
                        attributes: { class: "col text-part" },
                        draggable: "[name='imageWithText'] .row",
                        content: `
                        <h1>Picture header</h1>
                        <p>Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or event privide review.</p>
                        <div class="text-center"><button class="btn">Button label</button></div>
                        `
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
}