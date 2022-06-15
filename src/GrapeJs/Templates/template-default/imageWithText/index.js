import $ from "jquery";
import Quill from "quill";
import { readCookie } from "../../../../helper/cookie";
import { validURL } from "../../../../helper/utils";
import { IMAGE_WITH_TEXT_LABEL,
  COLLECTION_ICON,
  PRODUCTS_ICON,
  PAGES_ICON,
  PRIVACY_ICON,
  URL_ICON, 
  BACK_BUTTON_ICON,
  DELETE_BUTTON_ICON,
  NO_IMAGE_ICON } from "../../../../asset/icon/svg";


export default function loadImageWithText(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const am = editor.AssetManager;

  bm.add("imageWithText", {
    //""
    label: `
        ${IMAGE_WITH_TEXT_LABEL}
        <div>Image With Text</div>`,
    category: "Image With Text",
    content: {
      name: "ImageWithText",
      type: "imageWithText",
      draggable: ".main-content",
      attributes: { class: "container", name: "imageWithText" },
      components: [
        {
          tagName: "div",
          attributes: { class: "row" },
          type: "defaultCustom",
          components: [
            {
              tagName: "div",
              type: "defaultCustom",
              attributes: {
                class:
                  "col-sm-12 col-md-6 d-flex align-items-center justify-content-center",
              },
              components: [
                {
                  tagName: "img",
                  type: "defaultCustom",
                  attributes: {
                    class: "img-thumbnail",
                    src: "https://dummyimage.com/600x400/55595c/fff",
                  },
                },
              ],
            },
            {
              type: "defaultCustom",
              tagName: "div",
              attributes: { class: "col text-part d-flex align-items-center" },
              components: [
                {
                  type: "defaultCustom",
                  tagName: "div",
                  components: [
                    {
                      type: "defaultCustom",
                      tagName: "h1",
                      style: { "text-align": "left" },
                      content: `Picture header`,
                    },
                    {
                      type: "defaultCustom",
                      tagName: "p",
                      content: `Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or event privide review.`,
                    },
                    {
                      type: "defaultCustom",
                      tagName: "a",
                      content: `Button label`,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  editor.TraitManager.addType("imageWithText-heading", {
    createInput({ trait }) {
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");
      el.innerHTML = `
                <div class="gjs-field gjs-field-text">
                    <input class="imageWithText-heading" placeholder="${placeholder}"/>
                </div>
            `;

      $(el).find("input").on("input", (ev) => this.onChange(ev));

      return el;
    },

    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".imageWithText-heading").value;
      const parent = component.get("components")
        .models[0].get("components")
        .models[1].get("components").models[0];
      const header = parent.get("components").models[0];

      header.set({ content: inputType });
    },

    onUpdate({elInput, component}) {
      const initValue = component.view.el.querySelector("h1").innerHTML || "";

      $(elInput).find('input.imageWithText-heading').val(initValue);
    }
  });

  editor.TraitManager.addType("imageWithText-heading-align", {
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
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
    
      return el;
    },

    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector('input[name="alignment"]:checked');
      const parent = component.get("components")
        .models[0].get("components")
        .models[1].get("components").models[0];
      const header = parent.get("components").models[0];

      header.setStyle({ ...header.getStyle(), "text-align": inputType.value });
    },

    onUpdate({ elInput, component }) {
      const initValue = component.get("components")
        .models[0].get("components")
        .models[1].get("components")
        .models[0].get("components")
        .models[0].getStyle()["text-align"] || "left";

      $(elInput).find(`#${initValue}`).prop("checked", true);
    }
  });

  editor.TraitManager.addType("imageWithText-content", {
    createInput({ trait }) {
      const initValue = trait.target.view.el.querySelector("p").innerHTML || "";
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");

      el.innerHTML = `
                <div class="imageWithText-content" style="font-size:12px;">
                    ${initValue === "" ? placeholder : initValue}
                </div>
            `;

      const container = $(el).find(".imageWithText-content").get(0);

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
        if (source === "api") {
          console.log("An API call triggered this change.");
        } else if (source === "user") {
          this.onChange();
        }
      });

      return el;
    },
    onEvent({ elInput, component, event }) {
      const inputType = elInput.querySelector(".ql-editor p").innerHTML;
      const parent = component
        .get("components")
        .models[0].get("components")
        .models[1].get("components").models[0];
      const content = parent.get("components").models[1];

      content.set({ content: inputType });
    },

    onUpdate({ elInput, component, trait }) {
      const initValue = (component.get("components")
        .models[0].get("components")
        .models[1].get("components")
        .models[0].get("components")
        .models[1].view.el.innerHTML || trait.get("placeholder")) || "";
        $(elInput).find(".ql-editor p").html(initValue);
    }
  });

  editor.TraitManager.addType("imageWithText-button-label", {
    createInput({ trait }) {
      const initValue =
        trait.target.view.el.querySelector("a").innerHTML || "";
      const placeholder = trait.get("placeholder") || "";
      const el = document.createElement("div");

      el.innerHTML = `
                <div class="gjs-field gjs-field-text">
                    <input class="imageWithText-button-label" placeholder="${placeholder}" value="${initValue}" />
                </div>
            `;

      $(el)
        .find("input")
        .on("input", (ev) => this.onChange(ev));

      return el;
    },
    onEvent({ elInput, component, event }) {
      const inputType = $(elInput).find('.imageWithText-button-label');
      const parent = component.get("components")
        .models[0].get("components")
        .models[1].get("components").models[0];
      const button = parent.get("components").models[2];

      let data = inputType.val();

      if (button.get("content") !== data) {
        button.set({ content: data });
      }
    },

    onUpdate({ elInput, component }) {
      const initValue = component.view.el.querySelector("a").innerHTML || "";
      $(elInput).find('.imageWithText-button-label').val(initValue)
    }
  });

  editor.TraitManager.addType("imageWithText-upload-image", {
    createInput({ trait }) {
      const initValue = trait.target.view.el.querySelector("img").src;
      const el = document.createElement("div");
      el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <div class="target-img">
                        <img src=${
                          initValue ?? trait.get("src")
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
        .models[0].get("components")
        .models[0].get("components").models[0];

      changeBtn.onclick = () => {
        am.open({
          select(asset, complete) {
            inputImage.src = asset.getSrc();
            target.set('attributes', {
              ...target.get('attributes'),
              src: asset.getSrc(),
            });

            if (!c.validURL(asset.getSrc())) {
              c.addTarget64Image({ id: asset.cid, target: target });
            }

            am.close();
          },
        });
      };

      removeBtn.onclick = () => {
        target.set('attributes', {
          ...target.get('attributes'),
          src: trait.get("src"),
        });
        inputImage.src = trait.get("src");
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

  editor.TraitManager.addType("imageWithText-advance-setting", {
    createInput({ trait }) {
      const el = document.createElement("div");

      el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input imageWithText-fullwidth" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Full width
                    <label/>
                </div>
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input imageWithText-hideButton" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Hide button
                    <label/>
                </div>
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input imageWithText-hideBorderText" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Hide Border Out Side Text
                    <label/>
                </div>
            `;

      return el;
    },

    onEvent({ elInput, component, event }) {
      const isFullWidth = elInput.querySelector("input.imageWithText-fullwidth").checked;
      const textPart = component.get("components").models[0].get("components").models[1];
      const parent = textPart.get("components").models[0];
      const button = parent.get("components").models[2];

      if (isFullWidth) {
        component.removeClass('container')
        if (!component.getClasses()?.includes('container-fluid')) {
          component.addClass('container-fluid')
        }
      } else {
        component.removeClass('container-fluid')
        if (!component.getClasses()?.includes('container')) {
          component.addClass('container')
        }
      }

      const isHideButton = elInput.querySelector("input.imageWithText-hideButton").checked;
      if (isHideButton) {
        button.setStyle({ ...button.getStyle(), display: "none" });
      } else {
        button.setStyle({ ...button.getStyle(), display: "initial" });
      }

      const isHideBorderText = elInput.querySelector(
        "input.imageWithText-hideBorderText"
      ).checked;
      if (isHideBorderText) {
        textPart.setStyle({ ...textPart.getStyle(), border: "initial" });
      } else {
        textPart.setStyle({
          ...textPart.getStyle(),
          border: "2px solid lightgray;",
        });
      }
    },

    onUpdate({ elInput, component }) {  
      const isFullWidth = component.getAttributes().class?.includes("fluid");
      const textPart = component.get("components").models[0].get("components").models[1];
      const parent = textPart.get("components").models[0];
      const isHideButton = parent.get("components").models[2].getStyle()["display"];
      const isHideBorderText = textPart.getStyle()["border"];

      $(elInput).find("input.imageWithText-fullwidth").prop("checked", isFullWidth);
      $(elInput).find("input.imageWithText-hideButton").prop("checked", isHideButton === "none");
      $(elInput).find("input.imageWithText-hideBorderText").prop("checked", isHideBorderText !== "2px solid lightgray;");
    }
  });

  editor.TraitManager.addType("imageWithText-button-link", {
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
      const textPart = trait.target.get("components").models[0].get("components").models[1];
      const parent = textPart.get("components").models[0];
      const button = parent.get("components").models[2];
      const initValue = button.attributes.traitValue?.split(/;(.*)/s) || "";
      let defaultIcons = "";
      const el = document.createElement("div");
      let clicked = false;
      let previousValue = initValue[1] || "";

      if (initValue[0] === "Collections") {
        defaultIcons = COLLECTION_ICON;
      }
      else if (initValue[0] === "Products") {
        defaultIcons = PRODUCTS_ICON;

      }
      else if (initValue[0] === "Pages") {
        defaultIcons = PAGES_ICON;

      }
      else if (initValue[0] === "Privacy") {
        defaultIcons = PRIVACY_ICON;

      }
      else if (initValue[0] === "_URL_LINK")
      {
        defaultIcons = URL_ICON;
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
      let State = "Main-Menu";
      $(el).find('#Back-btn').on('click', function () {
        State = "Main-Menu";
        $(el).find('#Back-btn').addClass('d-none');
        $(el).find('input').focus();
        clicked = false;
        GetItem();
      })

      const GetItem = async (name = "", flag = false) => {
        name = name.trim();
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
            const text = $(this).find('span').text().trim();
            $(el).find('input').val(text);

            // $(el).find('input').focus()
            $(el).find('ul').addClass('combobox-hidden');
            $(el).find('#Back-btn').addClass('d-none');
            previousValue = text;
            if (previousValue !== "") {
              $(el).find('input').css('padding-left', '39px');
              $(el).find('#icons').css("display", "block");

              $(el).find('input').css('padding-right', '25px');
              $(el).find('#delete_icon').css("display", "block");

            }
            else {
              $(el).find('input').css('padding-left', '');
              $(el).find('#icons').css("display", "none");

              $(el).find('input').css('padding-left', '');
              $(el).find('#delete_icon').css("display", "none");
            }
            $(el).find('#icons').empty().append(URL_ICON);

            _this.onChange({ valueHref: name, traitValue: `${"_URL_LINK"};${previousValue}` });

            State = "Main-Menu";
            clicked = false;
          })
        }
        else if (State === "Main-Menu") {
          const arr = ["Collections", "Products", "Pages", "Privacy"];
          let domdata = "";
          const regex = new RegExp(`.*${name.toUpperCase()}.*`, 'g');
          arr.forEach((ele, index) => {
            if (regex.test(ele.toUpperCase()) || name === "") {
              if (index === 0) {
                domdata += defaultMenu_Collection;
              }
              else if (index === 1) {
                domdata += defaultMenu_Products;
              }
              else if (index === 2) {
                domdata += defaultMenu_Pages;
              }
              else if (index === 3) {
                domdata += defaultMenu_Privacy;
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
            State = $(this).data('value');
            // $(el).find('input').val("")
            $(el).find('input').focus();

            GetItem();
          })
        }
        else {
          if ($(el).find('#loadingDiv').length === 0) {
            $(el).find("#Link-menu").empty().append(`<div id="loadingDiv">
            <div ></div>
          </div>`);
          }
          $(el).find('#Back-btn').removeClass('d-none');

          let url = "";
          if (State === "Collections") {
            url = `stores/${opt.storeId}/collections/product?name=${name.trim()}`;
          }
          else if (State === "Products") {
            url = `stores/${opt.storeId}/products?title=${name.trim()}`;
          }
          else if (State === "Pages") {

          }
          else if (State === "Privacy") {

          }
          GetRequest(
            `${process.env.REACT_APP_API_URL}${url}`
          )

        }

      };

      const updateUI = (data) => {
        let _data = []
        if (State === "Collections") {
          _data = data.data.map(ele => {
            return {
              name: ele.name,
              id: ele.id,
              thumbnail: ele.thumbnail
            }
          })
        }
        else if (State === "Products"){
          _data = data.data.map(ele => {
            return {
              name: ele.title,
              id: ele.id,
              thumbnail: ele.thumbnail
            }
          })
        }
        let domdata = "";
        _data.forEach((element) => {
          const img = element.thumbnail ? `
        <img style= "width:25px;height:25px;min-width:25px;" src="${element.thumbnail}">
        `: NO_IMAGE_ICON
          domdata += `
          <li data-value ="${State.toLowerCase()}/${element.id}" class="btn" style="text-align:start;padding-top:5px;padding-bottom:5px;display: flex">
          ${img}
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
        $(el).find('#result').text(`${_data.length} results`);
        $(el).find("#Link-menu").empty().append(domdata);

        $(el).find('#Link-menu li').on('click', function () {
          const text = $(this).find('span').text().trim();
          $(el).find('input').val(text);

          // $(el).find('input').focus()
          $(el).find('ul').addClass('combobox-hidden')
          $(el).find('#Back-btn').addClass('d-none');
          previousValue = text;
          if (previousValue !== "") {
            $(el).find('input').css('padding-left', '39px');
            $(el).find('#icons').css("display", "block");

            $(el).find('input').css('padding-right', '25px');
            $(el).find('#delete_icon').css("display", "block");

            if (State === "Collections") {
              $(el).find('#icons').empty().append(COLLECTION_ICON);
            }
            else if (State === "Products") {
              $(el).find('#icons').empty().append(PRODUCTS_ICON);

            }
            else if (State === "Pages") {
              $(el).find('#icons').empty().append(PAGES_ICON);

            }
            else if (State === "Privacy") {
              $(el).find('#icons').empty().append(PRIVACY_ICON);

            }
          }
          else {
            $(el).find('input').css('padding-left', '');
            $(el).find('#icons').css("display", "none");

            $(el).find('input').css('padding-left', '');
            $(el).find('#delete_icon').css("display", "none");
          }
          _this.onChange({ valueHref: $(this).data('value'), traitValue: `${State};${previousValue}` });

          State = "Main-Menu";
          clicked = false;
        })

      }
      // ==============================
      $(el).find('#delete_icon').on('click', function () {
        const text = "";
        $(el).find('input').val(text);
        $(el).find('ul').addClass('combobox-hidden');
        $(el).find('#Back-btn').addClass('d-none');
        previousValue = text
        $(el).find('input').css('padding-left', '');
        $(el).find('#icons').css("display", "none");

        $(el).find('input').css('padding-left', '');
        $(el).find('#delete_icon').css("display", "none");
        State = "Main-Menu"
        clicked = false
        _this.onChange({ valueHref: "", traitValue: "" });
      })
      GetItem()
      $(el).find('input').focusin(function () {
        $(el).find('ul').removeClass('combobox-hidden');

      })
      $(el).find('input').focusout(function (e) {
        $(el).find('ul').addClass('combobox-hidden');
        setTimeout(() => {
          if (!clicked) {
            GetItem();
          } else {
            clicked = false;
          }
        }, 200)

        $(el).find('input').val(previousValue);

      })

      $(el).find('input').on("input", function (ev) {
        const valueInput = $(this)[0].value
        if (valueInput) {
          $(el).find('input').css('padding-right', '25px');
          $(el).find('#delete_icon').css("display", "block");
        }
        else {
          $(el).find('input').css('padding-right', '');
          $(el).find('#delete_icon').css("display", "none");
        }

        GetItem(valueInput);
      })
      return el;
    },
    onEvent({ elInput, component, event }) {
      if (event.type) { return; }

      const value = event.valueHref ? event.valueHref : '#';
      const textPart = component.get("components").models[0].get("components").models[1];
      const parent = textPart.get("components").models[0];
      const button = parent.get("components").models[2];
      button.set('attributes', { 
        ...button.getAttributes(), 
        'href': value 
      });
      button.set('traitValue', event.traitValue);
    },

    // Expects as return a simple HTML string or an HTML element
    onUpdate({ elInput, component }) {
      const textPart = component.get("components").models[0].get("components").models[1];
      const parent = textPart.get("components").models[0];
      const button = parent.get("components").models[2];
      let initValue = button.attributes.traitValue?.split(/;(.*)/s) || "";

      let previousValue = initValue[1] || ""
      if (!button.get('attributes').href) {
        initValue=""
        previousValue =""
        button.set('traitValue','')
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
  });

  dc.addType("imageWithText", {
    model: {
      defaults: {
        attributes: { iPosition: "left" },
        traits: [
          {
            type: "imageWithText-upload-image",
            label: "Image",
            src: "https://dummyimage.com/230x150/55595c/fff",
          },
          {
            type: "imageWithText-heading",
            label: "Heading",
            placeholder: "Header",
          },
          {
            type: "imageWithText-heading-align",
            label: "Heading Alignment",
          },
          {
            type: "imageWithText-content",
            label: "Content",
            placeholder: "Content",
          },
          {
            type: "imageWithText-button-label",
            label: "Button label",
            placeholder: "Button label",
          },
          {
            type: "select",
            label: "Image position",
            name: "iPosition",
            options: [
              { id: "left", name: "Left" },
              { id: "right", name: "Right" },
            ],
          },
          {
            type: "imageWithText-button-link",
            label: "Button Link",
          },
          {
            name: "setting",
            type: "imageWithText-advance-setting",
          },
        ],
      },

      init() {},

      initData() {},
    },
  });
}
