import $ from "jquery";
import { setAttribute } from "../../../../helper/utils";

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
      const inputType = $(elInput).find("input")[0].getAttribute("ezMallType");
      const val = component.getStyle()[inputType] ? component.getStyle()[inputType].replace("px", "") : "0";
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
  editor.TraitManager.addType("CustomSelect", {
    // Disbale label custom - set false for use createLabel below
    noLabel: false,
    // Label custom for trait
    createLabel({ label }) {
      return `<div>
              ${label}
            </div>`;
    },
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const data = trait.get('options') || []
      const name = trait.get('name') || ""
      // #3 Create HTML selected for trait option 
      const el = document.createElement("div");
      el.innerHTML = `
              <div data-input="">
              <select>
              ${data
          .map(
            (opt) =>
              `<option id = "${opt.id}" value="${opt.id}">${opt.name}</option>`
          )
          .join("")}
                </select>
    
              </div>
              <div class="gjs-sel-arrow">
                <div class="gjs-d-s-arrow"></div>
              </div>
            
              `;

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("option:checked");
      let data = inputType.value
      setAttribute(component,{
        [`${this.model.get('name')}`] : data
      })
      component.setStyle({ ...component.getStyle(), "background-color": data[0], "color": data[1], "border": data[2] });
    },
    onUpdate({ elInput, component }) {
      const initValue = component.getAttributes()[`${this.model.get('name')}`]
      // const initValue = (`${component.getStyle()["background-color"]}/${component.getStyle()["color"]}/${component.getStyle()["border"]}`) || "#0d6efd/#fff/#0d6efd";
      $(elInput).find(`[value="${initValue}"]`).prop("selected", true);
    },
  });
}

