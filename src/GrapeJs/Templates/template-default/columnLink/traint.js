import $ from "jquery";
import Quill from "quill";
export default function loadTraitColumnLink(editor, opt = {}) {
    editor.TraitManager.addType("RichText-Text-Trait", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            const el = document.createElement("div");
            const initValue = trait.target.get("content");
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
            // $(el).find(`#${initValue}`).prop('checked', true);
            return el;
        },
        onEvent({ elInput, component, event }) {
            const inputType = elInput.querySelector(".ql-editor").innerHTML;
            //#1 when option change we will get new option => change HTML following option
            debugger
            component.set({ content: inputType });
        },
    });

    editor.TraitManager.addType("RichText-TextFontSize-Trait", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            const data = ["small", "medium", "large"];
            const initValue = trait.target.getStyle()["font-size"] || "small";
            const el = document.createElement("div");
            el.innerHTML = `
              <div data-input="">
              <select>
              ${data
                    .map(
                        (opt) =>
                            `<option id = "${opt}FontSize" value="${opt}">${opt}</option>`
                    )
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
            component.setStyle({ ...component.getStyle(), "font-size": data });
        },
    });
}