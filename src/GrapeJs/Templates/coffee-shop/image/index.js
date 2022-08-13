import $ from "jquery";
import { setAttribute } from "../../../../helper/utils";

export default function loadImage(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const am = editor.AssetManager;

  const srcDefault = "https://dummyimage.com/600x400/55595c/fff";

  bm.add("image", {
    label: "Image",
    attributes: { class: "fa fa-picture-o" },
    category: "Media",
    content: {
      type: "IMAGE",
      components: [
        {
          tagName: "img",
          type: "defaultCustom",
          style: {width:'50%'},
          attributes: {
            class: "img-thumbnail",
            src: "https://dummyimage.com/600x400/55595c/fff",
          },
        },
      ],
    },
  });

  editor.TraitManager.addType("image-upload-image", {
    createInput({ trait }) {
      const initValue = trait.target.view.el.querySelector("img").src;
      const el = document.createElement("div");
      el.innerHTML = `
            <div class="card upload-image-area">
                <div class="card-body">
                    <div class="target-img">
                        <img src=${
                          initValue ?? srcDefault
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
      const target = editor.getSelected().get("components").models[0];

      changeBtn.onclick = () => {
        am.open({
          select(asset, complete) {
            inputImage.src = asset.getSrc();

            setAttribute(target, { src: asset.getSrc() });

            if (!c.validURL(asset.getSrc())) {
              c.addTarget64Image({ id: asset.cid, target: target });
            }

            am.close();
          },
        });
      };

      removeBtn.onclick = () => {
        setAttribute(target, { src: srcDefault });
        inputImage.src = srcDefault;
      };

      return el;
    },

    onUpdate({ elInput, component }) {
      const initValue = component?.view.el.querySelector("img").src;
      const inputImage = elInput.querySelector(
        ".upload-image-area .card-body img"
      );

      if (initValue) {
        inputImage.src = initValue;
      } else {
        inputImage.src = srcDefault;
      }
    },
  });

  editor.TraitManager.addType("image-witdh", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue =
        trait.target
          .get("components")
          .models[0].getStyle()
          ["width"]?.replace("%", "") ?? 10;

          el.innerHTML = `
            <div class="d-flex align-items-center gjs-one-bg">
                <input type="range" id="image-width" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="image-width p-0" 
                    min="10" max="100" value="${initValue}" step="10">
                <label class="image-width-value m-0" for="image-width"> 0px </label>
            </div>
            `;

      return el;
    },

    onEvent({ elInput, component, event }) {
      const value = $(elInput).find("input.image-width")[0].value;
      $(elInput)
        .find("label.image-width-value")
        .text(value + "%");
      component.get("components").models[0].setStyle({
        ...component.get("components").models[0].getStyle(),
        width: value + "%",
      });
      editor.refresh()
    },

    onUpdate({ elInput, component }) {
      const initValue =
        component
          .get("components")
          .models[0].getStyle()
          .width?.replace("%", "") ?? 0;

      $(elInput)
        .find("label.image-width-value")
        .text(initValue + "%");
      $(elInput).find("input.image-width").val(initValue);
    },
  });

  editor.TraitManager.addType("image-radius", {
    createInput({ trait }) {
      const el = document.createElement("div");
      const initValue =
        trait.target
          .get("components")
          .models[0].getStyle()
          ["border-radius"]?.replace("%", "") ?? 0;

      el.innerHTML = `
            <div class="d-flex align-items-center gjs-one-bg">
                <input type="range" id="image-radius" style = "outline: none; background-color: #aaa; height: 3px; width: 100%; margin: 10px auto;" class="image-radius p-0" 
                    min="0" max="50" value="${initValue}" step="5">
                <label class="image-radius-value m-0" for="image-radius"> 0 </label>
            </div>
            `;

      return el;
    },
    onEvent({ elInput, component, event }) {
      const value = $(elInput).find("input.image-radius")[0].value;

      $(elInput)
        .find("label.image-radius-value")
        .text(value + "%");
      component.get("components").models[0].setStyle({
        ...component.get("components").models[0].getStyle(),
        "border-radius": value + "%",
      });
    },
    onUpdate({ elInput, component }) {
      const initValue =
        component
          .get("components")
          .models[0].getStyle()
          ["border-radius"]?.replace("%", "") ?? 0;

      $(elInput)
        .find("label.image-radius-value")
        .text(initValue + "%");
      $(elInput).find("input.image-radius").val(initValue);
    },
  });

  editor.TraitManager.addType("image-advance-setting", {
    createInput({ trait }) {
      const el = document.createElement("div");

      el.innerHTML = `
                <div class="gjs-one-bg">
                    <label class="checkbox-product gjs-label-wrp">
                        <input class ="checkbox-input image-fullwidth" type="checkbox" id="border">
                        <div class="checkbox_box"></div>
                        Full width
                    <label/>
                </div>
            `;

      return el;
    },

    onEvent({ elInput, component, event }) {
      const isFullWidth = elInput.querySelector(
        "input.image-fullwidth"
      ).checked;

      if (isFullWidth) {
        component.removeClass("container");
        if (!component.getClasses()?.includes("container-fluid")) {
          component.addClass("container-fluid");
        }
      } else {
        component.removeClass("container-fluid");
        if (!component.getClasses()?.includes("container")) {
          component.addClass("container");
        }
      }
      editor.refresh()
    },

    onUpdate({ elInput, component }) {
      const isFullWidth = component.getClasses()?.includes("container");

      $(elInput).find("input.image-fullwidth").prop("checked", !isFullWidth);
    },
  });

  dc.addType("IMAGE", {
    model: {
      defaults: {
        name: "image",
        draggable: ".main-content",
        droppable: false,
        highlightable: false,
        copyable: false,
        attributes: { class: "text-center container", name: "image" },
        traits: [
          {
            type: "image-upload-image",
            label: "Image",
          },
          {
            name: "width",
            type: "image-witdh",
            label: "Image Width",
          },
          {
            name: "radius",
            type: "image-radius",
            label: "Image Radius",
          },
          {
            name: "setting",
            label: "Advance-setting",
            type: "image-advance-setting",
          },
          {
            label: "Padding Top",
            type: "padding-setting",
            typeSetting: "padding-top",
          },
          {
            label: "Padding Bottom",
            type: "padding-setting",
            typeSetting: "padding-bottom",
          },
          {
            label: "Padding Left",
            type: "padding-setting",
            typeSetting: "padding-left",
          },
          {
            label: "Padding Right",
            type: "padding-setting",
            typeSetting: "padding-right",
          },
        ],
      },

      init() {},
      initData() {},
    },
  });
}
