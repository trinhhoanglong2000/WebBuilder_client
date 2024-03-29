import {
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  openBlock,
  save,
  cmdTogglePreview
} from "../const";
import { callAPIWithPostMethod } from "../../helper/callAPI.js";
import { validURL } from "../../helper/utils.js";

export default function LoadCommands(editor, config, opt) {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;
  //======================|| =============
  const beforeSaveData = async () => {
    const asset = editor.AssetManager.getAll().models;
    const imagesUpload = [];
    const target = [];

    asset.forEach((element, index) => {
      if (!validURL(element.get("src"))) {
        imagesUpload.push(element.get("src"));
        target.push(index);
      }
    })

    if (imagesUpload.length > 0) {
      const response = await callAPIWithPostMethod(`stores/${opt.storeId}/upload-image-to-s3`, { data: imagesUpload }, false);

      response && response.data && response.data.forEach((element, index) => {
        editor.AssetManager.getAll().models[target[index]].set("src", element);
        opt.renderImage({ id: asset[target[index]].cid, image: element })
      })
    }
  }
  //======================|| =============

  cm.add(cmdDeviceDesktop, (e) => e.setDevice("Desktop"));
  cm.add(cmdDeviceTablet, (e) => {
    e.setDevice("Tablet")
    // e.Components.clear()
  });
  cm.add(cmdDeviceMobile, (e) => {
    e.setDevice("Mobile portrait")
    // Delete select
    // const component = e.getSelected();
    // const coll = component.collection;
    // const at = coll.indexOf(component);
    // coll.remove(component);

    // Draggable
    // const footer = editor.getComponents().where({ name: 'Footer' })[0];
    // const header = editor.getComponents().where({ name: 'Header' })[0];
    // const main   = editor.getComponents().where({ name: "Main" })[0]
    // main.set({
    //   droppable: false,
    //   // droppable: true,

    // })

  });
  cm.add(cmdClear, (e) => window.confirm(txtConfirm) && e.runCommand("core:canvas-clear"));
  cm.add(cmdTogglePreview, async (e) => {
    const isActive = e.Commands.isActive('preview')
    if (!isActive) {
      e.Commands.run('preview')
    }
    else {
      e.Commands.stop('preview')
    }
  })
  cm.add(save, async (e) => {
    await beforeSaveData();

    e.store();
  })
  cm.add(openBlock, (e) => {
    var element = document.getElementsByClassName("gjs-pn-block-container");
    var elementCanvas = document.getElementsByClassName("gjs-cv-canvas");
    //====Add transition
    element[0].classList.add("trans")
    elementCanvas[0].classList.add("trans")

    for (var i = 0; i < element.length; i++) {
      element[i].classList.toggle("active-block");
    }
    for (i = 0; i < elementCanvas.length; i++) {
      elementCanvas[i].classList.toggle("active-canvas");
      //================|Start Transition|==========================
      elementCanvas[i].addEventListener("transitionstart", function () {
        this.classList.add("disabled")
      });
      //================|End Transition|==========================
      elementCanvas[i].addEventListener("transitionend", function () {
        this.classList.remove("disabled");
        element[0].classList.remove("trans")
        elementCanvas[0].classList.remove("trans")


        editor.refresh();
      });
    }

  });
}
