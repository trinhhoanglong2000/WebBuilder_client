import $ from "jquery";
import Quill from "quill";

export default function loadImageWithText(editor, opt = {}) {
    const c = opt;
    const bm = editor.BlockManager;
    const am = editor.AssetManager;

    editor.TraitManager.addType("imageWithText-heading", {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("h1").innerHTML || "";
            const placeholder = trait.get('placeholder') || "";
            const el = document.createElement("div");
            el.innerHTML = `
                <div class="gjs-field gjs-field-text">
                    <input class="imageWithText-heading"placeholder="${placeholder}" value="${initValue}" />
                </div>
            `;

            $(el)
                .find("input")
                .on("input", (ev) => this.onChange(ev));

            return el;
        },
        onEvent({ elInput, component, event }) {
              const inputType = elInput.querySelector(".imageWithText-heading");
              let data = inputType.value;

              const header = component.get("components").models[0].get("components").models[1].get("components").models[0];
              if (header.get("content") !== data) {
                header.set({ content: data });
              }
        },
    });

    editor.TraitManager.addType("imageWithText-content", {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("p").innerHTML || "";
            const placeholder = trait.get('placeholder') || "";
            const el = document.createElement("div");

            el.innerHTML = `
                <div class="imageWithText-content" style="font-size:12px;">
                    ${(initValue === "")? placeholder: initValue}
                </div>
            `;

            const container = $(el).find(".imageWithText-content").get(0);

            let quill = new Quill(container, {
              modules: {
                toolbar: [
                  "bold",
                  "italic",
                  "underline",
                  "link",
                  
                  { script: "sub" },
                  { script: "super" },
                  { size: "small" },
                ],
              },
              theme: "snow",
            });
            quill.on("text-change", (delta, oldDelta, source) => {
              if (source === "api") {
                console.log("An API call triggered this change.");
              } else if (source === "user") {
                this.onChange();
              }
            });
      
            return el;
          },
          onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".ql-editor").innerHTML;

            const content = component.get("components").models[0].get("components").models[1].get("components").models[1];
            content.set({ content: inputType });
          },

        
        // onEvent({ elInput, component, event }) {
        //     const inputType = elInput.querySelector(".imageWithText-content");
        //     let data = inputType.value;

        //     const header = component.get("components").models[0].get("components").models[1].get("components").models[1];
        //     if (header.get("content") !== data) {
        //         header.set({ content: data });
        //     }
        // },
    });

    editor.TraitManager.addType("imageWithText-button-label", {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector(".btn").innerHTML || "";
            const placeholder = trait.get('placeholder') || "";
            const el = document.createElement("div");

            el.innerHTML = `
                <div class="gjs-field gjs-field-text">
                    <input class="imageWithText-button-label" placeholder="${placeholder}" value="${initValue}" />
                </div>
            `;

            $(el)
                .find("input")
                .on("input", (ev) => this.onChange(ev));

            return el;
        },
        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".imageWithText-button-label");
            let data = `<button class="btn"> ${inputType.value} </button>`;

            const button = component.get("components").models[0].get("components").models[1].get("components").models[2];
            if (button.get("content") !== data) {
                button.set({ content: data });
            }
        },
    });

    editor.TraitManager.addType("imageWithText-heading-align", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            const initValue = trait.target.getStyle()["text-align"] || "left";
            const el = document.createElement("div");
            el.innerHTML = `
    
            <div class="Radio-Group gjs-one-bg">
                <input id="left" type="radio" name="alignment" value="left" style="display:none" />
    
                <label for="left"class="label-radio" style="border-right: none;border-top-left-radius: 5px;border-bottom-left-radius: 5px;" >
                    <i class="fa fa-align-left" aria-hidden="true"></i>
                </label>
    
                <input id="center" type="radio" name="alignment" value="center" style="display:none" />
                <label for="center"class="label-radio">
                    <i class="fa fa-align-center" aria-hidden="true"></i>
                </label>
    
                <input id="right" type="radio" name="alignment" value="right" style="display:none" />
                <label for="right"class="label-radio" style="border-left: none;border-top-right-radius: 5px;border-bottom-right-radius: 5px;" >
                    <i class="fa fa-align-right" aria-hidden="true"></i>
                </label>
            </div>
          `;
            $(el).find(`#${initValue}`).prop('checked', true);

            return el;
        },

        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector('input[name="alignment"]:checked');
            let data = inputType.value;
            
            const header = component.get("components").models[0].get("components").models[1].get("components").models[0];
            header.setStyle({ ...header.getStyle(), "text-align": data });
        },
    });

    editor.TraitManager.addType('imageWithText-image', {
        createInput({ trait }) {
            const el = document.createElement('div');
            el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <img src=${trait.get('src') ?? "https://dummyimage.com/230x150/55595c/fff"} class="card-img-top"/>
                    <button type="button" class="change-btn">Change</button>
                    <button type="button" class="remove-btn">Remove</button>
                </div>
            </div>
            `;

            const changeBtn = el.querySelector('.upload-image-area .card-body button.change-btn');
            const removeBtn = el.querySelector('.upload-image-area .card-body button.remove-btn');
            const inputImage = el.querySelector('.upload-image-area .card-body img');
            changeBtn.onclick = () => {
                am.open({
                    select(asset, complete) {
                        const selected = editor.getSelected();

                        trait.set('src', asset.getSrc());
                        inputImage.src = asset.getSrc();

                        const image = selected.get("components").models[0].get("components").models[0];
                        image.set('content', `<img src="${asset.getSrc()}" class="img-responsive img-fluid" alt="">`);
                        
                        am.close();
                    },

                });
            };
            removeBtn.onClick = () => {
                trait.set('src', null);
            }

            return el;
        },
    });


    bm.add('imageWithText', {
        label: "Image With Text",
        category: "Image With Text",
        // attributes
        content: {
            name: 'imageWithText',
            type: 'imageWithText',
            draggable: ".main-content",
            attributes: { class: "container", name: 'imageWithText' },
            components: [
                {
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
                            attributes: { class: "col-sm-12 col-md-6 d-flex align-items-center justify-content-center" },
                            content: `<img src="https://dummyimage.com/600x400/55595c/fff" class="img-responsive img-fluid" alt="">`
                        }, 
                        {
                            hoverable: false,
                            selectable: false,
                            tagName: "div",
                            attributes: { class: "col text-part" },
                            draggable: "[name='imageWithText'] .row",
                            components: [
                                {
                                    draggable: false,
                                    selectable: false,
                                    hoverable: false,
                                    tagName: "h1",
                                    style:{"text-align":"left"},
                                    content: `Picture header`
                                }, 
                                {
                                    draggable: false,
                                    selectable: false,
                                    hoverable: false,
                                    tagName: "p",
                                    content:`Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or event privide review.`  
                                }, 
                                {
                                    draggable: false,
                                    selectable: false,
                                    hoverable: false,
                                    attributes: { class: "text-center" },
                                    tagName: "div",
                                    content:`<button class="btn">Button label</button>`  
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    });

    editor.DomComponents.addType('imageWithText', {
        isComponent: el => el.tagName === 'imageWithText',
        model: {
            defaults: {
                traits: [
                    {
                        type: "imageWithText-heading",
                        label: "Heading",
                        placeholder: "Header",
                    },
                    {
                        type: "imageWithText-heading-align",
                        label: "Heading Alignment",
                    },
                    {
                        type: "imageWithText-content",
                        label: "Content",
                        placeholder: "Content",
                    },
                    {
                        type: "imageWithText-button-label",
                        label: "Button label",
                        placeholder: "Button label",
                    }, 
                    {
                        type: "imageWithText-image",
                        label: "Image",
                        placeholder: "Button label",
                        src: null,
                    }
                ],
            },

            init() {
                console.log(editor.getSelected());
            },

            initData() {

            },
        },
    });
}