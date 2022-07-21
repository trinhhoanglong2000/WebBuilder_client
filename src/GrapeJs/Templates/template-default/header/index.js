import $ from "jquery";
import { setAttribute } from "../../../../helper/utils";

export default function loadBlockHeader(editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  const am = editor.AssetManager;
  const dc = editor.DomComponents;

  const srcDefault = 'https://ezmall-bucket.s3.ap-southeast-1.amazonaws.com/assets/a8ae4620-6eb2-4a6a-932b-3f6e2ca11302.png';

  const isHaveLogo = c.logoURL ? true : false;
  if (!opt.isDeloy) {
    bm.add("header", {
      label: "Header",
      category: "Header",
      attributes: { class: "fa fa-header" },
      content: {
        type: "header",
        components: [
          {
            type: "defaultCustom",
            tagName: "div",
            attributes: { class: "container-fluid align-items-center" },
            components: [
              {
                type: "defaultCustom",
                tagName: "button",
                attributes: {
                  class: "navbar-toggler order-0",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#navbarSupportedContent",
                  "aria-controls": "navbarSupportedContent",
                  "aria-expanded": "false",
                  "aria-label": "Toggle navigation",
                },
                content: `<i class="fa fa-bars"></i>`,
              },
              {
                type: "defaultCustom",
                tagName: "a",
                attributes: {
                  href: "#",
                  class: "navbar-brand font-weight-bold order-1",
                },
                selectable: false,
                components: [
                  {
                    tagName: "img",
                    type: "defaultCustom",
                    attributes: {
                      class: `img-thumbnail${isHaveLogo ? "" : " d-none"}`,
                      src:
                        c.logoURL ?? "https://dummyimage.com/600x400/55595c/fff",
                    },
                  },
                  {
                    tagName: "h4",
                    type: "defaultCustom",
                    attributes: { class: `${isHaveLogo ? "d-none" : ""}` },
                    content: c.storeName,
                  },
                ],
              },
              {
                type: "defaultCustom",
                tagName: "div",
                attributes: {
                  id: "navbarSupportedContent",
                  class: "collapse navbar-collapse order-3 order-md-2",
                },
                components: [
                  {
                    type: "defaultCustom",
                    tagName: "ul",
                    attributes: { class: "navbar-nav dropdown" },
                  },
                  {
                    type: "defaultCustom",
                    tagName: "ul",
                    attributes: { class: "navbar-nav expand" },
                  }
                ]
              },
              {
                type: "defaultCustom",
                tagName: "div",
                attributes: { class: "order-2 header-icon" },
                content: `<a id="cartIcon" href="#"><i id="iv1qd" data-gjs-type="defaultCustom" class="fa fa-shopping-bag icon-header">
                            <span class="position-absolute translate-middle badge rounded-pill bg-danger"><span id="numberSelectedProduct">2</span></span>
                          </i></a>
                          <a id="searchIcon" href="#"><i id="iiolz" data-gjs-type="defaultCustom" class="fa fa-search icon-header"></i></a>`
              },
            ],
          },
        ],
      },
    });
  }


  editor.TraitManager.addType("header-upload-image", {
    createInput({ trait }) {
      const el = document.createElement("div");
      el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <div class="target-img">
                    <img src=${c.logoURL ?? srcDefault
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
      const logoImage = editor
        .getSelected()
        .get("components")
        .models[0].get("components")
        .models[1].get("components").models[0];
      const logoBrand = editor
        .getSelected()
        .get("components")
        .models[0].get("components")
        .models[1].get("components").models[1];

      changeBtn.onclick = () => {
        am.open({
          select(asset, complete) {
            inputImage.src = asset.getSrc();

            setAttribute(logoImage, { 'src': asset.getSrc() })
            logoImage.removeClass('d-none')

            if (!logoBrand.getClasses()?.includes('d-none')) {
              logoBrand.addClass('d-none')
            }

            if (!c.validURL(asset.getSrc())) {
              c.addTarget64Image({ id: asset.cid, target: logoImage });
            }

            am.close();
          },
        });
      };

      removeBtn.onclick = () => {
        setAttribute(logoImage, { 'src': "data:," })
        if (!logoImage.getClasses()?.includes('d-none')) {
          logoImage.addClass('d-none')
        }

        logoBrand.removeClass('d-none')

        inputImage.src = srcDefault;
      };

      return el;
    },

    onUpdate({ elInput, component }) {
      const src = $(component.view.el).find('.navbar-brand img').attr('src');
      const inputImage = elInput.querySelector(".upload-image-area .card-body img");
      debugger
      if (src && src != 'data:,') {
        inputImage.src = src;
      } else {
        inputImage.src = srcDefault;
      }
    },
  });

  editor.TraitManager.addType("header-advance-setting", {
    createInput({ trait }) {
      const el = document.createElement("div");

      el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input header-sticky-top" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Enable sticky header
                    <label/>
                </div>
            `;

      return el;
    },

    onEvent({ elInput, component, event }) {
      const isSticky = elInput.querySelector("input.header-sticky-top").checked;

      if (isSticky) {
        if (!component.getClasses()?.includes('sticky-top')) {
          component.addClass('sticky-top')
        }
      } else {
        component.removeClass('sticky-top')
      }
    },

    onUpdate({ elInput, component }) {
      const isStickyTop = component.getClasses()?.includes('sticky-top');

      $(elInput).find("input.header-sticky-top").prop("checked", isStickyTop);
    },
  });

  dc.addType("header", {
    model: {
      defaults: {
        copyable: false,
        removable: false,
        droppabl: false,
        draggable: false,
        name: "Header",
        tagName: "nav",
        attributes: {
          class: "navbar navbar-expand-md border-bottom border-dark",
          name: "header",
          "store-id": c.storeId,
          theme: "white", logoSize: "medium"
        },
        traits: [
          {
            type: "CustomSelect",
            label: "Theme color",
            name: "theme",
            options: [
              { id: "white", name: "White" },
              { id: "black", name: "Black" },
              { id: "lGreen", name: "Light Green" },
              { id: "lBlue", name: "Light Blue" },
              { id: "sand", name: "Sand" },
            ],
          },
          {
            type: "header-upload-image",
            changeProp: 1,
            label: "Logo image",
            name: "logoImage",
            srcDefault: "https://ezmall-bucket.s3.ap-southeast-1.amazonaws.com/assets/a8ae4620-6eb2-4a6a-932b-3f6e2ca11302.png",
          },
          {
            type: "CustomSelect",
            label: "Logo size",
            name: "logoSize",
            options: [
              { id: "small", name: "Small" },
              { id: "medium", name: "Medium" },
              { id: "large", name: "Large" },
            ],
          },
          {
            type: "header-advance-setting",
            label: "Advance setting",
            isSticky: false,
          },
        ],
      },

      init() { },
      initData() { },
    },
  });
}