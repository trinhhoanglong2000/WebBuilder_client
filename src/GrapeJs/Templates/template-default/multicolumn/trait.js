import $ from "jquery";
export default function loadTraitMulticolumnItem(editor, opt = {}) {
  editor.TraitManager.addType("multicolumn-heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.get("components").models[0].get("content") || "";
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");
      el.innerHTML = `
        <div class="gjs-field gjs-field-text">
          <input class="multicolumn-heading"placeholder="${placeholder} " value="${initValue}" />
        </div>
      `;
      $(el)
        .find("input")
        .on("input", (ev) => this.onChange(ev));
      return el;
    },
    onUpdate({ elInput, component }) {
      const val = component.get("components").models[0].get("content") || "";
      $(elInput).find(`.multicolumn-heading `).val(val);
    },
    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".multicolumn-heading");
      let data = inputType.value;
      component.get("components").models[0].set({ content: data });
    },
  });

  editor.TraitManager.addType("multicolumn-heading-align", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      //.Radio-Group CSS in CAnvas CSS

      const initValue = trait.target.get("components").models[0].getStyle()["text-align"] || "center";
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
    onUpdate({ elInput, component }) {
      $(elInput).find(`input[name="alignment"]:checked`).prop("checked",false);
      $(elInput).find(`input[name="alignment"][value=${component.getAttributes().headAlign}] `).prop("checked",true);
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(
        'input[name="alignment"]:checked'
      );

      let headAlign = inputType.value;
      component.get("components").models[0].setStyle({ ...component.getStyle(), "text-align": ` ${headAlign}!important` });
      const attr =
      {
        ...component.get('attributes'),
        'headAlign': headAlign
      }
      delete attr.class;
      component.set('attributes', attr)
    },
  });

  editor.TraitManager.addType("multicolumn-padding-mode", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.attributes.attributes.paddingMode ? true : false;
      const el = document.createElement("div");
      el.innerHTML = `
          <div class="gjs-one-bg">
            <label class="checkbox-product gjs-label-wrp" for="border" >
              <input class ="checkbox-input" type="checkbox" id="border" name="border" ${initValue ? "checked" : ""} >
              <div class="checkbox_box"></div>
              Container Mode
            <label/>
          </div>
          `;

      $(el).find(`input`).prop("checked", initValue);

      return el;
    },
    onUpdate({ elInput, component }) {
      $(elInput).find("input").val(component.getAttributes().paddingMode);
      $(elInput).find("input").prop("checked",component.getAttributes().paddingMode);
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("input");
      let paddingMode = inputType.checked;

      const attr =
      {
        ...component.get('attributes'),
        'paddingMode': paddingMode
      }
      delete attr.class;
      component.set('attributes', attr)

      if (inputType.checked) {
        component.addClass(`container`);
      } else {
        component.removeClass(`container`);
      }
    },
  });

  editor.TraitManager.addType("multicolumn-numCols", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {

      const el = document.createElement("div");
      const initValue = trait.target.attributes.attributes.numCols ? trait.target.attributes.attributes.numCols : 3;
      el.innerHTML = `
              <div class="d-flex align-items-center gjs-one-bg">
                <input type="range" id="cowbell" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="p-0" name="numPRoduct" 
                     min="2" max="4" value="${initValue}" step="1">
                 <label class="m-0" for="numPRoduct">Cowbell</label>
                </div>
                `;
      $(el).find("label").text(initValue);
      $(el)
        .find("input")
        .on("input", () => {
          this.onChange();
        });

      return el;
    },
    onUpdate({ elInput, component }) {
      $(elInput).find("input").val(component.getAttributes().numCols);
      $(elInput).find("label").html(component.getAttributes().numCols);
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option

      const numCols = $(elInput).find("input")[0].value;
      $(elInput).find("label").text(numCols);
      let oldType = component.getAttributes().numCols;

      const attr =
      {
        ...component.get('attributes'),
        'numCols': numCols
      }
      delete attr.class;
      component.set('attributes', attr)
      
      component.removeClass(`multicolumn-numCols-${oldType}`);
      component.addClass(`multicolumn-numCols-${numCols}`);
    },
    
  });

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