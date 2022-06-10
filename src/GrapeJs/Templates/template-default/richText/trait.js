import $ from "jquery";
import Quill from "quill";
import { readCookie } from "../../../../helper/cookie";
import { validURL } from "../../../../helper/utils";
import { COLLECTION_ICON,
  PRODUCTS_ICON,
  PAGES_ICON,
  PRIVACY_ICON,
  URL_ICON, 
  BACK_BUTTON_ICON,
  DELETE_BUTTON_ICON,
  NO_IMAGE_ICON } from "../../../../asset/icon/svg";

export default function loadTraitRichText(editor, opt = {}) {

  editor.TraitManager.addType("RichText-Button-Color", {
    // Expects as return a simple HTML string or an HTML element

    createInput({ trait }) {

      const data = [
        { name: "Primary", value: "#0d6efd/#fff/#0d6efd" },
        { name: "Secondary", value: "#6c757d/#fff/#6c757d" },
        { name: "Success", value: "#198754/#fff/#198754" },
        { name: "Danger", value: "#dc3545/#fff/#dc3545" },
        { name: "Warning", value: "#ffc107/#000/#ffc107" },
        { name: "Info", value: "#0dcaf0/#000/#0dcaf0" },
        { name: "Light", value: "#f8f9fa/#fff/#f8f9fa" },
        { name: "Dark", value: "#212529/#fff/#212529" },
        { name: "Link", value: "transparent/##0d6efd/none" },


      ];
      
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

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("option:checked");
      let data = inputType.value.split('\/');
      component.setStyle({ ...component.getStyle(), "background-color": data[0], "color": data[1],"border": data[2] });
    },
    onUpdate({ elInput, component }) {
      const initValue = (`${component.getStyle()["background-color"]}/${component.getStyle()["color"]}/${component.getStyle()["border"]}`) || "#0d6efd/#fff/#0d6efd";
      $(elInput).find(`[value="${initValue}"]`).prop("selected", true);


    },
  });
  editor.TraitManager.addType("RichText-Button-heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");
      el.innerHTML = `

        <div class="gjs-field gjs-field-text">
          <input class="Product-Heading"placeholder="${placeholder} " />
         
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
    onUpdate({ elInput, component }) {
      const initValue = component.get("content") || "";
      $(elInput).find('input').val(initValue)

    },
  });
  editor.TraitManager.addType("RichText-Text-Trait", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      // const initValue = trait.target.get("content");
      const el = document.createElement("div");
      // el.innerHTML = `
      //   <div id="editor" style="font-size:12px;">
      //   ${initValue}
      //   </div>
      //   `;
        el.innerHTML = `
        <div id="editor" style="font-size:12px;">
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
    onUpdate({ elInput, component }) {
      const initValue = component.get("content");
      $(elInput).find('#editor .ql-editor').empty().append(initValue)
    },
  });

  editor.TraitManager.addType("RichText-TextFontSize-Trait", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const data = ["Small", "Medium", "Large"];
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


      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("option:checked");
      let data = inputType.value;
      component.setStyle({ ...component.getStyle(), "font-size": data.toLowerCase() });
    },
    onUpdate({ elInput, component }) {
      const initValue = component.getStyle()["font-size"] || "small";
      $(elInput).find(`#${initValue}FontSize`).prop("selected", true);
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

      return el;
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("option:checked");
      let data = inputType.value.split('\/');
      component.setStyle({ ...component.getStyle(), "background-color": data[0], "color": data[1] });
    },
    onUpdate({ elInput, component }) {
      const initValue = (`${component.getStyle()["background-color"]}/${component.getStyle()["color"]}`) || "white/rgb(33, 37, 41)";
      $(elInput).find(`[value="${initValue}"]`).prop("selected", true);


    },
  });
  editor.TraitManager.addType("RichText-FullWidth-Trait", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
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
    onUpdate({ elInput, component }) {
      const initValue = component.getStyle()["width"] ? true : false;
      $(elInput).find(`input`).prop("checked", initValue);
    },
  });
  editor.TraitManager.addType("richtext-heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const placeholder = trait.target.get("placeholder") || "";
      const el = document.createElement("div");
      el.innerHTML = `

        <div class="gjs-field gjs-field-text">
          <input class="Product-Heading"placeholder="${placeholder} " />
         
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
    onUpdate({ elInput, component }) {
      const initValue = component.get("content") || "";
      $(elInput).find('input').val(initValue)

    },
  });
  editor.TraitManager.addType("richtext-heading-align", {
    
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      //.Radio-Group CSS in CAnvas CSS
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
      // $(el).find(`#${initValue}`).prop("checked", true);

      return el;
    },
    onUpdate({ elInput, component }) {
      const initValue = component.getStyle()["text-align"] || "center";
      $(elInput).find(`#${initValue}`).prop("checked", true);

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
    onUpdate({ elInput, component }) {
      let initValue = component.attributes.traitValue?.split(/;(.*)/s) || "";

      let previousValue = initValue[1] || ""
      if (!component.get('attributes').href) {
        initValue=""
        previousValue =""
        component.set('traitValue','')
      }
      let defaultIcons = ""
      if (initValue[0] == "Collections") {
        defaultIcons = COLLECTION_ICON
      }
      else if (initValue[0] == "Products") {
        defaultIcons = PRODUCTS_ICON

      }
      else if (initValue[0] == "Pages") {
        defaultIcons = PAGES_ICON

      }
      else if (initValue[0] == "Privacy") {
        defaultIcons = PRIVACY_ICON

      }
      else if (initValue[0]=="_URL_LINK")
      {
        defaultIcons =URL_ICON
      }

      if (previousValue !== "") {
        $(elInput).find('input').css('padding-left', '39px');
        $(elInput).find('#icons').css("display", "block")

        $(elInput).find('input').css('padding-right', '25px');
        $(elInput).find('#delete_icon').css("display", "block")

      }
      else {
        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#icons').css("display", "none")

        $(elInput).find('input').css('padding-left', '');
        $(elInput).find('#delete_icon').css("display", "none")
      }
      $(elInput).find('input').val(previousValue)
      $(elInput).find('#icons').empty().append(defaultIcons)
     
    },
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
      let defaultIcons = ""
      const el = document.createElement("div");
      let clicked = false
      
      const initValue = trait.target.attributes.traitValue?.split(/;(.*)/s) || "";
      let previousValue = initValue[1] || ""
      if (initValue[0] == "Collections") {
        defaultIcons = COLLECTION_ICON
      }
      else if (initValue[0] == "Products") {
        defaultIcons = PRODUCTS_ICON

      }
      else if (initValue[0] == "Pages") {
        defaultIcons = PAGES_ICON

      }
      else if (initValue[0] == "Privacy") {
        defaultIcons = PRIVACY_ICON

      }
      else if (initValue[0]=="_URL_LINK")
      {
        defaultIcons =URL_ICON
      }
      const defaultMenu_Collection = `
      
        <li data-value ="Collections" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
          ${COLLECTION_ICON}
          <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Collections
          </span>
        </li>
      `
      const defaultMenu_Products = `
        <li data-value ="Products" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
        ${PRODUCTS_ICON}  
        <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Products
          </span>
        </li>`
      const defaultMenu_Pages = `
        <li data-value ="Pages" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
        ${PAGES_ICON}  
        <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Pages
          </span>
        </li>    `
      const defaultMenu_Privacy = ` 
        <li data-value ="Privacy" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
        ${PRIVACY_ICON}
        <span style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;margin-left:10px">
            Privacy Policy
          </span>
        </li>         
        `
      const Backbutton = ` <li id="Back-btn"class="btn d-none  " style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex;justify-content: space-between; align-items:center">
      <span>
      ${BACK_BUTTON_ICON}
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
          ${DELETE_BUTTON_ICON}
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
          ${URL_ICON}
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
            $(el).find('#icons').empty().append(URL_ICON)

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
        if (State == "Collections") {
          _data = data.data.map(ele => {
            return {
              name: ele.name,
              id: ele.id,
              thumbnail: ele.thumbnail
            }
          })
        }
        else if (State=="Products"){
          _data = data.data.map(ele => {
            return {
              name: ele.title,
              id: ele.id,
              thumbnail: ele.thumbnail
            }
          })
        }
        else if (State=="Pages"){
          _data = data.data.map(ele => {
            return {
              name: ele.name,
              url : ele.page_url,
            }
          })

        }
        let domdata = "";
        _data.forEach((element) => {
          const url = element.url ? element.url.slice(1) : `${State.toLowerCase()}/${element.id}`

          const img = element.thumbnail ? `
        <img style= "width:25px;height:25px;min-width:25px;" src="${element.thumbnail}">
        `: NO_IMAGE_ICON

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
        $(el).find('#result').text(`${_data.length} results`)
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
              $(el).find('#icons').empty().append(COLLECTION_ICON)
            }
            else if (State == "Products") {
              $(el).find('#icons').empty().append(PRODUCTS_ICON)

            }
            else if (State == "Pages") {
              $(el).find('#icons').empty().append(PAGES_ICON)

            }
            else if (State == "Privacy") {
              $(el).find('#icons').empty().append(PRIVACY_ICON)

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
        $(el).find('ul').addClass('combobox-hidden')
        setTimeout(() => {
          if (!clicked) {
            GetItem()
          } else {
            clicked = false;
          }
        }, 200)
        // const value = trait.target.attributes.traitValue?.split(/;(.*)/s) || "";
        const value = _this.target.get('traitValue') ? _this.target.attributes.traitValue?.split(/;(.*)/s)[1] : ''
        $(el).find('input').val(value)

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
      component.set('attributes',{
        ...component.get('attributes'),
        'href':value
      })
      component.set('traitValue', event.traitValue)

      // component.setAttributes({ ...component.getAttributes(), 'href': value })

    },
    
  });
}
