import $ from "jquery";
import Quill from "quill";
export default function loadTraitColumnItem(editor, opt = {}) {
    const am = editor.AssetManager;
    editor.TraitManager.addType("Column-Item-Trait-RichText", {
        createInput({ trait }) {
            const el = document.createElement("div");
            const initValue = trait.target.get("components").models[1].get("components").models[1].get("content");
            el.innerHTML = `
            <div id="editor" style="font-size:12px;">
            ${initValue}
            </div>
            `;
            const container = $(el).find("#editor").get(0);

            let quill = new Quill(container, {
                modules: {
                    toolbar: [
                        "bold",
                        "italic",
                        "underline",
                    ],
                },
                theme: "snow",
            });
            quill.on("text-change", (delta, oldDelta, source) => {
                if (source == "api") {
                    console.log("An API call triggered this change.");
                } else if (source == "user") {
                    this.onChange();
                }
            });
            return el;
        },
        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".ql-editor").innerHTML;
            component.get("components").models[1].get("components").models[1].set({ content: inputType });
        },
    });

    editor.TraitManager.addType("Column-Item-RichText-TextFontSize-Trait", {
        createInput({ trait }) {
            const data = ["small", "medium", "large"];
            const initValue = trait.target.get("components").models[1].get("components").models[1].getStyle()["font-size"] || "small";
            const el = document.createElement("div");
            el.innerHTML = `
              <div data-input="">
              <select>
              ${data
                    .map(
                        (opt) => `<option id = "${opt}FontSize" value="${opt}">${opt}</option>`)
                    .join("")}
                </select>
              </div>
              <div class="gjs-sel-arrow">
                <div class="gjs-d-s-arrow"></div>
              </div>
            
              `;

            $(el).find(`#${initValue}FontSize`).prop("selected", true);
            return el;
        },
        onEvent({ elInput, component, event }) {
            //#1 when option change we will get new option => change HTML following option
            const inputType = elInput.querySelector("option:checked");
            let data = inputType.value;
            component.get("components").models[1].get("components").models[1].setStyle({ ...component.getStyle(), "font-size": data });
        },
    });

    editor.TraitManager.addType("Column-Item-Heading", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            const initValue = trait.target.get("components").models[1].get("components").models[0].get("content") || "";
            const placeholder = trait.get("placeholder") || "";
            const el = document.createElement("div");
            el.innerHTML = `
            <div class="gjs-field gjs-field-text">
              <input class="Product-Heading"placeholder="${placeholder} " value="${initValue}" />
            </div>
          `;
            $(el)
                .find("input")
                .on("input", (ev) => this.onChange(ev));
            return el;
        },
        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".Product-Heading");
            let data = inputType.value;
            if (component.get("content") !== data) {
                component.get("components").models[1].get("components").models[0].set({ content: data });
            }
        },
    });

    editor.TraitManager.addType("Column-Item-Heading-Align", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            //.Radio-Group CSS in CAnvas CSS

            const initValue = trait.target.get("components").models[1].get("components").models[0].getStyle()["text-align"] || "center";
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
            $(el).find(`#${initValue}`).prop("checked", true);

            return el;
        },
        onEvent({ elInput, component, event }) {
            //#1 when option change we will get new option => change HTML following option
            const inputType = elInput.querySelector(
                'input[name="alignment"]:checked'
            );

            let data = inputType.value;
            component.get("components").models[1].get("components").models[0].setStyle({ ...component.getStyle(), "text-align": data });
        },
    });

    editor.TraitManager.addType('Column-Item-Image', {
        createInput({ trait }) {
            const initValue = trait.target.view.el.querySelector("img").src;
            const el = document.createElement('div');
            el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <div class="target-img">
                        <img src=${initValue ?? trait.get('src')} class="card-img-top"/>
                    </div>
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
                        inputImage.src = asset.getSrc();
                        const image = selected.get("components").models[0];
                        image.set('content', ` <img src="${asset.getSrc()}" class="img-responsive img-fluid" alt="">`);
                        am.close();
                    },
                });
            };
            removeBtn.onClick = () => {
            }
            return el;
        },
    });

    editor.TraitManager.addType("column-item-link", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            const initValue = trait.target.attributes.attributes.href ? trait.target.attributes.attributes.href : "";
            const placeholder = trait.get("placeholder") || "";
            const el = document.createElement("div");
            el.innerHTML = `
            <div class="gjs-field gjs-field-text">
              <input class="column-item-link"placeholder="${placeholder} " value="${initValue}" />
            </div>
          `;
            $(el)
                .find("input")
                .on("input", (ev) => this.onChange(ev));
            return el;
        },
        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".column-item-link");
            let href = inputType.value;
            component.addAttributes({ href })
        },
    });
}