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
        onEvent({ elInput, component, event }) {
            //#1 when option change we will get new option => change HTML following option
            const inputType = elInput.querySelector(
                'input[name="alignment"]:checked'
            );

            let data = inputType.value;
            component.get("components").models[0].setStyle({ ...component.getStyle(), "text-align": data });
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
        onEvent({ elInput, component, event }) {
            //#1 when option change we will get new option => change HTML following option
            const inputType = elInput.querySelector("input");
            let paddingMode = inputType.checked;
            component.addAttributes({ paddingMode })
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
        onEvent({ elInput, component, event }) {
          //#1 when option change we will get new option => change HTML following option
          
          const numCols = $(elInput).find("input")[0].value;
          $(elInput).find("label").text(numCols);
          let oldType = component.getAttributes().numCols;
          component.addAttributes({ numCols })
          component.removeClass(`multicolumn-numCols-${oldType}`);
          component.addClass(`multicolumn-numCols-${numCols}`);
        },
      });

      editor.TraitManager.addType("padding-setting", {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
          const el = document.createElement("div");
          const initValue = trait.target.attributes.attributes.padding ? trait.target.attributes.attributes.padding : 5;
          
          el.innerHTML = `
              <div class="d-flex align-items-center gjs-one-bg">
                <input type="range" id="cowbell" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="p-0" name="numPRoduct" 
                     min="0" max="50" value="${initValue}" step="5">
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
        onEvent({ elInput, component, event }) {
          const numCols = $(elInput).find("input")[0].value;
          $(elInput).find("label").text(numCols);
          let oldType = component.getAttributes().numCols;
          component.addAttributes({ numCols })
          component.removeClass(`multicolumn-numCols-${oldType}`);
          component.addClass(`multicolumn-numCols-${numCols}`);
        },
      });
}