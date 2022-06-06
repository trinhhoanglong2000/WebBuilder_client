import $ from "jquery";
import Quill from "quill";
import AbortController from "abort-controller";
import { readCookie } from "../../../../helper/cookie";
import { validURL } from "../../../../helper/utils";

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
  editor.TraitManager.addType("RichText-Button-heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.get("content") || "";
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
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(".Product-Heading");

      let data = inputType.value;
      //#2 This function will set attribute data {nameAttribute:Value} => IMPORTAINT FOR COMPONENT LISTEN CHANGE ATTRIBUTE
      if (component.get("content") !== data) {
        component.set({ content: data });
      }
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
      //COPY FROM HERE
      quill.on("text-change", (delta, oldDelta, source) => {
        this.onChange();
        // if (source == "api") {
        // } else if (source == "user") {
        //   this.onChange();
        // }
      });
      const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      const regex = new RegExp(expression);
      $(el).find('.ql-action').addClass('btn')
      $(el).find('.ql-remove').addClass('btn')
      $(el).find('.ql-link').on('click', () => {
        $(el).find('.ql-tooltip input').val("")
        if ($(el).find('.ql-tooltip input').val().match(regex)) {
          $(el).find('.ql-action').removeClass('disabled-btn')
        }
        else {
          $(el).find('.ql-action').addClass('disabled-btn')
        }
      })
      $(el).find('.ql-tooltip input').on("input", function (ev) {

        if ($(this).val().match(regex)) {
          $(el).find('.ql-action').removeClass('disabled-btn')
        }
        else {
          $(el).find('.ql-action').addClass('disabled-btn')
        }
      });
      var newdiv = document.createElement("div")
      newdiv.id = "tool-bar-custom"
      $(el).find('.ql-tooltip').append(newdiv)
      $(el).find('.ql-action').appendTo($(el).find('#tool-bar-custom'))
      $(el).find('.ql-remove').appendTo($(el).find('#tool-bar-custom'))
      //TO HERE
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
      component.setStyle({ ...component.getStyle(), "background-color": data[0], "color": data[1] });
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
      component.setStyle({ ...component.getStyle(), "text-align": data });
    },
  });
  editor.TraitManager.addType("richtext-Btn-Link", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {

      const debounce = (fn, delay = 1000) => {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            fn(...args)
          }, delay);
        };
      };
      var GetRequest = debounce(async (url) => {
        fetch(url, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${readCookie('token')}`,
          },
          redirect: "follow",
        })
          .then(response => response.json())
          .then(data => {
            updateUI(data)
          })
          .catch(() => { })

      }, 200)
      const _this = this;
      const initValue = trait.target.attributes.traitValue.split(/;(.*)/s) || "";
      let defaultIcons = ""
      const el = document.createElement("div");
      let clicked = false
      let previousValue = initValue[1] || ""
      const Collection_icon = `<svg style =" width:25px;height:25px;min-width:25px;" 
      viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M6.948.001c.394 0 .772.159 1.052.439l1.477 1.68-3.638 4.12a3.568 3.568 0 0 0-.872 2.33v9.43h-2.48a1.48 1.48 0 0 1-1.051-.44 1.507 1.507 0 0 1-.436-1.06v-9.88a1.497 1.497 0 0 1 .377-1l3.48-4 1.04-1.18a1.48 1.48 0 0 1 1.052-.439zm7.092 2.439 4.58 5.13c.247.275.383.631.381 1v9.93c0 .399-.159.78-.441 1.062a1.51 1.51 0 0 1-1.065.439h-9.039a1.509 1.509 0 0 1-1.033-.457 1.497 1.497 0 0 1-.423-1.044v-9.88a1.487 1.487 0 0 1 .382-1l3.524-4.001 1.005-1.18a1.51 1.51 0 0 1 2.128 0zm-1.9 5.807a1.51 1.51 0 0 0 1.901-.186 1.497 1.497 0 0 0-.489-2.447 1.512 1.512 0 0 0-1.641.325 1.498 1.498 0 0 0 .228 2.308z"></path></svg>          
      `
      const Products_icon = `<svg style =" width:25px;height:25px;min-width:25px;" 
      viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M10.293 1.293a1 1 0 0 1 .707-.293h7a1 1 0 0 1 1 1v7a1 1 0 0 1-.293.707l-9 9a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414l9-9zm5.207 4.707a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
      `
      const Pages_icon = `<svg  style =" width:25px;height:25px;min-width:25px;" 
      viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M12.44.44a1.5 1.5 0 0 0-1.062-.44h-6.878a1.5 1.5 0 0 0-1.5 1.5v17a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-12.879a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122z"></path></svg>
      `
      const Privacy_icon = `<svg style =" width:25px;height:25px;min-width:25px;" 
      viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M7 5h5v2h-5v-2zm5 4h-5v2h5v-2z"></path><path fill-rule="evenodd" d="M16 17a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-1.5a1.5 1.5 0 0 1 1.5-1.5h1.5v-10a3 3 0 0 1 3-3h11a3 3 0 1 1 0 6h-1v10zm-11-13a1 1 0 0 1 1-1h8.17c-.11.313-.17.65-.17 1v13a1 1 0 1 1-2 0v-3h-7v-10zm12-1a1 1 0 0 0-1 1v1h1a1 1 0 1 0 0-2zm-7 14c0 .35.06.687.17 1h-7.17a1 1 0 0 1-1-1v-1h8v1z"></path></svg>
      `
      const URL_icon =`<svg style =" width:25px;height:25px;min-width:25px;" 
      viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M11 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-1.586l-5.293 5.293a1 1 0 0 1-1.414-1.414l5.293-5.293h-1.586a1 1 0 0 1-1-1zm-8 2.5a1.5 1.5 0 0 1 1.5-1.5h3.5a1 1 0 0 1 0 2h-3v8h8v-3a1 1 0 1 1 2 0v3.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-9z"></path></svg>`
      
      if (initValue[0] == "Collections") {
        defaultIcons = Collection_icon
      }
      else if (initValue[0] == "Products") {
        defaultIcons = Products_icon

      }
      else if (initValue[0] == "Pages") {
        defaultIcons = Pages_icon

      }
      else if (initValue[0] == "Privacy") {
        defaultIcons = Privacy_icon

      }
      else if (initValue[0]=="_URL_LINK")
      {
        defaultIcons =URL_icon
      }
      const defaultMenu_Collection = `
      
        <li data-value ="Collections" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
          ${Collection_icon}
          <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Collections
          </span>
        </li>
      `
      const defaultMenu_Products = `
        <li data-value ="Products" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
        ${Products_icon}  
        <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Products
          </span>
        </li>`
      const defaultMenu_Pages = `
        <li data-value ="Pages" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
        ${Pages_icon}  
        <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Pages
          </span>
        </li>    `
      const defaultMenu_Privacy = ` 
        <li data-value ="Privacy" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
        ${Privacy_icon}
        <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Privacy Policy
          </span>
        </li>         
        `
      const Backbutton = ` <li id="Back-btn"class="btn d-none  " style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex;justify-content: space-between; align-items:center">
      <span>
      <svg style =" width:20px;height:20px;" 
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>
      Back
      </span>
      <span id="result" class="d-none d-xl-inline" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px;font-size: 10px;font-style: italic">
        3 results
      </span>
    </li>`
      el.innerHTML = `
      <div id= "Link-combo" class="combo gjs-field gjs-field-text">
        <div style="width:100%;display:flex;align-items:center;position:relative;">
          <div id="icons" style = "position: absolute;z-index: 2;margin-left: 10px;${previousValue === '' ? 'display:none' : ''}">
          ${defaultIcons}
          </div>
          <input style = "${previousValue === '' ? '' : 'padding-left: 39px;padding-right:25px'}" type="text" id="state" value="${previousValue}" size="10" placeholder="Paste a link or search" autocomplete="off">
          <div id="delete_icon" class="" style= " z-index: 2; position: absolute; right: 0;margin-right: 5px;${previousValue === '' ? 'display:none' : ''}" >
          <svg  style =" width:20px;height:20px;" 
          viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-2.293 4.293a1 1 0 0 0-1.414 1.414l2.293 2.293-2.293 2.293a1 1 0 1 0 1.414 1.414l2.293-2.293 2.293 2.293a1 1 0 1 0 1.414-1.414l-2.293-2.293 2.293-2.293a1 1 0 0 0-1.414-1.414l-2.293 2.293-2.293-2.293z"></path></svg>
          </div>
        </div>
        <ul class="combobox-hidden">
         ${Backbutton}

         <div id="Link-menu">
         
         </div>
        </ul>
      </div>       
      `;
      let State = "Main-Menu"
      $(el).find('#Back-btn').on('click', function () {
        State = "Main-Menu"
        $(el).find('#Back-btn').addClass('d-none')
        $(el).find('input').focus()
        clicked = false
        GetItem()
      })

      const GetItem = async (name = "", flag = false) => {
        name = name.trim()
        if (validURL(name)) {
          let domdata = "";
          domdata += `
          <li data-value ="${1}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
          ${URL_icon}
          <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
              ${name}
          </span>
          </li>    
        `
          $(el).find('#result').text(`${1} results`)
          $(el).find("#Link-menu").empty().append(domdata);

          $(el).find('#Link-menu li').on('click', function () {
            const text = $(this).find('span').text().trim()
            $(el).find('input').val(text)

            // $(el).find('input').focus()
            $(el).find('ul').addClass('combobox-hidden')
            $(el).find('#Back-btn').addClass('d-none')
            previousValue = text
            if (previousValue !== "") {
              $(el).find('input').css('padding-left', '39px');
              $(el).find('#icons').css("display", "block")

              $(el).find('input').css('padding-right', '25px');
              $(el).find('#delete_icon').css("display", "block")

            }
            else {
              $(el).find('input').css('padding-left', '');
              $(el).find('#icons').css("display", "none")

              $(el).find('input').css('padding-left', '');
              $(el).find('#delete_icon').css("display", "none")
            }
            $(el).find('#icons').empty().append(URL_icon)

            _this.onChange({ valueHref: name, traitValue: `${"_URL_LINK"};${previousValue}` })

            State = "Main-Menu"
            clicked = false
          })
        }
        else if (State == "Main-Menu") {
          const arr = ["Collections", "Products", "Pages", "Privacy"]
          let domdata = "";
          const regex = new RegExp(`.*${name.toUpperCase()}.*`, 'g');
          arr.forEach((ele, index) => {
            if (regex.test(ele.toUpperCase()) || name == "") {
              if (index == 0) {
                domdata += defaultMenu_Collection
              }
              else if (index == 1) {
                domdata += defaultMenu_Products
              }
              else if (index == 2) {
                domdata += defaultMenu_Pages
              }
              else if (index == 3) {
                domdata += defaultMenu_Privacy
              }

            }
          })
          if (domdata === "") {
            domdata += `
            <li data-value ="" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex;pointer-events:none">
            <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
              No results
            </span>
          </li>
          `
          }
          $(el).find("#Link-menu").empty().append(domdata);

          $(el).find('#Link-menu li').on('click', function () {
            clicked = true
            State = $(this).data('value')
            // $(el).find('input').val("")
            $(el).find('input').focus()

            GetItem()
          })
        }
        else {
          if ($(el).find('#loadingDiv').length === 0) {
            $(el).find("#Link-menu").empty().append(`<div id="loadingDiv">
            <div ></div>
          </div>`);
          }
          $(el).find('#Back-btn').removeClass('d-none')

          let url = ""
          if (State == "Collections") {
            url = `stores/${opt.storeId}/collections/product?name=${name.trim()}`
          }
          else if (State == "Products") {
            url = `stores/${opt.storeId}/products?title=${name.trim()}`
          }
          else if (State == "Pages") {
            url = `stores/${opt.storeId}/pages?is_default=false&name=${name.trim()}`
          }
          else if (State == "Privacy") {

          }
          GetRequest(
            `${process.env.REACT_APP_API_URL}${url}`
          )

        }

      };

      const updateUI = (data) => {
        let _data = []
        let domdata = "";
        let count =0;
        if (State == "Collections") {
          _data = data.data.map(ele => {
            return {
              name: ele.name,
              id: ele.id,
              thumbnail: ele.thumbnail
            }
          })
          if (_data.length!==0) {
            count=1;
            domdata+=`
            <li data-value ="${State.toLowerCase()}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
            ${Collection_icon}
            <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            ${`All collections`}
            </span>
            </li>    
            `
          }
        }
        else if (State=="Products"){
          _data = data.data.map(ele => {
            return {
              name: ele.title,
              id: ele.id,
              thumbnail: ele.thumbnail
            }
          })
          if (_data.length!=0) {
            count=1;
            domdata+=`
            <li data-value ="${State.toLowerCase()}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
            ${Products_icon}
            <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            ${`All products`}
            </span>
            </li>    
            `
          }
        }
        else if (State=="Pages"){
          _data = data.data.map(ele => {
            return {
              name: ele.name,
              url : ele.page_url,
            }
          })

        }
        
        _data.forEach((element) => {
          const img = element.thumbnail ? `
        <img style= "width:25px;height:25px;min-width:25px;" src="${element.thumbnail}">
        `: `
        <svg style =" width:25px;height:25px;min-width:25px;" 
          viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M1 2.5a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-12zm8 2.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6.57 9h-11.143c-.351 0-.548-.368-.343-.632l3.046-3.24a.448.448 0 0 1 .617-.009l1.396 1.481 2.623-3.825a.446.446 0 0 1 .72.016l3.462 5.609c.154.272-.052.6-.377.6z"></path><path d="M6 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
          
        `

        const url = element.url ? element.url.slice(1) : `${State.toLowerCase()}/${element.id}`
          domdata += `
          <li data-value ="${url}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
          ${element.thumbnail !== undefined? img:""}
          <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
              ${element.name}
          </span>
          </li>    
        `;
        });
        if (domdata === "") {
          domdata += `
        <li data-value ="Products" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex;pointer-events:none">
        <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
          No results
        </span>
      </li>
      `
        }
        $(el).find('#result').text(`${_data.length+count} results`)
        $(el).find("#Link-menu").empty().append(domdata);

        $(el).find('#Link-menu li').on('click', function () {
          const text = $(this).find('span').text().trim()
          $(el).find('input').val(text)

          // $(el).find('input').focus()
          $(el).find('ul').addClass('combobox-hidden')
          $(el).find('#Back-btn').addClass('d-none')
          previousValue = text
          if (previousValue !== "") {
            $(el).find('input').css('padding-left', '39px');
            $(el).find('#icons').css("display", "block")

            $(el).find('input').css('padding-right', '25px');
            $(el).find('#delete_icon').css("display", "block")

            if (State == "Collections") {
              $(el).find('#icons').empty().append(Collection_icon)
            }
            else if (State == "Products") {
              $(el).find('#icons').empty().append(Products_icon)

            }
            else if (State == "Pages") {
              $(el).find('#icons').empty().append(Pages_icon)

            }
            else if (State == "Privacy") {
              $(el).find('#icons').empty().append(Privacy_icon)

            }
          }
          else {
            $(el).find('input').css('padding-left', '');
            $(el).find('#icons').css("display", "none")

            $(el).find('input').css('padding-left', '');
            $(el).find('#delete_icon').css("display", "none")
          }
          _this.onChange({ valueHref: $(this).data('value'), traitValue: `${State};${previousValue}` })

          State = "Main-Menu"
          clicked = false
        })

      }
      // ==============================
      $(el).find('#delete_icon').on('click', function () {
        const text = ""
        $(el).find('input').val(text)
        $(el).find('ul').addClass('combobox-hidden')
        $(el).find('#Back-btn').addClass('d-none')
        previousValue = text
        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none")

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none")
        State = "Main-Menu"
        clicked = false
        _this.onChange({ valueHref: "", traitValue: "" })
      })
      GetItem()
      $(el).find('input').focusin(function () {
        $(el).find('ul').removeClass('combobox-hidden')

      })
      $(el).find('input').focusout(function (e) {
        if (previousValue=="")
        {
          $(el).find('input').css('padding-left', '');
          $(el).find('#delete_icon').css("display", "none")
        }

        $(el).find('ul').addClass('combobox-hidden')
        setTimeout(() => {
          if (!clicked) {
            GetItem()
          } else {
            clicked = false;
          }
        }, 200)

        $(el).find('input').val(previousValue)

      })

      $(el).find('input').on("input", function (ev) {
        const valueInput = $(this)[0].value
        if (valueInput) {
          $(el).find('input').css('padding-right', '25px');
          $(el).find('#delete_icon').css("display", "block")
        }
        else {
          $(el).find('input').css('padding-right', '');
          $(el).find('#delete_icon').css("display", "none")
        }

        GetItem(valueInput)
      })
      return el;
    },
    onEvent({ elInput, component, event }) {
      if (event.type) {
        return
      }
      const value = event.valueHref ? event.valueHref : '#'
      component.setAttributes({ ...component.getAttributes(), 'href': `/${value}` })
      component.set('traitValue', event.traitValue)

    },
  });
}
