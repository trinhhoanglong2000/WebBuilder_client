import $ from "jquery";
import Quill from "quill";
import {
  COLLECTION_ICON,
  PRODUCTS_ICON,
  PAGES_ICON,
  PRIVACY_ICON,
  URL_ICON,
  BACK_BUTTON_ICON,
  DELETE_BUTTON_ICON,
  NO_IMAGE_ICON
} from "../../../../../asset/icon/svg";
import { readCookie } from "../../../../../helper/cookie";
import { validURL, setAttribute } from "../../../../../helper/utils";
export default function loadTraitColumnItem(editor, opt = {}) {
  const am = editor.AssetManager;
  editor.TraitManager.addType("Column-Item-Trait-RichText", { // redo undo ok
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
          
        } else if (source == "user") {
          this.onChange();
        }
      });
      return el;
    },
    onUpdate({ elInput, component }) {
      const val = component.get("components").models[1].get("components").models[1].get("content") || "";
      $(elInput).find(`.ql-editor`).empty().append(val);
    },
    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".ql-editor").innerHTML;
      component.get("components").models[1].get("components").models[1].set({ content: inputType });
    },
  });

  editor.TraitManager.addType("Column-Item-RichText-TextFontSize-Trait", { // redo undo ok
    createInput({ trait }) {
      const data = ["small", "medium", "large"];
      const initValue = trait.target.get("components").models[1].get("components").models[1].getStyle()["font-size"] || "medium";
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
    onUpdate({ elInput, component }) {
      const val = component.getAttributes().TextFontSize
      $(elInput).find("option:checked").prop("selected", false);
      $(elInput).find(`option[value = ${val}]`).prop("selected", true);
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector("option:checked");
      let TextFontSize = inputType.value;
      setAttribute(component, {
        'TextFontSize': TextFontSize
      })
      component.get("components").models[1].get("components").models[1].setStyle({ ...component.getStyle(), "font-size": `${TextFontSize}!important` });
    },
  });

  editor.TraitManager.addType("Column-Item-Heading", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      const initValue = trait.target.attributes.attributes.heading ? trait.target.attributes.attributes.heading : ""
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
    onUpdate({ elInput, component }) {
      const val = component.get("attributes").heading ?? ""
      $(elInput).find(`.Product-Heading `).val(val);
    },
    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".Product-Heading");
      let data = inputType.value?inputType.value:"";
      component.get("components").models[1].get("components").models[0].set({ content: `<a href="${component.get("attributes").href??"#"}" >${data} </a>` });
      setAttribute(component, {
        'heading': data
      })

    },
  });

  editor.TraitManager.addType("Column-Item-Heading-Align", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      //.Radio-Group CSS in CAnvas CSS

      const initValue = trait.target.attributes.attributes.textAlight || "center";
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
      $(el).find(`input#${initValue}`).prop("checked", true);
      return el;
    },
    onUpdate({ elInput, component }) {
      $(elInput).find(`input[name="alignment"]:checked`).prop("checked", false);
      $(elInput).find(`input[name="alignment"][value=${component.getAttributes().textAlight}] `).prop("checked", true);
    },
    onEvent({ elInput, component, event }) {
      //#1 when option change we will get new option => change HTML following option
      const inputType = elInput.querySelector(
        'input[name="alignment"]:checked'
      );

      let textAlight = inputType.value;
      setAttribute(component, {
        'textAlight': textAlight
      })

      component.get("components").models[1].get("components").models[0].setStyle({ ...component.getStyle(), "text-align": `${textAlight}!important` });
    },
  });

  // editor.TraitManager.addType('Column-Item-Image', {
  //     createInput({ trait }) {
  //         const initValue = trait.target.view.el.querySelector("img").src;
  //         const el = document.createElement('div');
  //         el.innerHTML = `
  //         <div class="card upload-image-area">
  //             <div class="card-body">
  //                 <div class="target-img">
  //                     <img src=${initValue ?? trait.get('src')} class="card-img-top"/>
  //                 </div>
  //                 <button type="button" class="change-btn">Change</button>
  //                 <button type="button" class="remove-btn">Remove</button>
  //             </div>
  //         </div>
  //         `;

  //         const changeBtn = el.querySelector('.upload-image-area .card-body button.change-btn');
  //         const removeBtn = el.querySelector('.upload-image-area .card-body button.remove-btn');
  //         const inputImage = el.querySelector('.upload-image-area .card-body img');
  //         changeBtn.onclick = () => {
  //             am.open({
  //                 select(asset, complete) {
  //                     const selected = editor.getSelected();
  //                     inputImage.src = asset.getSrc();
  //                     const image = selected.get("components").models[0];
  //                     image.set('content', ` <img src="${asset.getSrc()}" class="img-responsive img-fluid" alt="">`);
  //                     am.close();
  //                 },
  //             });
  //         };
  //         removeBtn.onClick = () => {
  //         }
  //         return el;
  //     },
  // });

  editor.TraitManager.addType("Column-Item-Image", {
    createInput({ trait }) {
      const initValue = trait.target.view.el.querySelector("img").src;
      const el = document.createElement("div");
      el.innerHTML = `
                <div class="card upload-image-area">
                    <div class="card-body">
                        <div class="target-img">
                            <img src=${initValue ?? trait.get("src")
        } class="card-img-top"/>
                        </div>
                        <button type="button" class="change-btn">Change</button>
                        <button type="button" class="remove-btn">Remove</button>
                    </div>
                </div>
                `;

      const changeBtn = el.querySelector(
        ".upload-image-area .card-body button.change-btn"
      );
      const removeBtn = el.querySelector(
        ".upload-image-area .card-body button.remove-btn"
      );
      const inputImage = el.querySelector(".upload-image-area .card-body img");
      const target = editor
        .getSelected()
        .get("components")
        .models[0];

      changeBtn.onclick = () => {
        am.open({
          select(asset, complete) {
            const selected = editor.getSelected();
            inputImage.src = asset.getSrc();
            const image = selected.get("components").models[0];
            image.set('content', `<a href="${selected.get("attributes").href??"#"}" > <img src="${asset.getSrc()}" class="img-responsive img-fluid" alt=""> </a>`);
            am.close();
          },
        });
      };

      removeBtn.onclick = () => {
        const selected = editor.getSelected();
        const image = selected.get("components").models[0];

        image.set('content', `<a href="${selected.get("attributes").href??"#"}" > <img src="https://dummyimage.com/600x400/55595c/fff" class="img-responsive img-fluid" alt=""> </a>`);
        inputImage.src = "https://dummyimage.com/600x400/55595c/fff";
      };

      return el;
    },

    onUpdate({ elInput, component }) {
      const initValue = component?.view.el.querySelector("img").src;
      const inputImage = elInput.querySelector('.upload-image-area .card-body img');

      if (initValue) {
        inputImage.src = initValue;
      } else {
        inputImage.src = elInput.get("srcDefault");
      }

    }
  });

  editor.TraitManager.addType("Column-Link", {
    // Expects as return a simple HTML string or an HTML element
    onUpdate({ elInput, component }) {
      let initValue = component.attributes.traitValue?.split(/;(.*)/s) || "";

      let previousValue = initValue[1] || ""
      if (!component.get('attributes').href) {
        initValue = ""
        previousValue = ""
        component.set('traitValue', '')
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
      else if (initValue[0] == "_URL_LINK") {
        defaultIcons = URL_ICON
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
      else if (initValue[0] == "_URL_LINK") {
        defaultIcons = URL_ICON
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
               Policies
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
          name = name.match(/^https?:\/\//gm) ? name : `https://${name}`

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
            url = `stores/${opt.storeId}/pages/policy`
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
          _data.unshift({
            name: 'All collections',
            id: null,
            icon: COLLECTION_ICON
          });
        }
        else if (State == "Products") {
          _data = data.data.map(ele => {
            return {
              name: ele.title,
              id: ele.id,
              thumbnail: ele.thumbnail
            }
          })
          _data.unshift({
            name: 'All products',
            id: null,
            icon: PRODUCTS_ICON
          });
        }
        else if (State == "Pages") {
          _data = data.data.map(ele => {
            return {
              name: ele.name,
              url: ele.page_url,
            }
          })
        }
        else if (State == "Privacy") {
          _data = data.data.map(ele => {
            return {
              name: ele.name,
              url: ele.page_url,
            }
          })
        }
        let domdata = "";
        _data.forEach((element) => {
          let url = element.url ? element.url : `/${State.toLowerCase()}${element.id ? `?id=${element.id}` : ``}`
          let img = element.thumbnail ? `
            <img style= "width:25px;height:25px;min-width:25px;" src="${element.thumbnail}">
            `: NO_IMAGE_ICON
          if (element.icon && !element.thumbnail) {
            img = element.icon
          }
          domdata += `
              <li data-value ="${url}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
              ${element.thumbnail !== undefined || element.icon ? img : ""}
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

      setAttribute(component, {
        'href': value
      })
      component.set('traitValue', event.traitValue)
      //HEADING CHANGE
      component.get("components").models[1].get("components").models[0].set({ content: `<a href="${component.get("attributes").href??"#"}" >${component.get("attributes").heading} </a>` });
      //IMAGE CHANGE
      const image = component.get("components").models[0];

      let dataImage = $(".upload-image-area img")[0]?.src;
      
      image.set('content', `<a href="${component.get("attributes").href??"#"}" > <img src="${dataImage}" class="img-responsive img-fluid" alt=""> </a>`);
      // component.setAttributes({ ...component.getAttributes(), 'href': value })
    },

  });
}