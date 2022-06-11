import $ from "jquery";
export default function loadCommonTrait(editor, opt = {}) {

    editor.TraitManager.addType("padding-setting", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            const el = document.createElement("div");
            const initValue = trait.target.getStyle()[trait.get("typeSetting")] ? trait.target.getStyle()[trait.get("typeSetting")].replace("px", "") : "0";
            el.innerHTML = `
          <div class="d-flex align-items-center gjs-one-bg">
            <input ezMallType="${trait.get("typeSetting")}" type="range" id="padding" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="p-0" 
                 min="0" max="100" value="${initValue.replace("px", "")}" step="1">
             <label class="m-0" for="padding">Cowbell</label>
            </div>
            `;
            $(el).find("label").text(`${initValue}px`);
            $(el)
                .find("input")
                .on("input", () => {
                    this.onChange();
                });

            return el;
        },
        onUpdate({ elInput, component }) {
            const inputType =  $(elInput).find("input")[0].getAttribute("ezMallType");
            const val = component.getStyle()[inputType] ? component.getStyle()[inputType].replace("px", ""): "0";
            $(elInput).find("label").text(`${val}px`);
            $(elInput).find("input").val(val)
        },
        onEvent({ elInput, component, event }) {
            const inputType = $(elInput).find("input")[0].value;
            $(elInput).find("label").text(`${inputType}px`);
            let cssType = {};
            cssType[$(elInput).find("input")[0].getAttribute("ezMallType")] = `${inputType}px`
            component.setStyle({ ...component.getStyle(), ...cssType });
        },
    });
}

