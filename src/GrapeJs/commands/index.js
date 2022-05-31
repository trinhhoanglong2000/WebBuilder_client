import {
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  openBlock,
} from "../const";

export default function LoadCommands(editor, config) {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;

  cm.add(cmdDeviceDesktop, (e) => e.setDevice("Desktop"));
  cm.add(cmdDeviceTablet, (e) => e.setDevice("Tablet"));
  cm.add(cmdDeviceMobile, (e) => e.setDevice("Mobile portrait"));
  cm.add(cmdClear, (e) => window.confirm(txtConfirm) && e.runCommand("core:canvas-clear"));
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
