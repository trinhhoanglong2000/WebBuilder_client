import $ from "jquery";
import Quill from "quill";

export default function loadImageWithText(editor, opt = {}) {
    const c = opt;
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;
    const am = editor.AssetManager;

    bm.add('imageWithText', {
        label: "Image With Text",
        category: "Image With Text",
        content: {
            name: 'ImageWithText',
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
                    draggable: false,
                    droppable: false,
                    components: [
                        {
                            hoverable: false,
                            selectable: false,
                            draggable: false,
                            droppable: false,
                            tagName: "div",
                            attributes: { class: "col-sm-12 col-md-6 d-flex align-items-center justify-content-center" },
                            components: [
                                {
                                    tagName: 'img',
                                    layerable: false,
                                    hoverable: false,
                                    selectable: false,
                                    draggable:  false,
                                    attributes: { class: "img-thumbnail", src: "https://dummyimage.com/600x400/55595c/fff" },
                                }
                            ]
                        }, 
                        {
                            hoverable: false,
                            selectable: false,
                            draggable: false,
                            droppable: false,
                            tagName: "div",
                            attributes: { class: "col text-part d-flex align-items-center" },
                            components: [
                                {
                                    draggable: false,
                                    selectable: false,
                                    hoverable: false,
                                    tagName: "div",
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
                                },
                            ]
                        }
                    ]
                }
            ]

        }
    });

    editor.TraitManager.addType("imageWithText-heading", {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("h1").innerHTML || "";
            const placeholder = trait.get('placeholder') || "";
            const el = document.createElement("div");
            el.innerHTML = `
                <div class="gjs-field gjs-field-text">
                    <input class="imageWithText-heading" placeholder="${placeholder}" value="${initValue}" />
                </div>
            `;

            $(el)
                .find("input")
                .on("input", (ev) => this.onChange(ev));

            return el;
        },

        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".imageWithText-heading").value;
            const parent = component.get("components").models[0].get("components").models[1].get("components").models[0];
            const header = parent.get("components").models[0];

            header.set({ content: inputType });
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
            const parent = component.get("components").models[0].get("components").models[1].get("components").models[0];
            const header = parent.get("components").models[0];

            let data = inputType.value;

            header.setStyle({ ...header.getStyle(), "text-align": data });
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
            const inputType = elInput.querySelector(".ql-editor p").innerHTML;
            const parent = component.get("components").models[0].get("components").models[1].get("components").models[0];
            const content = parent.get("components").models[1];

            content.set({ content: inputType });
          },

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

            $(el).find("input").on("input", (ev) => this.onChange(ev));

            return el;
        },
        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".imageWithText-button-label");
            const parent = component.get("components").models[0].get("components").models[1].get("components").models[0];
            const button = parent.get("components").models[2];
            
            let data = `<button class="btn"> ${inputType.value} </button>`;

            if (button.get("content") !== data) {
                button.set({ content: data });
            }
        },
    });

    editor.TraitManager.addType('imageWithText-upload-image', {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("img").src;
            const el = document.createElement('div');
            el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <div class="target-img">
                        <img src=${initValue?? trait.get('src')} class="card-img-top"/>
                    </div>
                    <button type="button" class="change-btn">Change</button>
                    <button type="button" class="remove-btn">Remove</button>
                </div>
            </div>
            `;

            const changeBtn = el.querySelector('.upload-image-area .card-body button.change-btn');
            const removeBtn = el.querySelector('.upload-image-area .card-body button.remove-btn');
            const inputImage = el.querySelector('.upload-image-area .card-body img');
            const target = editor.getSelected().get("components").models[0].get("components").models[0].get("components").models[0];

            changeBtn.onclick = () => {
                am.open({
                    select(asset, complete) {
                        inputImage.src = asset.getSrc();

                        target.setAttributes({...target.getAttributes(), 'src': inputImage.src  })
                        
                        if (!c.validURL(asset.getSrc())) {
                            c.addTarget64Image({id: asset.cid, target: target})
                        }

                        am.close();
                    },

                });
            };

            removeBtn.onclick = () => {
                target.setAttributes({...target.getAttributes(), 'src': trait.src })
                inputImage.src = trait.get('src');
            };

            return el;
        },
    });

    editor.TraitManager.addType("imageWithText-advance-setting", {
        createInput({ trait }) {
            const el = document.createElement("div");  
            const isFullWidth = trait.target.getAttributes().class.includes("fluid");
            const textPart = trait.target.get("components").models[0].get("components").models[1]
            const parent = textPart.get("components").models[0];
            const isHideButton = parent.get("components").models[2].getStyle()["display"];
            const isHideBorderText =  textPart.getStyle()["border"];

            el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input imageWithText-fullwidth" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Full width
                    <label/>
                </div>
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input imageWithText-hideButton" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Hide button
                    <label/>
                </div>
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input imageWithText-hideBorderText" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Hide Border Out Side Text
                    <label/>
                </div>
            `;

            $(el).find("input.imageWithText-fullwidth").prop('checked', isFullWidth)

            $(el).find("input.imageWithText-hideButton").prop('checked', (isHideButton == "none"))

            $(el).find("input.imageWithText-hideBorderText").prop('checked', (isHideBorderText == "initial"))

            return el;
        },

        onEvent({ elInput, component, event }) {
            const value = elInput.querySelector('input.imageWithText-fullwidth').checked;
            const textPart = component.get("components").models[0].get("components").models[1];
            const parent = textPart.get("components").models[0];
            const button = parent.get("components").models[2];

            if (value) {
                component.setAttributes({...component.getAttributes(), 'class': 'container-fluid' })
            } else {
                component.setAttributes({...component.getAttributes(), 'class': 'container' })
            }

            const isHideButton = elInput.querySelector('input.imageWithText-hideButton').checked;
            if (isHideButton) {
                button.setStyle({...button.getStyle(), 'display': 'none' })
            } else {
                button.setStyle({...button.getStyle(), 'display': 'initial' })
            }

            const isHideBorderText = elInput.querySelector('input.imageWithText-hideBorderText').checked;
            console.log(textPart)
            if (isHideBorderText) {
                textPart.setStyle({...textPart.getStyle(), 'border': 'initial' })
            } else {
                textPart.setStyle({...textPart.getStyle(), 'border': '2px solid lightgray;' })
            }
        },
    });

    dc.addType('imageWithText', {
        model: {
            defaults: {
                attributes: { 'iPosition': 'left' },
                traits: [
                    {
                        type: "imageWithText-upload-image",
                        label: "Image",
                        src: "https://dummyimage.com/230x150/55595c/fff",
                    },
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
                        type: "select",
                        label: "Image position",
                        name: 'iPosition',
                        options: [
                            { id: 'left', name: 'Left' },
                            { id: 'right', name: 'Right' },
                        ]
                    },
                    {
                        name: 'setting',
                        type: 'imageWithText-advance-setting',
                    },
                ],
            },

            init() {

            },

            initData() {

            },
        },
    });
}