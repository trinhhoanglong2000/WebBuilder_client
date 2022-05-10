import $ from "jquery";
import Quill from "quill";
export default function loadTraitRichText(editor, opt = {}) {
  editor.TraitManager.addType("RichText-Button-Color", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const data = [
        "primary",
        "secondary ",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "link",
      ];
      const classes = trait.target.getClasses();
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].match(/(?<=btn-).*/g)) break;
      }
      const initValue = classes[i].match(/(?<=btn-).*/g)[0] || "primary";
      const el = document.createElement("div");
      el.innerHTML = `
          <div data-input="">
          <select>
          ${data
            .map(
              (opt) =>
                `<option class="bg-${opt}" id = "${opt}Color" value="${opt}">${opt}</option>`
            )
            .join("")}
            </select>

          </div>
          <div class="gjs-sel-arrow">
            <div class="gjs-d-s-arrow"></div>
          </div>
        
          `;
      $(el).find(`#${initValue}Color`).prop("selected", true);

      return el;
    },
    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector("option:checked");

      const data = inputType.value;

      //component.removeClass(`btn-${data}`)
      component.setClass(
        `btn btn-${data} align-self-center d-inline-flex justify-content-center align-items-center`
      );
    },
  });
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
            "link",

            { script: "sub" },
            { script: "super" },
            { size: "small" },
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
  editor.TraitManager.addType("RichText-Color-Trait", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const data = [
        { name: "White", value: "white/rgb(33, 37, 41)" },
        { name: "Black", value: "rgb(18, 18, 18)/rgba(255, 255, 255, 0.75)" },
        { name: "Blue", value: "rgb(51, 79, 180)/rgba(255, 255, 255, 0.75)" },
        { name: "Gray", value: "rgb(243, 243, 243)/rgba(18, 18, 18, 0.75)" },
      ];
      const initValue = (`${trait.target.getStyle()["background-color"]}/${trait.target.getStyle()["color"]}`) || "white/rgb(33, 37, 41)";
      const el = document.createElement("div");
      el.innerHTML = `
          <div data-input="">
          <select>
          ${data
            .map(
              (opt) =>
                `<option id = "${opt.name}Color" value="${opt.value}">${opt.name}</option>`
            )
            .join("")}
            </select>

          </div>
          <div class="gjs-sel-arrow">
            <div class="gjs-d-s-arrow"></div>
          </div>
        
          `;
      $(el).find(`[value="${initValue}"]`).prop("selected", true);

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("option:checked");
      let data = inputType.value.split('\/');
      component.setStyle({ ...component.getStyle(), "background-color": data[0],"color":data[1] });
    },
  });
  editor.TraitManager.addType("RichText-FullWidth-Trait", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.getStyle()["width"] ? true : false;
      const el = document.createElement("div");
      el.innerHTML = `
      <div class="gjs-one-bg">
        <label class="checkbox-product gjs-label-wrp" for="border" >
          <input class ="checkbox-input" type="checkbox" id="border" name="border" value="Bike" checked>
          <div class="checkbox_box"></div>
          Make section full width
        <label/>
      </div>
      `;

      $(el).find(`input`).prop("checked", initValue);

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("input");
      if (inputType.checked) {
        component.setStyle({
          ...component.getStyle(),
          "padding-left": "50px",
          "padding-right": "50px",
          width: "100%",
        });
      } else {
        const tmp = { ...component.getStyle() };
        delete tmp["padding-left"];
        delete tmp["padding-right"];
        delete tmp["width"];
        component.setStyle(tmp);
      }
    },
  });
  editor.TraitManager.addType("richtext-heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.get("content") || "";
      const placeholder = trait.target.get("placeholder") || "";
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
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(".Product-Heading");

      let data = inputType.value;
      //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
      if (component.get("content") !== data) {
        component.set({ content: data });
      }
    },
  });
  editor.TraitManager.addType("richtext-heading-align", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      //.Radio-Group CSS in CAnvas CSS

      const initValue = trait.target.getStyle()["text-align"] || "center";
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
      // editor.Selectors.setState('after');
      // console.log(editor.Selectors.getState())
      component.setStyle({ ...component.getStyle(), "text-align": data });
    },
  });
}
