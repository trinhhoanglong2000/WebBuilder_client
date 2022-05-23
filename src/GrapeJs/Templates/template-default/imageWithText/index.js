import $ from "jquery";
import Quill from "quill";

export default function loadImageWithText(editor, opt = {}) {
    const c = opt;
    const bm = editor.BlockManager;
    const dc = editor.DomComponents;
    const am = editor.AssetManager;

    bm.add('imageWithText', {
        //""
        label: `<svg width="45" height="45" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect x="8" y="34" width="158" height="139" fill="url(#pattern0)"/>
        <mask id="path-2-inside-1_1128_6" fill="white">
        <rect x="108" y="127" width="148" height="118" rx="2"/>
        </mask>
        <rect x="108" y="127" width="148" height="118" rx="2" fill="#F7F5F5" stroke="black" stroke-width="10" mask="url(#path-2-inside-1_1128_6)"/>
        <rect x="115" y="145" width="129" height="12" rx="6" fill="#171717"/>
        <rect x="115" y="195" width="114" height="4" rx="2" fill="#171717"/>
        <rect x="115" y="206" width="69" height="4" rx="2" fill="#171717"/>
        <rect x="115" y="217" width="114" height="4" rx="2" fill="#171717"/>
        <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_1128_6" transform="translate(0 -0.0683453) scale(0.00195312 0.0022201)"/>
        </pattern>
        <image id="image0_1128_6" width="512" height="512" xlink:href="data:image/png;base64,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"/>
        </defs>
        </svg>
        <div>Image With Text</div>`,
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
                        target.setAttributes({ ...target.getAttributes(), 'src': asset.getSrc() })
                        
                        if (!c.validURL(asset.getSrc())) {
                            c.addTarget64Image({id: asset.cid, target: target})
                        }

                        am.close();
                    },

                });
            };

            removeBtn.onclick = () => {
                target.setAttributes({...target.getAttributes(), 'src': trait.get('src') })
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
            $(el).find("input.imageWithText-hideButton").prop('checked', (isHideButton === "none"))
            $(el).find("input.imageWithText-hideBorderText").prop('checked', (isHideBorderText === "initial"))

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